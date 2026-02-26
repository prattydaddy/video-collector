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

  function toggleQA(key: keyof QAChecklist) {
    onUpdate({ ...pair, qaChecklist: { ...pair.qaChecklist, [key]: !pair.qaChecklist[key] } });
  }

  function toggleVideo(which: "A" | "B") {
    if (which === "A") onUpdate({ ...pair, videoAUploaded: !pair.videoAUploaded });
    else onUpdate({ ...pair, videoBUploaded: !pair.videoBUploaded });
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
          {/* Instructions */}
          <div>
            <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Instructions</label>
            <p className="text-[13px] text-gray-700 mt-1.5 leading-relaxed">{pair.fullInstructions}</p>
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
            <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Upload Status</label>
            <div className="flex gap-4 mt-1.5">
              <button
                onClick={() => toggleVideo("A")}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-[13px] font-medium transition-all ${pair.videoAUploaded ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "bg-gray-50 border-gray-200 text-gray-500"}`}
              >
                {pair.videoAUploaded ? "✅" : "❌"} Video A
              </button>
              <button
                onClick={() => toggleVideo("B")}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-[13px] font-medium transition-all ${pair.videoBUploaded ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "bg-gray-50 border-gray-200 text-gray-500"}`}
              >
                {pair.videoBUploaded ? "✅" : "❌"} Video B
              </button>
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

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => {
                onUpdate({ ...pair, stage: "complete" });
                onClose();
              }}
              className="flex-1 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[13px] font-semibold rounded-xl transition-colors"
            >
              ✓ Approve
            </button>
            <button
              onClick={() => {
                onUpdate({ ...pair, stage: "in_progress", notes: pair.notes || "Reshoot requested" });
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
