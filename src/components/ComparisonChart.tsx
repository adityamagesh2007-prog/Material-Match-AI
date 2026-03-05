import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Legend } from "recharts";
import { MaterialRecommendation } from "@/types/materials";

interface ComparisonChartProps {
  primary: MaterialRecommendation;
  alternatives: MaterialRecommendation[];
}

const COLORS = ["hsl(174, 62%, 40%)", "hsl(220, 55%, 45%)", "hsl(38, 92%, 50%)", "hsl(280, 60%, 50%)"];

export default function ComparisonChart({ primary, alternatives }: ComparisonChartProps) {
  const allMaterials = [primary, ...alternatives];
  const metrics = ["strength", "density", "cost", "thermalResistance", "sustainability"] as const;
  const labels: Record<string, string> = {
    strength: "Strength",
    density: "Density",
    cost: "Cost Efficiency",
    thermalResistance: "Thermal",
    sustainability: "Sustainability",
  };

  const data = metrics.map((m) => {
    const point: Record<string, string | number> = { metric: labels[m] };
    allMaterials.forEach((mat) => {
      point[mat.name] = mat.chartScores[m];
    });
    return point;
  });

  return (
    <div className="panel-card p-4">
      <h3 className="font-display text-sm font-semibold text-foreground mb-4">Material Performance Comparison</h3>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={data}>
          <PolarGrid stroke="hsl(var(--border))" />
          <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
          {allMaterials.map((mat, i) => (
            <Radar
              key={mat.name}
              name={mat.name}
              dataKey={mat.name}
              stroke={COLORS[i]}
              fill={COLORS[i]}
              fillOpacity={i === 0 ? 0.25 : 0.1}
              strokeWidth={2}
            />
          ))}
          <Legend wrapperStyle={{ fontSize: 11 }} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
