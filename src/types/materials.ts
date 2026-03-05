export interface ProjectInputs {
  applicationType: string;
  strength: string;
  flexibility: string;
  weight: string;
  temperature: string;
  cost: string;
  corrosion: string;
  electrical: string;
  sustainability: string;
}

export interface MaterialProperties {
  density: string;
  tensileStrength: string;
  thermalResistance: string;
  flexibility: string;
  chemicalResistance: string;
  electricalProperties: string;
}

export interface MaterialRecommendation {
  name: string;
  category: string;
  reason: string;
  properties: MaterialProperties;
  advantages: string[];
  limitations: string[];
  applications: string[];
  chartScores: {
    strength: number;
    density: number;
    cost: number;
    thermalResistance: number;
    sustainability: number;
  };
}

export interface SustainabilityAssessment {
  recyclability: string;
  environmentalImpact: string;
  decompositionTimeline: string;
}

export interface InnovationSuggestion {
  name: string;
  benefit: string;
  tradeoff: string;
}

export interface AIResult {
  summary: Record<string, string>;
  primary: MaterialRecommendation;
  alternatives: MaterialRecommendation[];
  sustainability: SustainabilityAssessment;
  confidenceScore: number;
  innovations: InnovationSuggestion[];
}

export interface MaterialDatabaseEntry {
  name: string;
  category: string;
  density: string;
  tensileStrength: string;
  maxTemp: string;
  costLevel: string;
  recyclable: boolean;
  commonUses: string[];
}

export const APPLICATION_TYPES = [
  "Consumer Product", "Packaging", "Automotive", "Aerospace",
  "Electronics", "Medical Device", "Construction", "Industrial Equipment",
] as const;

export const STRENGTH_OPTIONS = ["Low", "Medium", "High"] as const;
export const FLEXIBILITY_OPTIONS = ["Flexible", "Balanced", "Rigid"] as const;
export const WEIGHT_OPTIONS = ["Lightweight", "Balanced", "Heavy Duty"] as const;
export const TEMPERATURE_OPTIONS = ["Low", "Moderate", "High"] as const;
export const COST_OPTIONS = ["Low Cost", "Balanced", "High Performance"] as const;
export const CORROSION_OPTIONS = ["Not Important", "Moderate", "High"] as const;
export const ELECTRICAL_OPTIONS = ["Insulator", "Conductive", "Not Important"] as const;
export const SUSTAINABILITY_OPTIONS = ["Low", "Medium", "High"] as const;

export const DEFAULT_INPUTS: ProjectInputs = {
  applicationType: "Consumer Product",
  strength: "Medium",
  flexibility: "Balanced",
  weight: "Lightweight",
  temperature: "Moderate",
  cost: "Balanced",
  corrosion: "Moderate",
  electrical: "Not Important",
  sustainability: "Medium",
};
