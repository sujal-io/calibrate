export type ReportSection = {
  id: "overview" | "recommendations" | "evidence" | "seniority" | "breakdown";
  label: string;
};

export const REPORT_SECTIONS: ReportSection[] = [
  { id: "overview", label: "Overview" },
  { id: "recommendations", label: "Recommendations" },
  { id: "evidence", label: "Evidence" },
  { id: "seniority", label: "Seniority" },
  { id: "breakdown", label: "Breakdown" },
];
