import type {
  Frequency,
  PriceLineItem,
  PriceQuoteOutput,
  PricingRules,
  QuoteInput,
  ReviewReason,
  TierRules,
} from "./types";

const roundUpDollar = (cents: number): number => Math.ceil(cents / 100) * 100;

const findTier = (area: number, rules: PricingRules): TierRules | undefined =>
  rules.tiers.find(
    (tier) =>
      area >= tier.area_min &&
      (tier.area_max === null || area < tier.area_max),
  );

const pushLine = (
  lines: PriceLineItem[],
  code: string,
  label: string,
  rawCents: number,
): void => {
  lines.push({ code, label, amount_cents: roundUpDollar(rawCents) });
};

export function priceQuote(
  input: QuoteInput,
  rules: PricingRules,
): PriceQuoteOutput {
  const lineItems: PriceLineItem[] = [];
  const reviewReasons: ReviewReason[] = [];

  const turfArea = input.turf_sq_ft ?? 0;
  const bedArea = input.bed_sq_ft ?? 0;
  const hedgeLinearFt = input.hedge_linear_ft ?? 0;
  const turfTier = findTier(turfArea, rules);

  if (
    input.confidence !== undefined &&
    input.confidence < rules.review.confidence_below
  ) {
    reviewReasons.push("low_confidence");
  }
  if (turfArea >= rules.review.t5_area_sq_ft) {
    reviewReasons.push("t5_manual_review");
  }
  if (input.photo_flag) {
    reviewReasons.push("photo_flag");
  }

  if (input.services.mow && turfTier) {
    const requestedFrequency = input.services.mow.frequency;
    const effectiveFrequency: Frequency =
      input.season === "dormant" && requestedFrequency === "weekly"
        ? rules.season.dormant_weekly_mow_frequency
        : requestedFrequency;
    const rate =
      effectiveFrequency === "weekly"
        ? turfTier.mow.weekly_cents
        : turfTier.mow.biweekly_cents;

    if (rate !== null) {
      pushLine(lineItems, "mow", `Mow (${effectiveFrequency})`, rate);
    }
  }

  if (
    input.services.cleanup &&
    turfTier?.cleanup_cents !== null &&
    turfTier?.cleanup_cents !== undefined
  ) {
    pushLine(lineItems, "cleanup", "Cleanup", turfTier.cleanup_cents);
  }

  if (input.services.mulch) {
    pushLine(
      lineItems,
      "mulch",
      "Mulch",
      bedArea * rules.mulch_per_bed_sq_ft_cents,
    );
    pushLine(
      lineItems,
      "mulch_delivery",
      "Mulch delivery",
      rules.mulch_delivery_cents,
    );
  }

  if (input.services.hedges) {
    const rate = turfTier?.hedges_per_10lf_cents;
    if (rate !== null && rate !== undefined) {
      pushLine(
        lineItems,
        "hedges",
        "Hedge trimming",
        (hedgeLinearFt / 10) * rate,
      );
    }
  }

  if (input.addOns?.bag_clippings) {
    pushLine(
      lineItems,
      "bag_clippings",
      "Bag clippings",
      rules.bag_clippings_per_visit_cents,
    );
  }

  const hasVisitLine = lineItems.some((line) =>
    ["mow", "hedges", "bag_clippings"].includes(line.code),
  );
  const hasJobLine = lineItems.some((line) =>
    ["cleanup", "mulch", "mulch_delivery"].includes(line.code),
  );
  const subtotal = lineItems.reduce((sum, item) => sum + item.amount_cents, 0);
  const requiredMinimum = Math.max(
    hasVisitLine ? rules.minimums.visit_cents : 0,
    hasJobLine ? rules.minimums.job_cents : 0,
  );

  if (subtotal < requiredMinimum) {
    pushLine(
      lineItems,
      "minimum_adj",
      "Minimum adjustment",
      requiredMinimum - subtotal,
    );
  }

  const total_cents = lineItems.reduce(
    (sum, item) => sum + item.amount_cents,
    0,
  );

  if (total_cents > rules.review.total_over_cents) {
    reviewReasons.push("high_total");
  }

  return {
    lineItems,
    total_cents,
    reviewReasons,
    pricing_version: rules.pricing_version,
  };
}
