import { MaterialRecommendation } from "@/types/materials";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ComparisonTableProps {
  primary: MaterialRecommendation;
  alternatives: MaterialRecommendation[];
}

function ScoreBadge({ value }: { value: number }) {
  const label = value >= 8 ? "Very High" : value >= 6 ? "High" : value >= 4 ? "Medium" : "Low";
  const cls = value >= 8 ? "bg-success/10 text-success" : value >= 6 ? "bg-info/10 text-info" : value >= 4 ? "bg-warning/10 text-warning" : "bg-muted text-muted-foreground";
  return <span className={`px-2 py-0.5 rounded text-xs font-medium ${cls}`}>{label}</span>;
}

export default function ComparisonTable({ primary, alternatives }: ComparisonTableProps) {
  const all = [primary, ...alternatives];

  return (
    <div className="panel-card overflow-hidden">
      <div className="p-4 border-b border-border">
        <h3 className="font-display text-sm font-semibold text-foreground">Side-by-Side Comparison</h3>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-display">Material</TableHead>
              <TableHead>Strength</TableHead>
              <TableHead>Weight</TableHead>
              <TableHead>Cost</TableHead>
              <TableHead>Thermal</TableHead>
              <TableHead>Sustainability</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {all.map((mat, i) => (
              <TableRow key={mat.name} className={i === 0 ? "bg-accent/5" : ""}>
                <TableCell className="font-medium text-sm">
                  <div>
                    <span>{mat.name}</span>
                    {i === 0 && <span className="ml-2 text-xs bg-accent/20 text-accent px-1.5 py-0.5 rounded">Primary</span>}
                  </div>
                </TableCell>
                <TableCell><ScoreBadge value={mat.chartScores.strength} /></TableCell>
                <TableCell><ScoreBadge value={10 - mat.chartScores.density} /></TableCell>
                <TableCell><ScoreBadge value={mat.chartScores.cost} /></TableCell>
                <TableCell><ScoreBadge value={mat.chartScores.thermalResistance} /></TableCell>
                <TableCell><ScoreBadge value={mat.chartScores.sustainability} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
