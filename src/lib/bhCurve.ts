import type { Material } from "@/data/materialData";

export type BHPoint = { h: number; b: number };
export type BHCurve = { ascending: BHPoint[]; descending: BHPoint[]; markers: Array<BHPoint & { label: string; color: string }> };

const smoothStep = (value: number) => value * value * (3 - 2 * value);

const interpolateBranch = (h: number, knots: BHPoint[]) => {
  for (let index = 0; index < knots.length - 1; index += 1) {
    const left = knots[index];
    const right = knots[index + 1];
    if (h <= right.h) {
      const t = (h - left.h) / (right.h - left.h);
      return left.b + (right.b - left.b) * smoothStep(Math.max(0, Math.min(1, t)));
    }
  }
  return knots[knots.length - 1].b;
};

export const generateBHCurve = (material: Material): BHCurve => {
  const { saturationFluxDensity: bs, coercivity: hc, remanence: br, maxAppliedField } = material;
  const hMax = Math.max(maxAppliedField, hc * 1.15);
  const ascendingKnots = [{ h: -hMax, b: -bs }, { h: -hc, b: 0 }, { h: 0, b: br }, { h: hMax, b: bs }];
  const descendingKnots = [{ h: -hMax, b: -bs }, { h: 0, b: -br }, { h: hc, b: 0 }, { h: hMax, b: bs }];
  const fields = new Set<number>();
  for (let index = 0; index <= 240; index += 1) fields.add(-hMax + (2 * hMax * index) / 240);
  [-hc, 0, hc, -hMax, hMax].forEach((h) => fields.add(h));
  const orderedFields = [...fields].sort((a, b) => a - b);
  const ascending = orderedFields.map((h) => ({ h, b: interpolateBranch(h, ascendingKnots) }));
  const descending = orderedFields.map((h) => ({ h, b: interpolateBranch(h, descendingKnots) }));
  const markers = [
    { h: hMax, b: bs, label: "Positive saturation", color: "#dc6b2f" },
    { h: -hMax, b: -bs, label: "Negative saturation", color: "#dc6b2f" },
    { h: 0, b: br, label: "Positive remanence", color: "#0891b2" },
    { h: 0, b: -br, label: "Negative remanence", color: "#0891b2" },
    { h: hc, b: 0, label: "Positive coercivity", color: "#7c3aed" },
    { h: -hc, b: 0, label: "Negative coercivity", color: "#7c3aed" },
  ];
  return { ascending, descending, markers };
};
