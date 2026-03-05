import { useState } from "react";
import { Beaker, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ProjectInputs,
  DEFAULT_INPUTS,
  APPLICATION_TYPES,
  STRENGTH_OPTIONS,
  FLEXIBILITY_OPTIONS,
  WEIGHT_OPTIONS,
  TEMPERATURE_OPTIONS,
  COST_OPTIONS,
  CORROSION_OPTIONS,
  ELECTRICAL_OPTIONS,
  SUSTAINABILITY_OPTIONS,
} from "@/types/materials";

interface ToggleGroupProps {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
}

function ToggleGroup({ label, options, value, onChange }: ToggleGroupProps) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-foreground">{label}</Label>
      <div className="grid grid-cols-3 gap-1">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`px-2 py-2 text-xs font-medium rounded-md border transition-all ${
              value === opt
                ? "bg-accent text-accent-foreground border-accent glow-accent"
                : "bg-card text-muted-foreground border-border hover:border-accent/50"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

interface InputPanelProps {
  onSubmit: (inputs: ProjectInputs) => void;
  isLoading: boolean;
}

export default function InputPanel({ onSubmit, isLoading }: InputPanelProps) {
  const [inputs, setInputs] = useState<ProjectInputs>(DEFAULT_INPUTS);

  const update = (key: keyof ProjectInputs, value: string) =>
    setInputs((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md gradient-accent flex items-center justify-center">
            <Beaker className="w-4 h-4 text-accent-foreground" />
          </div>
          <div>
            <h2 className="font-display text-sm font-semibold text-foreground">
              Project Requirements
            </h2>
            <p className="text-xs text-muted-foreground">
              Define your material needs
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        <div className="space-y-2">
          <Label className="text-sm font-medium">Application Type</Label>
          <Select
            value={inputs.applicationType}
            onValueChange={(v) => update("applicationType", v)}
          >
            <SelectTrigger className="bg-card">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {APPLICATION_TYPES.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <ToggleGroup label="Strength Requirement" options={STRENGTH_OPTIONS} value={inputs.strength} onChange={(v) => update("strength", v)} />
        <ToggleGroup label="Flexibility" options={FLEXIBILITY_OPTIONS} value={inputs.flexibility} onChange={(v) => update("flexibility", v)} />
        <ToggleGroup label="Weight Constraint" options={WEIGHT_OPTIONS} value={inputs.weight} onChange={(v) => update("weight", v)} />
        <ToggleGroup label="Operating Temperature" options={TEMPERATURE_OPTIONS} value={inputs.temperature} onChange={(v) => update("temperature", v)} />
        <ToggleGroup label="Cost Sensitivity" options={COST_OPTIONS} value={inputs.cost} onChange={(v) => update("cost", v)} />
        <ToggleGroup label="Corrosion Resistance" options={CORROSION_OPTIONS} value={inputs.corrosion} onChange={(v) => update("corrosion", v)} />
        <ToggleGroup label="Electrical Properties" options={ELECTRICAL_OPTIONS} value={inputs.electrical} onChange={(v) => update("electrical", v)} />
        <ToggleGroup label="Sustainability Priority" options={SUSTAINABILITY_OPTIONS} value={inputs.sustainability} onChange={(v) => update("sustainability", v)} />
      </div>

      <div className="p-4 border-t border-border">
        <Button
          onClick={() => onSubmit(inputs)}
          disabled={isLoading}
          className="w-full gradient-accent text-accent-foreground font-display font-semibold h-12 text-sm hover:opacity-90 transition-opacity glow-accent"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
              Analyzing Materials...
            </span>
          ) : (
            "Generate Material Recommendation"
          )}
        </Button>
      </div>
    </div>
  );
}
