import { AIResult } from "@/types/materials";
import ConfidenceScore from "./ConfidenceScore";
import ComparisonChart from "./ComparisonChart";
import ComparisonTable from "./ComparisonTable";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, Lightbulb, Leaf, Wrench, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generatePDF } from "@/lib/pdfExport";

interface ResultsDashboardProps {
  result: AIResult;
}

function Section({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="panel-card p-4 animate-fade-in">
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <h3 className="font-display text-sm font-semibold text-foreground">{title}</h3>
      </div>
      {children}
    </div>
  );
}

export default function ResultsDashboard({ result }: ResultsDashboardProps) {
  return (
    <div className="p-4 lg:p-6 space-y-4 overflow-y-auto h-full">
      {/* Header with confidence + download */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h2 className="font-display text-xl font-bold text-foreground">Analysis Results</h2>
          <p className="text-sm text-muted-foreground mt-1">AI-powered material recommendation report</p>
        </div>
        <div className="flex items-center gap-4">
          <ConfidenceScore score={result.confidenceScore} />
          <Button variant="outline" size="sm" className="gap-2" onClick={() => generatePDF(result)}>
            <Download className="w-4 h-4" /> Export PDF
          </Button>
        </div>
      </div>

      {/* Requirement Summary */}
      <Section title="Project Requirements Summary" icon={<Wrench className="w-4 h-4 text-accent" />}>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {Object.entries(result.summary).map(([k, v]) => (
            <div key={k} className="bg-muted/50 rounded-md px-3 py-2">
              <span className="text-xs text-muted-foreground block">{k}</span>
              <span className="text-sm font-medium text-foreground">{v}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Primary Material */}
      <Section title="Primary Recommended Material" icon={<CheckCircle className="w-4 h-4 text-success" />}>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="font-display text-lg font-bold text-foreground">{result.primary.name}</span>
            <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">{result.primary.category}</Badge>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{result.primary.reason}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
            {Object.entries(result.primary.properties).map(([k, v]) => (
              <div key={k} className="flex justify-between text-sm bg-muted/30 rounded px-3 py-1.5">
                <span className="text-muted-foreground capitalize">{k.replace(/([A-Z])/g, ' $1')}</span>
                <span className="font-medium text-foreground">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Alternatives */}
      <Section title="Alternative Materials" icon={<Lightbulb className="w-4 h-4 text-warning" />}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {result.alternatives.map((alt) => (
            <div key={alt.name} className="border border-border rounded-lg p-3 hover:border-accent/40 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-display text-sm font-semibold text-foreground">{alt.name}</span>
              </div>
              <Badge variant="secondary" className="text-xs mb-2">{alt.category}</Badge>
              <p className="text-xs text-muted-foreground leading-relaxed">{alt.reason}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Charts */}
      <ComparisonChart primary={result.primary} alternatives={result.alternatives} />

      {/* Comparison Table */}
      <ComparisonTable primary={result.primary} alternatives={result.alternatives} />

      {/* Advantages & Limitations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Section title="Advantages" icon={<CheckCircle className="w-4 h-4 text-success" />}>
          <ul className="space-y-1.5">
            {result.primary.advantages.map((a, i) => (
              <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-success mt-1.5 shrink-0" />
                {a}
              </li>
            ))}
          </ul>
        </Section>
        <Section title="Limitations" icon={<AlertTriangle className="w-4 h-4 text-warning" />}>
          <ul className="space-y-1.5">
            {result.primary.limitations.map((l, i) => (
              <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-warning mt-1.5 shrink-0" />
                {l}
              </li>
            ))}
          </ul>
        </Section>
      </div>

      {/* Applications */}
      <Section title="Typical Applications" icon={<Wrench className="w-4 h-4 text-info" />}>
        <div className="flex flex-wrap gap-2">
          {result.primary.applications.map((app, i) => (
            <Badge key={i} variant="secondary" className="text-xs">{app}</Badge>
          ))}
        </div>
      </Section>

      {/* Sustainability */}
      <Section title="Sustainability Assessment" icon={<Leaf className="w-4 h-4 text-success" />}>
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center bg-success/5 rounded-lg p-3">
            <span className="text-xs text-muted-foreground block mb-1">Recyclability</span>
            <span className="font-display font-bold text-foreground">{result.sustainability.recyclability}</span>
          </div>
          <div className="text-center bg-info/5 rounded-lg p-3">
            <span className="text-xs text-muted-foreground block mb-1">Environmental Impact</span>
            <span className="font-display font-bold text-foreground">{result.sustainability.environmentalImpact}</span>
          </div>
          <div className="text-center bg-warning/5 rounded-lg p-3">
            <span className="text-xs text-muted-foreground block mb-1">Decomposition</span>
            <span className="font-display font-bold text-foreground">{result.sustainability.decompositionTimeline}</span>
          </div>
        </div>
      </Section>

      {/* Innovation Suggestions */}
      <Section title="Innovation Engine — Next-Gen Materials" icon={<Lightbulb className="w-4 h-4 text-accent" />}>
        <div className="space-y-3">
          {result.innovations.map((inn, i) => (
            <div key={i} className="border border-border rounded-lg p-3">
              <span className="font-display text-sm font-semibold text-accent">{inn.name}</span>
              <p className="text-xs text-muted-foreground mt-1">{inn.benefit}</p>
              <p className="text-xs text-warning mt-1">Trade-off: {inn.tradeoff}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
