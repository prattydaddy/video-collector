import { useState, useMemo, useEffect } from "react";
import { DndContext, DragOverlay, closestCenter, type DragStartEvent, type DragEndEvent, type DragOverEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import FilterBar from "./components/FilterBar";
import KanbanColumn from "./components/KanbanColumn";
import PairCard from "./components/PairCard";
import DetailModal from "./components/DetailModal";
import { initialPairs } from "./data";
import type { VideoPair, Stage } from "./types";
import { STAGES } from "./types";

const STORAGE_KEY = "video-collector-pairs";
const STORE_VERSION = 4;

function loadPairs(): VideoPair[] {
  const version = localStorage.getItem("store-version");
  if (version !== String(STORE_VERSION)) {
    localStorage.clear();
    localStorage.setItem("store-version", String(STORE_VERSION));
    return initialPairs;
  }
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return initialPairs;
}

export default function App() {
  const [pairs, setPairs] = useState<VideoPair[]>(loadPairs);
  const [typeFilter, setTypeFilter] = useState("All");
  const [vaFilter, setVAFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedPair, setSelectedPair] = useState<VideoPair | null>(null);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pairs));
  }, [pairs]);

  const filtered = useMemo(() => {
    return pairs.filter((p) => {
      if (typeFilter !== "All" && p.type !== typeFilter) return false;
      if (vaFilter !== "All" && p.assignedVA !== vaFilter) return false;
      if (search && !p.description.toLowerCase().includes(search.toLowerCase()) && !`pair ${p.pairNumber}`.includes(search.toLowerCase())) return false;
      return true;
    });
  }, [pairs, typeFilter, vaFilter, search]);

  const completeCount = useMemo(() => pairs.filter((p) => p.stage === "complete").length, [pairs]);

  const grouped = useMemo(() => {
    const map: Record<Stage, VideoPair[]> = { needs_assignment: [], in_progress: [], internal_review: [], complete: [] };
    filtered.forEach((p) => map[p.stage].push(p));
    return map;
  }, [filtered]);

  const activeCandidate = activeId ? pairs.find((p) => p.id === activeId) : null;

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;
    const overId = over.id as string;
    const activePair = pairs.find((p) => p.id === active.id);
    if (!activePair) return;

    let targetStage: Stage | null = null;
    if (STAGES.some((s) => s.key === overId)) {
      targetStage = overId as Stage;
    } else {
      const overPair = pairs.find((p) => p.id === overId);
      if (overPair) targetStage = overPair.stage;
    }

    if (targetStage && activePair.stage !== targetStage) {
      setPairs((prev) => prev.map((p) => (p.id === active.id ? { ...p, stage: targetStage } : p)));
    }
  }

  function handleDragEnd(_event: DragEndEvent) {
    setActiveId(null);
  }

  function handleUpdatePair(updated: VideoPair) {
    setPairs((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    setSelectedPair(updated);
  }

  return (
    <div className="h-screen flex bg-white">
      {/* Sidebar */}
      <aside className="w-[220px] bg-white border-r border-gray-200 flex flex-col shrink-0">
        <div className="px-4 py-5 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="23 7 16 12 23 17 23 7" />
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
            </svg>
          </div>
          <span className="text-[15px] font-semibold text-gray-900 tracking-tight">Video Pairing</span>
        </div>
        <nav className="px-2 mt-1">
          <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg bg-gray-100 text-gray-900 text-[13px] font-medium">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h4v10H3zM10 3h4v17h-4zM17 7h4v13h-4z" />
            </svg>
            Video Pairs
          </button>
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden bg-[#f8f9fa]">
        {/* Top search bar */}
        <div className="bg-white border-b border-gray-200 px-6 py-2.5">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search for anything..."
              className="w-full pl-10 pr-4 py-2 text-[13px] bg-gray-50 border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300"
            />
          </div>
        </div>

        {/* Page header */}
        <div className="px-6 pt-6 pb-0">
          <h1 className="text-3xl font-bold text-gray-900">Video Pairing</h1>
          <p className="text-sm text-gray-400 mt-1">
            · {pairs.length} pairs · {pairs.length * 2} videos · {completeCount} complete
          </p>
        </div>

        {/* View tabs */}
        <div className="px-6 pt-4 pb-0 flex items-center gap-4 border-b border-gray-200">
          <button className="text-[13px] font-medium text-blue-600 pb-2.5 border-b-2 border-blue-600">All</button>
          <button className="text-[13px] font-medium text-gray-400 pb-2.5 border-b-2 border-transparent hover:text-gray-600">+ Save as new view</button>
        </div>

        {/* Filters */}
        <FilterBar
          typeFilter={typeFilter}
          vaFilter={vaFilter}
          search={search}
          onTypeChange={setTypeFilter}
          onVAChange={setVAFilter}
          onSearchChange={setSearch}
        />

        {/* Kanban */}
        <div className="flex-1 overflow-x-auto px-6 pt-4 pb-6">
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
            <div className="flex gap-4 h-full">
              {STAGES.map((s) => (
                <KanbanColumn key={s.key} stage={s.key} pairs={grouped[s.key]} onCardClick={setSelectedPair} />
              ))}
            </div>
            <DragOverlay>
              {activeCandidate ? <PairCard pair={activeCandidate} onClick={() => {}} /> : null}
            </DragOverlay>
          </DndContext>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedPair && (
        <DetailModal
          pair={selectedPair}
          onClose={() => setSelectedPair(null)}
          onUpdate={handleUpdatePair}
        />
      )}
    </div>
  );
}
