import { ProjectInputs, AIResult } from "@/types/materials";
import { supabase } from "@/integrations/supabase/client";

export async function getAIRecommendation(inputs: ProjectInputs): Promise<AIResult> {
  const prompt = `You are a materials engineering expert. Given these project requirements, provide a detailed material recommendation.

Requirements:
- Application: ${inputs.applicationType}
- Strength: ${inputs.strength}
- Flexibility: ${inputs.flexibility}
- Weight: ${inputs.weight}
- Operating Temperature: ${inputs.temperature}
- Cost Sensitivity: ${inputs.cost}
- Corrosion Resistance: ${inputs.corrosion}
- Electrical Properties: ${inputs.electrical}
- Sustainability Priority: ${inputs.sustainability}

You MUST respond with this EXACT JSON structure (no deviation):
{
  "summary": { "Application": "${inputs.applicationType}", "Strength": "${inputs.strength}", "Flexibility": "${inputs.flexibility}", "Weight": "${inputs.weight}", "Temperature": "${inputs.temperature}", "Cost": "${inputs.cost}", "Corrosion": "${inputs.corrosion}", "Electrical": "${inputs.electrical}", "Sustainability": "${inputs.sustainability}" },
  "primary": {
    "name": "Specific Material Name",
    "category": "Polymer or Metal or Composite or Ceramic",
    "reason": "2-3 sentence explanation of why this material is optimal for these requirements",
    "properties": {
      "density": "value with units",
      "tensileStrength": "value with units",
      "thermalResistance": "value with units",
      "flexibility": "description",
      "chemicalResistance": "description",
      "electricalProperties": "description"
    },
    "advantages": ["advantage 1", "advantage 2", "advantage 3", "advantage 4"],
    "limitations": ["limitation 1", "limitation 2", "limitation 3"],
    "applications": ["real-world application 1", "application 2", "application 3", "application 4"],
    "chartScores": { "strength": 7, "density": 4, "cost": 6, "thermalResistance": 5, "sustainability": 7 }
  },
  "alternatives": [
    {
      "name": "Alternative Material 1",
      "category": "Polymer or Metal or Composite or Ceramic",
      "reason": "1-2 sentences explaining suitability",
      "properties": { "density": "...", "tensileStrength": "...", "thermalResistance": "...", "flexibility": "...", "chemicalResistance": "...", "electricalProperties": "..." },
      "advantages": ["adv1", "adv2"],
      "limitations": ["lim1", "lim2"],
      "applications": ["app1", "app2"],
      "chartScores": { "strength": 5, "density": 3, "cost": 8, "thermalResistance": 4, "sustainability": 6 }
    },
    {
      "name": "Alternative Material 2",
      "category": "...",
      "reason": "...",
      "properties": { "density": "...", "tensileStrength": "...", "thermalResistance": "...", "flexibility": "...", "chemicalResistance": "...", "electricalProperties": "..." },
      "advantages": ["adv1", "adv2"],
      "limitations": ["lim1", "lim2"],
      "applications": ["app1", "app2"],
      "chartScores": { "strength": 6, "density": 5, "cost": 5, "thermalResistance": 7, "sustainability": 4 }
    },
    {
      "name": "Alternative Material 3",
      "category": "...",
      "reason": "...",
      "properties": { "density": "...", "tensileStrength": "...", "thermalResistance": "...", "flexibility": "...", "chemicalResistance": "...", "electricalProperties": "..." },
      "advantages": ["adv1", "adv2"],
      "limitations": ["lim1", "lim2"],
      "applications": ["app1", "app2"],
      "chartScores": { "strength": 8, "density": 6, "cost": 3, "thermalResistance": 8, "sustainability": 5 }
    }
  ],
  "sustainability": {
    "recyclability": "High or Medium or Low",
    "environmentalImpact": "Low or Medium or High",
    "decompositionTimeline": "e.g. 50-100 years or N/A for metals"
  },
  "confidenceScore": 85,
  "innovations": [
    { "name": "Next-gen material", "benefit": "Why it improves the design", "tradeoff": "Cost or difficulty" },
    { "name": "Another material", "benefit": "...", "tradeoff": "..." }
  ]
}

ALL chartScores values must be integers 1-10. confidenceScore must be 0-100. Use realistic engineering data. Fill in ALL fields with real values, not placeholders.`;

  const { data, error } = await supabase.functions.invoke("material-ai", {
    body: { prompt },
  });

  if (error) throw new Error(error.message || "AI request failed");
  if (data?.error) {
    throw new Error(data.error);
  }

  // Validate the response has required fields
  const result = data as AIResult;
  if (!result.primary || !result.alternatives || !result.summary) {
    throw new Error("Invalid AI response format. Please try again.");
  }

  return result;
}
