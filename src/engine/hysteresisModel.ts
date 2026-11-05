import type { Material } from "@/data/materialData";

export type MagneticDirection = -1 | 0 | 1;
export type HysteresisBranch = "virgin" | "ascending" | "descending";
export type MagneticPoint = { h: number; b: number; branch: HysteresisBranch };
export type MagneticState = {
  h: number;
  b: number;
  direction: MagneticDirection;
  branch: HysteresisBranch;
  reversalH: number;
  reversalB: number;
};
export type HysteresisLandmark = { h: number; b: number; label: string; color: string };
export type HysteresisLoop = {
  initialMagnetization: MagneticPoint[];
  cycle: MagneticPoint[];
  landmarks: HysteresisLandmark[];
  estimatedLossJPerM3: number;
};

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));
const directionOf = (value: number): MagneticDirection => value > 0 ? 1 : value < 0 ? -1 : 0;

export const initialiseMagneticState = (): MagneticState => ({
  h: 0,
  b: 0,
  direction: 0,
  branch: "virgin",
  reversalH: 0,
  reversalB: 0,
});

export const detectFieldReversal = (state: MagneticState, nextH: number) => {
  const nextDirection = directionOf(nextH - state.h);
  return nextDirection !== 0 && state.direction !== 0 && nextDirection !== state.direction;
};

const majorBranchValue = (h: number, material: Material, branch: Exclude<HysteresisBranch, "virgin">) => {
  const { saturationFluxDensity: bs, remanence: br, coercivity: hc, maxAppliedField: hMax } = material;
  const knots = branch === "ascending"
    ? [{ h: -hMax, b: -bs }, { h: 0, b: -br }, { h: hc, b: 0 }, { h: hMax, b: bs }]
    : [{ h: -hMax, b: -bs }, { h: -hc, b: 0 }, { h: 0, b: br }, { h: hMax, b: bs }];
  const field = clamp(h, -hMax, hMax);
  for (let index = 0; index < knots.length - 1; index += 1) {
    const left = knots[index];
    const right = knots[index + 1];
    if (field <= right.h) {
      const t = (field - left.h) / (right.h - left.h);
      const response = clamp(material.lowFieldResponse, 0, 1);
      const shape = 1.35 + (1 - response) * 0.9;
      const tPower = t ** shape;
      const inversePower = (1 - t) ** shape;
      const eased = tPower / (tPower + inversePower);
      return left.b + (right.b - left.b) * eased;
    }
  }
  return bs;
};

export const calculateBFromState = (state: MagneticState, material: Material) => {
  const bs = material.saturationFluxDensity;
  if (Math.abs(state.h) >= material.maxAppliedField) return Math.sign(state.h) * bs;
  if (state.branch === "virgin") {
    const response = clamp(material.lowFieldResponse, 0, 1);
    const scale = Math.max(material.coercivity * 0.25, material.maxAppliedField * (0.04 + 0.12 * (1 - response)));
    return bs * Math.tanh(state.h / scale);
  }

  const base = majorBranchValue(state.h, material, state.branch);
  const anchorBase = majorBranchValue(state.reversalH, material, state.branch);
  const hMax = material.maxAppliedField;
  const anchorGate = 1 - Math.min(1, Math.abs(state.reversalH) / hMax);
  const currentGate = 1 - Math.min(1, Math.abs(state.h) / hMax);
  const memoryScale = Math.max(material.coercivity * 0.5, hMax * 0.025);
  const residual = anchorGate > 1e-6 ? (state.reversalB - anchorBase) / anchorGate : 0;
  const memory = residual * Math.exp(-Math.abs(state.h - state.reversalH) / memoryScale) * currentGate;
  return clamp(base + memory, -bs, bs);
};

export const updateMagneticState = (state: MagneticState, nextH: number, material: Material): MagneticState => {
  const movement = directionOf(nextH - state.h);
  if (movement === 0) return state;

  const reversal = detectFieldReversal(state, nextH);
  const branch = reversal ? (movement > 0 ? "ascending" : "descending") : state.branch;
  const reversalH = reversal ? state.h : state.reversalH;
  const reversalB = reversal ? state.b : state.reversalB;
  const nextState: MagneticState = {
    h: nextH,
    b: 0,
    direction: movement,
    branch,
    reversalH,
    reversalB,
  };
  return { ...nextState, b: calculateBFromState(nextState, material) };
};

const segmentFields = (start: number, end: number, anchors: number[], stepsPerSegment: number) => {
  const knots = [start, ...anchors, end];
  const result: number[] = [];
  for (let segment = 0; segment < knots.length - 1; segment += 1) {
    const left = knots[segment];
    const right = knots[segment + 1];
    for (let step = 1; step <= stepsPerSegment; step += 1) {
      result.push(step === stepsPerSegment ? right : left + ((right - left) * step) / stepsPerSegment);
    }
  }
  return result;
};

export const calculateHysteresisLoopArea = (points: Array<Pick<MagneticPoint, "h" | "b">>) => {
  let integral = 0;
  for (let index = 0; index < points.length - 1; index += 1) {
    const current = points[index];
    const next = points[index + 1];
    integral += ((current.h + next.h) / 2) * (next.b - current.b);
  }
  return Math.abs(integral);
};

export const generateCompleteHysteresisLoop = (material: Material, stepsPerSegment = 80): HysteresisLoop => {
  const state0 = initialiseMagneticState();
  const initialMagnetization: MagneticPoint[] = [{ h: state0.h, b: state0.b, branch: state0.branch }];
  let state = state0;
  const hMax = material.maxAppliedField;
  const initialFields = segmentFields(0, hMax, [], stepsPerSegment);
  for (const h of initialFields) {
    state = updateMagneticState(state, h, material);
    initialMagnetization.push({ h: state.h, b: state.b, branch: state.branch });
  }

  const cycle: MagneticPoint[] = [{ h: state.h, b: state.b, branch: state.branch }];
  const descendingFields = segmentFields(hMax, -hMax, [0, -material.coercivity], stepsPerSegment);
  for (const h of descendingFields) {
    state = updateMagneticState(state, h, material);
    cycle.push({ h: state.h, b: state.b, branch: state.branch });
  }
  const ascendingFields = segmentFields(-hMax, hMax, [0, material.coercivity], stepsPerSegment);
  for (const h of ascendingFields) {
    state = updateMagneticState(state, h, material);
    cycle.push({ h: state.h, b: state.b, branch: state.branch });
  }

  const descending = cycle.filter((point) => point.branch === "descending");
  const ascending = cycle.filter((point) => point.branch === "ascending");
  const atField = (points: MagneticPoint[], h: number) => points.find((point) => point.h === h) ?? points.reduce((closest, point) => Math.abs(point.h - h) < Math.abs(closest.h - h) ? point : closest);
  const landmarks: HysteresisLandmark[] = [
    { ...cycle[0], label: "Positive saturation", color: "#dc6b2f" },
    { ...atField(descending, 0), label: "Positive remanence", color: "#0891b2" },
    { ...atField(descending, -material.coercivity), label: "Negative coercivity", color: "#7c3aed" },
    { ...atField(descending, -hMax), label: "Negative saturation", color: "#dc6b2f" },
    { ...atField(ascending, 0), label: "Negative remanence", color: "#0891b2" },
    { ...atField(ascending, material.coercivity), label: "Positive coercivity", color: "#7c3aed" },
  ];

  return {
    initialMagnetization,
    cycle,
    landmarks,
    estimatedLossJPerM3: calculateHysteresisLoopArea(cycle),
  };
};

export const hysteresisModelAssumptions = [
  "Illustrative major branches use smooth power-law interpolation between the supplied Bs, Br, and Hc anchors.",
  "The qualitative low-field response factor sets the interpolation shape and the demagnetized initial-response scale.",
  "Minor-loop memory is approximated by a decaying reversal offset with an assumed field scale derived from Hc and Hmax.",
  "This simplified phenomenological model is not a full Preisach or Jiles–Atherton implementation.",
];
