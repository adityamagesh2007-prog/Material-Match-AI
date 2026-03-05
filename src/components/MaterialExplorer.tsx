import { useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { materialsDatabase } from "@/data/materialsDatabase";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function MaterialExplorer() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  const categories = [...new Set(materialsDatabase.map((m) => m.category))];

  const filtered = materialsDatabase.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.commonUses.some((u) => u.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = !categoryFilter || m.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Search className="w-4 h-4" /> Material Explorer
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="font-display">Materials Database</DialogTitle>
        </DialogHeader>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search materials or applications..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-1">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategoryFilter(categoryFilter === c ? null : c)}
                className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${
                  categoryFilter === c
                    ? "bg-accent text-accent-foreground border-accent"
                    : "bg-card text-muted-foreground border-border hover:border-accent/50"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-y-auto flex-1 mt-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-display">Material</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Density</TableHead>
                <TableHead>Tensile Strength</TableHead>
                <TableHead>Max Temp</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>Recyclable</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((m) => (
                <TableRow key={m.name}>
                  <TableCell>
                    <div>
                      <span className="font-medium text-sm">{m.name}</span>
                      <div className="flex gap-1 mt-1 flex-wrap">
                        {m.commonUses.slice(0, 2).map((u) => (
                          <Badge key={u} variant="secondary" className="text-[10px]">{u}</Badge>
                        ))}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell><Badge variant="outline" className="text-xs">{m.category}</Badge></TableCell>
                  <TableCell className="text-sm">{m.density}</TableCell>
                  <TableCell className="text-sm">{m.tensileStrength}</TableCell>
                  <TableCell className="text-sm">{m.maxTemp}</TableCell>
                  <TableCell className="text-sm">{m.costLevel}</TableCell>
                  <TableCell className="text-sm">{m.recyclable ? "✓" : "✗"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
