export type Material = {
  slug: string;
  name: string;
  saturationFluxDensity: number;
  coercivity: number;
  remanence: number;
  lowFieldResponse: number;
  lowFieldResponseLabel: string;
  maxAppliedField: number;
  classification: string;
  description: string;
  characteristics: string[];
  permeability: null;
  hysteresisLoss: null;
};

export const materials: Material[] = [
  {
    slug: "soft-iron",
    name: "Soft Iron",
    saturationFluxDensity: 2.0,
    coercivity: 80,
    remanence: 1.2,
    lowFieldResponse: 1,
    lowFieldResponseLabel: "High initial response (qualitative)",
    maxAppliedField: 1000,
    classification: "Soft magnetic",
    description: "A readily magnetized and demagnetized ferromagnetic material, commonly used in magnetic cores and electromagnets.",
    characteristics: ["Low coercivity", "High saturation flux density", "Narrow hysteresis behavior"],
    permeability: null,
    hysteresisLoss: null,
  },
  {
    slug: "hard-iron",
    name: "Hard Iron",
    saturationFluxDensity: 1.6,
    coercivity: 4000,
    remanence: 0.9,
    lowFieldResponse: 0.6,
    lowFieldResponseLabel: "Moderate initial response (qualitative)",
    maxAppliedField: 50000,
    classification: "Hard magnetic",
    description: "A magnetically hard iron material that retains more magnetization and resists reversal compared with soft iron.",
    characteristics: ["High coercivity", "Noticeable remanence", "Resists demagnetization"],
    permeability: null,
    hysteresisLoss: null,
  },
  {
    slug: "silicon-steel",
    name: "Silicon Steel",
    saturationFluxDensity: 2.0,
    coercivity: 50,
    remanence: 1.3,
    lowFieldResponse: 1,
    lowFieldResponseLabel: "High initial response (qualitative)",
    maxAppliedField: 1000,
    classification: "Soft magnetic alloy",
    description: "An iron-silicon electrical steel designed for magnetic applications such as transformer and motor cores.",
    characteristics: ["Very low coercivity", "High saturation flux density", "Designed for efficient alternating-field use"],
    permeability: null,
    hysteresisLoss: null,
  },
  {
    slug: "nickel",
    name: "Nickel",
    saturationFluxDensity: 0.6,
    coercivity: 100,
    remanence: 0.3,
    lowFieldResponse: 0.55,
    lowFieldResponseLabel: "Moderate initial response (qualitative)",
    maxAppliedField: 1000,
    classification: "Soft ferromagnetic metal",
    description: "A ferromagnetic metal with comparatively modest saturation flux density and relatively easy magnetic reversal.",
    characteristics: ["Low coercivity", "Lower saturation than iron-rich materials", "Ferromagnetic at room temperature"],
    permeability: null,
    hysteresisLoss: null,
  },
  {
    slug: "cobalt",
    name: "Cobalt",
    saturationFluxDensity: 1.8,
    coercivity: 800,
    remanence: 0.9,
    lowFieldResponse: 0.7,
    lowFieldResponseLabel: "Moderate-to-high initial response (qualitative)",
    maxAppliedField: 10000,
    classification: "Ferromagnetic metal",
    description: "A ferromagnetic transition metal notable for its strong magnetization and use in magnetic alloys.",
    characteristics: ["High saturation flux density", "Intermediate coercivity", "Can retain useful magnetization"],
    permeability: null,
    hysteresisLoss: null,
  },
  {
    slug: "alnico",
    name: "Alnico",
    saturationFluxDensity: 1.2,
    coercivity: 40000,
    remanence: 0.8,
    lowFieldResponse: 0.35,
    lowFieldResponseLabel: "Lower initial response (qualitative)",
    maxAppliedField: 100000,
    classification: "Permanent-magnet alloy",
    description: "An aluminum-nickel-cobalt alloy used for permanent magnets, known for strong resistance to demagnetization.",
    characteristics: ["Very high coercivity", "Strong resistance to demagnetization", "Moderate remanence"],
    permeability: null,
    hysteresisLoss: null,
  },
  {
    slug: "hard-steel",
    name: "Hard Steel",
    saturationFluxDensity: 1.5,
    coercivity: 5000,
    remanence: 0.9,
    lowFieldResponse: 0.5,
    lowFieldResponseLabel: "Moderate initial response (qualitative)",
    maxAppliedField: 50000,
    classification: "Hard magnetic material",
    description: "A steel with comparatively high coercivity that can retain magnetization after the applied field is removed.",
    characteristics: ["High coercivity", "Retains remanent magnetization", "Resists magnetic reversal"],
    permeability: null,
    hysteresisLoss: null,
  },
];

export const materialDataDisclaimer = "Illustrative starting parameters only; not certified experimental values.";
