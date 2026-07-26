export type ReportSection = {
  id: "overview" | "recommendations" | "evidence" | "seniority" | "breakdown";
  label: string;
};

export const REPORT_SECTIONS: ReportSection[] = [
  { id: "overview", label: "Overview" },
   { id: "seniority", label: "Seniority" },
  { id: "evidence", label: "Evidence" },
 
  { id: "breakdown", label: "Breakdown" },
  { id: "recommendations", label: "Recommendations" },
];
