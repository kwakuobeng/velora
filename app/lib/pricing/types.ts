export type PricingSeason = "growing" | "dormant";
export type Frequency = "weekly" | "biweekly";
export type ServiceKind = "mow" | "cleanup" | "mulch" | "hedges";
export type ReviewReason =
  | "low_confidence"
  | "t5_manual_review"
  | "high_total"
  | "photo_flag";

export interface QuoteInput {
  turf_sq_ft?: number;
  bed_sq_ft?: number;
  hedge_linear_ft?: number;
  services: {
    mow?: { frequency: Frequency };
    cleanup?: boolean;
    mulch?: boolean;
    hedges?: boolean;
  };
  addOns?: {
    bag_clippings?: boolean;
  };
  season: PricingSeason;
  /** Optional YYYY-MM-DD; when present, rules.season resolves growing/dormant. */
  service_date?: string;
  confidence?: number;
  photo_flag?: boolean;
}

export interface TierRules {
  id: string;
  area_min: number;
  area_max: number | null;
  mow: {
    weekly_cents: number | null;
    biweekly_cents: number | null;
  };
  cleanup_cents: number | null;
  hedges_per_10lf_cents: number | null;
}

export interface PricingRules {
  pricing_version: string;
  tiers: TierRules[];
  mulch_per_bed_sq_ft_cents: number;
  mulch_delivery_cents: number;
  bag_clippings_per_visit_cents: number;
  minimums: {
    visit_cents: number;
    job_cents: number;
  };
  season: {
    growing_start: string;
    growing_end: string;
    dormant_weekly_mow_frequency: "biweekly";
  };
  review: {
    confidence_below: number;
    t5_area_sq_ft: number;
    total_over_cents: number;
  };
}

export interface PriceLineItem {
  code: string;
  label: string;
  amount_cents: number;
}

export interface PriceQuoteOutput {
  lineItems: PriceLineItem[];
  total_cents: number;
  reviewReasons: ReviewReason[];
  pricing_version: string;
}
