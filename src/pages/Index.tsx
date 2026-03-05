import { useState } from "react";
import { Atom, Database } from "lucide-react";
import InputPanel from "@/components/InputPanel";
import ResultsDashboard from "@/components/ResultsDashboard";
import MaterialExplorer from "@/components/MaterialExplorer";
import { ProjectInputs, AIResult } from "@/types/materials";
import { getAIRecommendation } from "@/lib/aiService";
import { toast } from "sonner";

export default function Index() {
  const [result, setResult] = useState<AIResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (inputs: ProjectInputs) => {
    setIsLoading(true);
    try {
      const data = await getAIRecommendation(inputs);
      setResult(data);
    } catch (e: any) {
      toast.error(e.message || "Failed to generate recommendation");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="h-14 border-b border-border bg-card px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center">
            <Atom className="w-5 h-5 text-accent-foreground" />
          </div>
          <div>
            <h1 className="font-display text-base font-bold text-foreground leading-tight">MaterialMatch AI</h1>
            <p className="text-[10px] text-muted-foreground leading-tight">Smart Material Selection Assistant</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <MaterialExplorer />
        </div>
      </header>

      {/* Main two-panel layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Panel */}
        <aside className="w-full lg:w-[340px] xl:w-[380px] border-b lg:border-b-0 lg:border-r border-border bg-card shrink-0 overflow-y-auto">
          <InputPanel onSubmit={handleSubmit} isLoading={isLoading} />
        </aside>

        {/* Right Panel */}
        <main className="flex-1 overflow-y-auto engineering-grid">
          {!result && !isLoading ? (
            <div className="h-full flex items-center justify-center p-8">
              <div className="text-center max-w-md animate-fade-in">
                <div className="w-16 h-16 rounded-2xl gradient-hero flex items-center justify-center mx-auto mb-6">
                  <Database className="w-8 h-8 text-accent-foreground" />
                </div>
                <h2 className="font-display text-xl font-bold text-foreground mb-2">
                  Ready to Analyze
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Configure your project requirements in the left panel and click 
                  <span className="text-accent font-medium"> Generate Material Recommendation </span>
                  to receive AI-powered engineering analysis.
                </p>
                <p className="text-xs text-muted-foreground mt-4">
                  AI-Powered Material Selection for Smarter Engineering Decisions
                </p>
              </div>
            </div>
          ) : isLoading ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center animate-fade-in">
                <div className="w-12 h-12 border-3 border-accent/30 border-t-accent rounded-full animate-spin mx-auto mb-4" />
                <p className="font-display text-sm font-medium text-foreground">Analyzing Materials...</p>
                <p className="text-xs text-muted-foreground mt-1">Running engineering analysis with AI</p>
              </div>
            </div>
          ) : result ? (
            <ResultsDashboard result={result} />
          ) : null}
        </main>
      </div>
    </div>
  );
}
