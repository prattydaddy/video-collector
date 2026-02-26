import { useState } from "react";
import type { VideoPair, QAChecklist } from "../types";
import { TYPE_COLORS, VAS } from "../types";

interface Props {
  pair: VideoPair;
  onClose: () => void;
  onUpdate: (updated: VideoPair) => void;
}

const QA_LABELS: { key: keyof QAChecklist; label: string }[] = [
  { key: "cameraPosition", label: "Camera position identical" },
  { key: "lighting", label: "Lighting identical" },
  { key: "oneChange", label: "Only ONE thing changed" },
  { key: "duration", label: "5-20 seconds each" },
  { key: "resolution", label: "Min 720p, not blurry" },
  { key: "stableCamera", label: "Stable camera (tripod preferred)" },
  { key: "noOutfitChange", label: "No outfit changes between clips" },
  { key: "noFilters", label: "No filters, edits, or jump cuts" },
];

export default function DetailModal({ pair, onClose, onUpdate }: Props) {
  const typeColor = TYPE_COLORS[pair.type];
  const [copiedFile, setCopiedFile] = useState<string | null>(null);
  const [editingDesc, setEditingDesc] = useState(false);
  const [descDraft, setDescDraft] = useState(pair.description);
  const [driveSynced, setDriveSynced] = useState(false);
  const [editingInstr, setEditingInstr] = useState(false);
  const [instrDraft, setInstrDraft] = useState(pair.fullInstructions);

  const padded = String(pair.pairNumber).padStart(2, "0");
  const filenameA = `Pair${padded}_A.mp4`;
  const filenameB = `Pair${padded}_B.mp4`;

  function copyFilename(filename: string) {
    navigator.clipboard.writeText(filename);
    setCopiedFile(filename);
    setTimeout(() => setCopiedFile(null), 1500);
  }

  function toggleQA(key: keyof QAChecklist) {
    onUpdate({ ...pair, qaChecklist: { ...pair.qaChecklist, [key]: !pair.qaChecklist[key] } });
  }

  function toggleVideo(which: "A" | "B") {
    const newA = which === "A" ? !pair.videoAUploaded : pair.videoAUploaded;
    const newB = which === "B" ? !pair.videoBUploaded : pair.videoBUploaded;
    const updated: Partial<VideoPair> = which === "A" ? { videoAUploaded: newA } : { videoBUploaded: newB };
    // Auto-move to internal_review when both uploaded (only if currently in_progress or needs_revision)
    if (newA && newB && (pair.stage === "in_progress" || pair.stage === "needs_revision")) {
      updated.stage = "internal_review" as any;
    }
    onUpdate({ ...pair, ...updated });
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-[600px] max-h-[90vh] overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-lg font-bold text-gray-900">Pair {pair.pairNumber}</span>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-medium ${typeColor.bg} ${typeColor.text}`}>
                {pair.type}
              </span>
            </div>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>
        </div>

        <div className="px-6 py-5 space-y-5">
          {/* Description (editable) */}
          <div>
            <div className="flex items-center gap-1.5">
              <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Description</label>
              {!editingDesc && (
                <button
                  onClick={() => { setDescDraft(pair.description); setEditingDesc(true); }}
                  className="text-[13px] text-gray-400 hover:text-gray-600 transition-colors"
                  title="Edit description"
                >✏️</button>
              )}
            </div>
            {editingDesc ? (
              <textarea
                autoFocus
                value={descDraft}
                onChange={(e) => setDescDraft(e.target.value)}
                onBlur={() => {
                  if (descDraft !== pair.description) {
                    onUpdate({ ...pair, description: descDraft });
                    // Fire-and-forget Drive sync
                    fetch("/api/update-description", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ pairNumber: pair.pairNumber, description: descDraft }),
                    })
                      .then((r) => { if (r.ok) { setDriveSynced(true); setTimeout(() => setDriveSynced(false), 2000); } })
                      .catch(() => {});
                  }
                  setEditingDesc(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    (e.target as HTMLTextAreaElement).blur();
                  }
                  if (e.key === "Escape") {
                    setDescDraft(pair.description);
                    setEditingDesc(false);
                  }
                }}
                rows={2}
                className="mt-1.5 w-full text-[13px] text-gray-700 border border-indigo-300 rounded-xl px-4 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none"
              />
            ) : (
              <p className="text-[13px] text-gray-700 mt-1.5 leading-relaxed">{pair.description}</p>
            )}
            {driveSynced && <span className="text-[11px] text-emerald-600 mt-1">📁 Synced to Drive</span>}
          </div>

          {/* Full Instructions (editable) */}
          <div>
            <div className="flex items-center gap-1.5">
              <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Instructions</label>
              {!editingInstr && (
                <button
                  onClick={() => { setInstrDraft(pair.fullInstructions); setEditingInstr(true); }}
                  className="text-[13px] text-gray-400 hover:text-gray-600 transition-colors"
                  title="Edit instructions"
                >✏️</button>
              )}
            </div>
            {editingInstr ? (
              <textarea
                autoFocus
                value={instrDraft}
                onChange={(e) => setInstrDraft(e.target.value)}
                onBlur={() => {
                  if (instrDraft !== pair.fullInstructions) {
                    onUpdate({ ...pair, fullInstructions: instrDraft });
                  }
                  setEditingInstr(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    (e.target as HTMLTextAreaElement).blur();
                  }
                  if (e.key === "Escape") {
                    setInstrDraft(pair.fullInstructions);
                    setEditingInstr(false);
                  }
                }}
                rows={4}
                className="mt-1.5 w-full text-[13px] text-gray-700 border border-indigo-300 rounded-xl px-4 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none"
              />
            ) : (
              <p className="text-[13px] text-gray-700 mt-1.5 leading-relaxed">{pair.fullInstructions}</p>
            )}
          </div>

          {/* Rules */}
          <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3">
            <label className="text-[11px] font-semibold text-red-400 uppercase tracking-wider">⚠️ Do NOT</label>
            <ul className="mt-1.5 text-[12px] text-red-600 space-y-0.5 list-disc list-inside">
              <li>Change camera angle between videos</li>
              <li>Change lighting or shoot at different time of day</li>
              <li>Change outfits between clips</li>
              <li>Add filters, edits, or jump cuts</li>
              <li>Make large or dramatic changes</li>
              <li>Use different takes that look noticeably different</li>
            </ul>
            <p className="mt-2 text-[12px] text-red-700 font-medium">Goal: "Spot the difference" — everything same except ONE thing.</p>
          </div>

          {/* Assigned VA */}
          <div>
            <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Assigned VA</label>
            <div className="relative mt-1.5">
              <select
                value={pair.assignedVA || ""}
                onChange={(e) => onUpdate({ ...pair, assignedVA: e.target.value || null })}
                className="appearance-none text-[13px] font-medium text-gray-800 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl px-4 py-2 pr-9 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 cursor-pointer transition-all"
              >
                <option value="">Unassigned</option>
                {VAS.map((v) => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
              <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Upload Status */}
          <div>
            <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Upload Files</label>
            <div className="mt-1.5 border border-gray-200 rounded-xl overflow-hidden">
              {([["A", filenameA, pair.videoAUploaded] as const, ["B", filenameB, pair.videoBUploaded] as const]).map(([which, filename, uploaded], i) => (
                <div key={which} className={`flex items-center justify-between px-4 py-2.5 ${i > 0 ? "border-t border-gray-100" : ""}`}>
                  <div className="flex items-center gap-2.5">
                    <span className="text-gray-400 text-[13px]">📄</span>
                    <code className="text-[13px] font-mono font-medium text-gray-800 bg-gray-50 px-2 py-0.5 rounded">{filename}</code>
                    <button
                      onClick={() => copyFilename(filename)}
                      className="text-gray-400 hover:text-gray-600 transition-colors relative"
                      title="Copy filename"
                    >
                      {copiedFile === filename ? (
                        <span className="text-[11px] font-medium text-emerald-600">Copied!</span>
                      ) : (
                        <span className="text-[14px]">📋</span>
                      )}
                    </button>
                  </div>
                  <button
                    onClick={() => toggleVideo(which)}
                    className={`flex items-center gap-1.5 text-[12px] font-medium px-2.5 py-1 rounded-lg transition-all ${uploaded ? "bg-emerald-50 text-emerald-700" : "bg-gray-50 text-gray-400 hover:text-gray-600"}`}
                  >
                    {uploaded ? "✅" : "⬜"} Uploaded
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Drive Link */}
          <div>
            <a
              href={pair.driveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[13px] font-medium text-blue-600 hover:text-blue-700 transition-colors"
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              Open Google Drive Folder
            </a>
            {pair.clientDriveLink && (
              <a
                href={pair.clientDriveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[13px] font-medium text-green-600 hover:text-green-700 transition-colors mt-1.5"
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                Open Client Folder
              </a>
            )}
          </div>

          {/* QA Checklist */}
          <div>
            <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">QA Checklist</label>
            <div className="mt-2 space-y-1.5">
              {QA_LABELS.map(({ key, label }) => (
                <label key={key} className="flex items-center gap-2.5 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={pair.qaChecklist[key]}
                    onChange={() => toggleQA(key)}
                    className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500/20"
                  />
                  <span className="text-[13px] text-gray-700 group-hover:text-gray-900">{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Notes / Feedback</label>
            <textarea
              value={pair.notes}
              onChange={(e) => onUpdate({ ...pair, notes: e.target.value })}
              placeholder="QA feedback, reshoot notes, etc."
              rows={3}
              className="mt-1.5 w-full text-[13px] text-gray-700 border border-gray-200 rounded-xl px-4 py-2.5 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 placeholder-gray-400 transition-all resize-none"
            />
          </div>

          {/* Delivery Status */}
          {pair.delivered && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2.5 flex items-center gap-2">
              <span className="text-[13px] font-medium text-emerald-700">📤 Delivered to client</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={async () => {
                const updated = { ...pair, stage: "complete" as const };
                onUpdate(updated);
                // Auto-deliver to client
                try {
                  const resp = await fetch("/api/deliver", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ pairNumber: pair.pairNumber }),
                  });
                  if (resp.ok) {
                    onUpdate({ ...updated, delivered: true });
                  } else {
                    const err = await resp.json();
                    alert(`Delivery failed: ${err.error}`);
                  }
                } catch (e: any) {
                  alert(`Delivery error: ${e.message}`);
                }
                onClose();
              }}
              className="flex-1 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[13px] font-semibold rounded-xl transition-colors"
            >
              ✓ Approve
            </button>
            <button
              onClick={() => {
                onUpdate({ ...pair, stage: "needs_revision", notes: pair.notes || "Reshoot requested" });
                onClose();
              }}
              className="flex-1 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-[13px] font-semibold rounded-xl transition-colors"
            >
              ↺ Request Reshoot
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
