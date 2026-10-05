import type { PricingRules } from "./types";

/**
 * PLACEHOLDER pricing fixture for M1 tests and engine development.
 * These are NOT live or market prices.
 */
export const PLACEHOLDER_PRICING_RULES: PricingRules = {
  pricing_version: "placeholder-m1-v1",
  tiers: [
    {
      id: "T1",
      area_min: 0,
      area_max: 3000,
      mow: { weekly_cents: 3000, biweekly_cents: 4000 },
      cleanup_cents: 12000,
      hedges_per_10lf_cents: 1500,
    },
    {
      id: "T2",
      area_min: 3000,
      area_max: 6000,
      mow: { weekly_cents: 4000, biweekly_cents: 5000 },
      cleanup_cents: 16000,
      hedges_per_10lf_cents: 1500,
    },
    {
      id: "T3",
      area_min: 6000,
      area_max: 10000,
      mow: { weekly_cents: 5000, biweekly_cents: 6200 },
      cleanup_cents: 21000,
      hedges_per_10lf_cents: 1500,
    },
    {
      id: "T4",
      area_min: 10000,
      area_max: 15000,
      mow: { weekly_cents: 6200, biweekly_cents: 7500 },
      cleanup_cents: 27000,
      hedges_per_10lf_cents: 1500,
    },
    {
      id: "T5",
      area_min: 15000,
      area_max: null,
      mow: { weekly_cents: null, biweekly_cents: null },
      cleanup_cents: null,
      hedges_per_10lf_cents: null,
    },
  ],
  mulch_per_bed_sq_ft_cents: 50,
  mulch_delivery_cents: 2500,
  bag_clippings_per_visit_cents: 500,
  minimums: {
    visit_cents: 3500,
    job_cents: 10000,
  },
  season: {
    // PLACEHOLDER calendar; callers resolve dates to season and may replace this config.
    growing_start: "03-01",
    growing_end: "11-30",
    dormant_weekly_mow_frequency: "biweekly",
  },
  review: {
    confidence_below: 0.8,
    t5_area_sq_ft: 15000,
    total_over_cents: 50000,
  },
};
