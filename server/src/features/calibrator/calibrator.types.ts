export interface CalibrationResult {
  level: string;
  confidence: number;
  strengths: string[];
  gaps: string[];
  nextLevelSuggestions: string[];
  statedRole: string;
  comparison: string;
}
