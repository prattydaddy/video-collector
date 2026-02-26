import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { VideoPair } from "../types";
import { TYPE_COLORS } from "../types";

interface Props {
  pair: VideoPair;
  onClick: () => void;
}

export default function PairCard({ pair, onClick }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: pair.id,
    data: { stage: pair.stage },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const typeColor = TYPE_COLORS[pair.type];
  const initials = pair.assignedVA ? pair.assignedVA.split(" ").map(n => n[0]).join("") : "?";

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={onClick}
      className="bg-white border border-gray-200 rounded-xl p-3.5 hover:border-gray-300 hover:shadow-sm transition-all cursor-grab active:cursor-grabbing"
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[13px] font-semibold text-gray-900">Pair {pair.pairNumber}</span>
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium ${typeColor.bg} ${typeColor.text}`}>
          {pair.type}
        </span>
      </div>

      <p className="text-[12px] text-gray-600 leading-relaxed mb-3">{pair.description}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-semibold ${pair.assignedVA ? "bg-indigo-100 text-indigo-700" : "bg-gray-100 text-gray-400"}`}>
            {initials}
          </div>
          <span className="text-[11px] text-gray-500">{pair.assignedVA || "Unassigned"}</span>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={pair.driveLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-gray-300 hover:text-blue-500 transition-colors"
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </a>
          <span className="text-[10px] text-gray-400">{new Date(pair.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
        </div>
      </div>

      {pair.delivered && (
        <div className="mt-2 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
          📤 Delivered
        </div>
      )}

      {pair.notes && (
        <div className="mt-2 px-2 py-1.5 bg-amber-50 rounded-lg">
          <p className="text-[11px] text-amber-700 leading-snug">{pair.notes}</p>
        </div>
      )}
    </div>
  );
}
