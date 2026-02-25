export type Stage = "needs_assignment" | "in_progress" | "internal_review" | "complete";
export type PairType = "Object Change" | "Action Change" | "Speech Change" | "Audio Change";

export interface QAChecklist {
  cameraPosition: boolean;
  lighting: boolean;
  oneChange: boolean;
  duration: boolean;
  resolution: boolean;
  naming: boolean;
}

export interface VideoPair {
  id: string;
  pairNumber: number;
  type: PairType;
  description: string;
  fullInstructions: string;
  assignedVA: string | null;
  stage: Stage;
  dueDate: string;
  driveLink: string;
  notes: string;
  videoAUploaded: boolean;
  videoBUploaded: boolean;
  qaChecklist: QAChecklist;
}

export const STAGES: { key: Stage; label: string; color: string }[] = [
  { key: "needs_assignment", label: "Needs Assignment", color: "#6b7280" },
  { key: "in_progress", label: "In Progress", color: "#3b82f6" },
  { key: "internal_review", label: "Internal Review", color: "#f59e0b" },
  { key: "complete", label: "Complete", color: "#10b981" },
];

export const PAIR_TYPES: PairType[] = ["Object Change", "Action Change", "Speech Change", "Audio Change"];

export const TYPE_COLORS: Record<PairType, { bg: string; text: string }> = {
  "Object Change": { bg: "bg-purple-50", text: "text-purple-700" },
  "Action Change": { bg: "bg-blue-50", text: "text-blue-700" },
  "Speech Change": { bg: "bg-amber-50", text: "text-amber-700" },
  "Audio Change": { bg: "bg-emerald-50", text: "text-emerald-700" },
};

export const VAS = ["Nate P.", "Joy S."];
