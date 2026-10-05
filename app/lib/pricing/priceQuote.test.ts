import { describe, expect, it } from "vitest";

import { PLACEHOLDER_PRICING_RULES } from "./placeholder-rules";
import { priceQuote } from "./priceQuote";
import type { PricingRules, QuoteInput } from "./types";

const mowInput = (
  turf_sq_ft: number,
  frequency: "weekly" | "biweekly" = "weekly",
  season: "growing" | "dormant" = "growing",
): QuoteInput => ({
  turf_sq_ft,
  services: { mow: { frequency } },
  season,
});

const amountFor = (
  input: QuoteInput,
  code: string,
  rules = PLACEHOLDER_PRICING_RULES,
) =>
  priceQuote(input, rules).lineItems.find((line) => line.code === code)
    ?.amount_cents;

describe("priceQuote tier boundaries", () => {
  it.each([
    [0, 3000],
    [2999, 3000],
    [3000, 4000],
    [5999, 4000],
    [6000, 5000],
    [9999, 5000],
    [10000, 6200],
    [14999, 6200],
  ])("maps turf %i to the correct weekly mow tier", (area, expected) => {
    expect(amountFor(mowInput(area), "mow")).toBe(expected);
  });

  it("uses turf square feet for cleanup tiering", () => {
    expect(
      amountFor(
        {
          turf_sq_ft: 6000,
          services: { cleanup: true },
          season: "growing",
        },
        "cleanup",
      ),
    ).toBe(21000);
  });

  it("uses hedge linear feet as the hedge pricing basis", () => {
    expect(
      amountFor(
        {
          turf_sq_ft: 14999,
          hedge_linear_ft: 20,
          services: { hedges: true },
          season: "growing",
        },
        "hedges",
      ),
    ).toBe(3000);
  });

  it("routes turf 15000 and above to T5 manual review without inventing mow pricing", () => {
    const quote = priceQuote(mowInput(15000), PLACEHOLDER_PRICING_RULES);
    expect(quote.lineItems.find((line) => line.code === "mow")).toBeUndefined();
    expect(quote.reviewReasons).toContain("t5_manual_review");
  });
});

describe("frequency and season", () => {
  it("uses weekly pricing in growing season", () => {
    expect(amountFor(mowInput(3000, "weekly", "growing"), "mow")).toBe(4000);
  });

  it("uses requested biweekly pricing in growing season", () => {
    expect(amountFor(mowInput(3000, "biweekly", "growing"), "mow")).toBe(5000);
  });

  it("prices weekly dormant mowing as biweekly", () => {
    expect(amountFor(mowInput(3000, "weekly", "dormant"), "mow")).toBe(5000);
  });

  it.each([
    ["2026-03-01", 4000],
    ["2026-11-30", 4000],
    ["2026-12-01", 5000],
    ["2026-02-28", 5000],
  ])("resolves placeholder season boundary %s", (service_date, expected) => {
    expect(
      amountFor(
        {
          ...mowInput(3000),
          service_date,
        },
        "mow",
      ),
    ).toBe(expected);
  });
});

describe("add-ons and minimums", () => {
  it("stacks add-ons as separate line items", () => {
    const quote = priceQuote(
      {
        turf_sq_ft: 1000,
        services: { mow: { frequency: "weekly" } },
        addOns: { bag_clippings: true },
        season: "growing",
      },
      PLACEHOLDER_PRICING_RULES,
    );

    expect(quote.lineItems.map((line) => line.code)).toEqual([
      "mow",
      "bag_clippings",
    ]);
    expect(quote.total_cents).toBe(3500);
  });

  it("adds a per-visit minimum adjustment", () => {
    const input: QuoteInput = {
      turf_sq_ft: 1000,
      services: {},
      addOns: { bag_clippings: true },
      season: "growing",
    };
    const quote = priceQuote(input, PLACEHOLDER_PRICING_RULES);

    expect(amountFor(input, "minimum_adj")).toBe(3000);
    expect(quote.total_cents).toBe(3500);
  });

  it("adds a per-job minimum adjustment", () => {
    const quote = priceQuote(
      {
        bed_sq_ft: 100,
        services: { mulch: true },
        season: "growing",
      },
      PLACEHOLDER_PRICING_RULES,
    );

    expect(
      quote.lineItems.find((line) => line.code === "minimum_adj")?.amount_cents,
    ).toBe(2500);
    expect(quote.total_cents).toBe(10000);
  });
});

describe("rounding", () => {
  it("rounds each line up to the nearest 100 cents before totaling", () => {
    const quote = priceQuote(
      {
        hedge_linear_ft: 11,
        services: { hedges: true },
        season: "growing",
      },
      PLACEHOLDER_PRICING_RULES,
    );

    expect(
      quote.lineItems.find((line) => line.code === "hedges")?.amount_cents,
    ).toBe(1700);
    expect(
      quote.lineItems.find((line) => line.code === "minimum_adj")?.amount_cents,
    ).toBe(1800);
    expect(quote.total_cents).toBe(3500);
  });
});

describe("review exceptions", () => {
  it("collects confidence, T5, total, and photo reasons", () => {
    const quote = priceQuote(
      {
        turf_sq_ft: 15000,
        bed_sq_ft: 1000,
        services: { mow: { frequency: "weekly" }, mulch: true },
        season: "growing",
        confidence: 0.79,
        photo_flag: true,
      },
      PLACEHOLDER_PRICING_RULES,
    );

    expect(quote.total_cents).toBe(52500);
    expect(quote.reviewReasons).toEqual([
      "low_confidence",
      "t5_manual_review",
      "photo_flag",
      "high_total",
    ]);
  });

  it("does not flag exact exception thresholds", () => {
    const rules: PricingRules = {
      ...PLACEHOLDER_PRICING_RULES,
      mulch_delivery_cents: 0,
    };
    const quote = priceQuote(
      {
        bed_sq_ft: 1000,
        services: { mulch: true },
        season: "growing",
        confidence: 0.8,
      },
      rules,
    );

    expect(quote.total_cents).toBe(50000);
    expect(quote.reviewReasons).not.toContain("low_confidence");
    expect(quote.reviewReasons).not.toContain("high_total");
  });
});

describe("pricing version determinism", () => {
  it("returns identical output for unchanged input, rules, and pricing_version", () => {
    const input: QuoteInput = {
      turf_sq_ft: 4200,
      bed_sq_ft: 80,
      hedge_linear_ft: 20,
      services: {
        mow: { frequency: "weekly" },
        mulch: true,
        hedges: true,
      },
      addOns: { bag_clippings: true },
      season: "growing",
      confidence: 0.95,
    };

    expect(priceQuote(input, PLACEHOLDER_PRICING_RULES)).toEqual(
      priceQuote(input, PLACEHOLDER_PRICING_RULES),
    );
    expect(priceQuote(input, PLACEHOLDER_PRICING_RULES).pricing_version).toBe(
      PLACEHOLDER_PRICING_RULES.pricing_version,
    );
  });
});
