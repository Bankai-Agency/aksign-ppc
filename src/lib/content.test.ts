import { describe, expect, it } from "vitest";
import {
  getAllLPSlugs,
  getLPVariant,
  getSharedContent,
} from "@/lib/content";

describe("content loader — shared", () => {
  const shared = getSharedContent();

  it("NAP is valid E.164 + display phone matches", () => {
    expect(shared.nap.phone).toBe("+13128984581");
    expect(shared.nap.phoneDisplay).toBe("(312) 898-4581");
    expect(shared.nap.email).toBe("info@aksign.us");
  });

  it("trustBar has exactly 6 USPs", () => {
    expect(shared.trustBar).toHaveLength(6);
    expect(shared.trustBar[0].title).toMatch(/design/i);
  });

  it("howItWorks has exactly 6 ordered steps", () => {
    expect(shared.howItWorks.steps).toHaveLength(6);
    shared.howItWorks.steps.forEach((s, i) => {
      expect(s.number).toBe(i + 1);
    });
  });

  it("serviceArea contains 4 P0 cities (Arlington Heights + Chicago + NW)", () => {
    const p0 = shared.serviceArea.cities.filter((c) => c.tier === "P0");
    expect(p0.map((c) => c.name)).toEqual([
      "Arlington Heights",
      "Palatine",
      "Schaumburg",
      "Chicago",
    ]);
  });

  it("portfolio starts in placeholder mode with ≥ 4 placeholders", () => {
    expect(shared.portfolio.mode).toBe("placeholder");
    expect(shared.portfolio.placeholders.length).toBeGreaterThanOrEqual(4);
  });

  it("hours is marked as an open placeholder", () => {
    expect(shared.nap.hours).toBe("{{PLACEHOLDER: hours}}");
  });
});

describe("content loader — variants", () => {
  it("loads 3 LP slugs", () => {
    expect(getAllLPSlugs()).toEqual([
      "channel-letter-signs",
      "illuminated-signs",
      "vehicle-wraps",
    ]);
  });

  it("each LP has exactly 12 FAQ items + 3 pricing tiers", () => {
    getAllLPSlugs().forEach((slug) => {
      const lp = getLPVariant(slug);
      expect(lp.faq.items).toHaveLength(12);
      expect(lp.pricing.tiers).toHaveLength(3);
    });
  });

  it("LP-01 accent is red, H1 contains 'Channel Letter Signs', CTA is free quote", () => {
    const lp = getLPVariant("channel-letter-signs");
    expect(lp.accent).toBe("red");
    expect(lp.hero.h1).toMatch(/channel letter signs/i);
    expect(lp.ctaLabel).toBe("Get a Free Quote");
  });

  it("LP-02 accent is white, focus service is Lightboxes", () => {
    const lp = getLPVariant("illuminated-signs");
    expect(lp.accent).toBe("white");
    expect(lp.services.focus.title).toMatch(/lightbox/i);
  });

  it("LP-03 accent is shine, CTA is Fleet Quote, tier 3 has perUnit", () => {
    const lp = getLPVariant("vehicle-wraps");
    expect(lp.accent).toBe("shine");
    expect(lp.ctaLabel).toBe("Get a Fleet Quote");
    expect(lp.pricing.tiers[2].perUnit).toBe("per vehicle");
    expect(lp.pricing.tiers[2].rangeHighIsMin).toBe(true);
  });

  it("LP-01 warranty FAQ is still a known placeholder (Q11)", () => {
    const lp = getLPVariant("channel-letter-signs");
    const q11 = lp.faq.items[10];
    expect(q11.q).toMatch(/warranty/i);
    expect(q11.a).toBe("{{PLACEHOLDER: warranty-lp01-q11}}");
  });

  it("every tier headline number is a positive integer under $100k", () => {
    getAllLPSlugs().forEach((slug) => {
      const lp = getLPVariant(slug);
      lp.pricing.tiers.forEach((tier) => {
        expect(tier.rangeLow).toBeGreaterThan(0);
        expect(tier.rangeLow).toBeLessThan(100_000);
        expect(tier.rangeHigh).toBeGreaterThanOrEqual(tier.rangeLow);
        expect(tier.rangeHigh).toBeLessThan(100_000);
      });
    });
  });
});
