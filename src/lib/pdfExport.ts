import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { AIResult } from "@/types/materials";

export function generatePDF(result: AIResult) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  // Title
  doc.setFontSize(20);
  doc.setTextColor(30, 45, 80);
  doc.text("MaterialMatch AI", 14, 20);
  doc.setFontSize(10);
  doc.setTextColor(120, 120, 120);
  doc.text("AI-Powered Material Selection Report", 14, 27);
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 33);

  doc.setDrawColor(0, 167, 157);
  doc.setLineWidth(0.5);
  doc.line(14, 36, pageWidth - 14, 36);

  // Requirements summary
  let y = 44;
  doc.setFontSize(13);
  doc.setTextColor(30, 45, 80);
  doc.text("Project Requirements", 14, y);
  y += 8;
  doc.setFontSize(9);
  doc.setTextColor(80, 80, 80);
  Object.entries(result.summary).forEach(([k, v]) => {
    doc.text(`${k}: ${v}`, 14, y);
    y += 5;
  });

  // Primary recommendation
  y += 5;
  doc.setFontSize(13);
  doc.setTextColor(30, 45, 80);
  doc.text("Primary Recommended Material", 14, y);
  y += 8;
  doc.setFontSize(11);
  doc.setTextColor(0, 167, 157);
  doc.text(`${result.primary.name} (${result.primary.category})`, 14, y);
  y += 6;
  doc.setFontSize(9);
  doc.setTextColor(80, 80, 80);
  const reasonLines = doc.splitTextToSize(result.primary.reason, pageWidth - 28);
  doc.text(reasonLines, 14, y);
  y += reasonLines.length * 4.5 + 4;

  // Properties table
  doc.setFontSize(11);
  doc.setTextColor(30, 45, 80);
  doc.text("Engineering Confidence Score: " + result.confidenceScore + "%", 14, y);
  y += 8;

  // Comparison table
  const allMats = [result.primary, ...result.alternatives];
  autoTable(doc, {
    startY: y,
    head: [["Material", "Category", "Strength", "Cost Eff.", "Sustainability"]],
    body: allMats.map((m) => [
      m.name,
      m.category,
      m.chartScores.strength + "/10",
      m.chartScores.cost + "/10",
      m.chartScores.sustainability + "/10",
    ]),
    theme: "grid",
    headStyles: { fillColor: [30, 45, 80], fontSize: 9 },
    bodyStyles: { fontSize: 8 },
    margin: { left: 14 },
  });

  // Advantages
  const finalY = (doc as any).lastAutoTable?.finalY || y + 40;
  if (finalY + 30 < doc.internal.pageSize.getHeight()) {
    doc.setFontSize(11);
    doc.setTextColor(30, 45, 80);
    doc.text("Advantages", 14, finalY + 10);
    doc.setFontSize(9);
    doc.setTextColor(80, 80, 80);
    result.primary.advantages.forEach((a, i) => {
      doc.text(`• ${a}`, 16, finalY + 18 + i * 5);
    });
  }

  doc.save("MaterialMatch-Report.pdf");
}
