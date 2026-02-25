import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import type { VideoPair, Stage } from "../types";
import { STAGES } from "../types";
import PairCard from "./PairCard";

interface Props {
  stage: Stage;
  pairs: VideoPair[];
  onCardClick: (pair: VideoPair) => void;
}

export default function KanbanColumn({ stage, pairs, onCardClick }: Props) {
  const stageInfo = STAGES.find((s) => s.key === stage)!;
  const { setNodeRef } = useDroppable({ id: stage });

  return (
    <div className="flex flex-col min-w-[290px] w-[290px] flex-shrink-0">
      <div className="flex items-center gap-2 px-2 pb-3">
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: stageInfo.color }} />
        <span className="text-[12px] font-semibold text-gray-700 uppercase tracking-wider">{stageInfo.label}</span>
        <span className="text-[11px] text-gray-400 font-medium">{pairs.length}</span>
      </div>
      <div ref={setNodeRef} className="flex flex-col gap-2 flex-1 min-h-[200px] pb-4">
        <SortableContext items={pairs.map((p) => p.id)} strategy={verticalListSortingStrategy}>
          {pairs.map((p) => (
            <PairCard key={p.id} pair={p} onClick={() => onCardClick(p)} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}
