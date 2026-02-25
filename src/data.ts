import type { VideoPair } from "./types";

const defaultQA = { cameraPosition: false, lighting: false, oneChange: false, duration: false, resolution: false, naming: false };

export const initialPairs: VideoPair[] = [
  {
    id: "p1", pairNumber: 1, type: "Object Change",
    description: "Film table with mug → remove mug",
    fullInstructions: "Film a table with a mug → remove the mug, film again. Ensure the camera angle, lighting, and framing are identical between both shots. The ONLY difference should be the presence/absence of the mug.",
    assignedVA: null, stage: "needs_assignment", dueDate: "2026-03-01", driveLink: "https://drive.google.com/drive/folders/example1", notes: "", videoAUploaded: false, videoBUploaded: false, qaChecklist: { ...defaultQA },
  },
  {
    id: "p2", pairNumber: 2, type: "Object Change",
    description: "Film desk with laptop → replace with book",
    fullInstructions: "Film a desk with a laptop → replace with a book, film again. Keep camera position, lighting, and background completely unchanged.",
    assignedVA: null, stage: "needs_assignment", dueDate: "2026-03-01", driveLink: "https://drive.google.com/drive/folders/example2", notes: "", videoAUploaded: false, videoBUploaded: false, qaChecklist: { ...defaultQA },
  },
  {
    id: "p3", pairNumber: 3, type: "Object Change",
    description: "Film shelf with plant → remove plant",
    fullInstructions: "Film a shelf with a plant → remove the plant, film again. Maintain identical framing and lighting.",
    assignedVA: null, stage: "needs_assignment", dueDate: "2026-02-28", driveLink: "https://drive.google.com/drive/folders/example3", notes: "", videoAUploaded: false, videoBUploaded: false, qaChecklist: { ...defaultQA },
  },
  {
    id: "p4", pairNumber: 4, type: "Object Change",
    description: "Film chair with jacket → remove jacket",
    fullInstructions: "Film a chair with a jacket on it → remove the jacket, film again. Everything except the jacket must remain identical.",
    assignedVA: null, stage: "needs_assignment", dueDate: "2026-02-27", driveLink: "https://drive.google.com/drive/folders/example4", notes: "", videoAUploaded: false, videoBUploaded: false, qaChecklist: { ...defaultQA },
  },
  {
    id: "p5", pairNumber: 5, type: "Action Change",
    description: "Walking across room → walking with bag",
    fullInstructions: "Film someone walking across a room → film them walking while carrying a bag. Same path, same speed, same camera angle.",
    assignedVA: null, stage: "needs_assignment", dueDate: "2026-02-27", driveLink: "https://drive.google.com/drive/folders/example5", notes: "", videoAUploaded: false, videoBUploaded: false, qaChecklist: { ...defaultQA },
  },
  {
    id: "p6", pairNumber: 6, type: "Action Change",
    description: "Sitting and reading → scrolling phone",
    fullInstructions: "Film someone sitting and reading → film them sitting and scrolling their phone. Same seat, same angle, same lighting.",
    assignedVA: null, stage: "needs_assignment", dueDate: "2026-03-05", driveLink: "https://drive.google.com/drive/folders/example6", notes: "", videoAUploaded: false, videoBUploaded: false, qaChecklist: { ...defaultQA },
  },
  {
    id: "p7", pairNumber: 7, type: "Action Change",
    description: "Pouring water → pouring juice",
    fullInstructions: "Film someone pouring water → film them pouring juice. Same glass, same angle, same hand motion.",
    assignedVA: null, stage: "needs_assignment", dueDate: "2026-03-05", driveLink: "https://drive.google.com/drive/folders/example7", notes: "", videoAUploaded: false, videoBUploaded: false, qaChecklist: { ...defaultQA },
  },
  {
    id: "p8", pairNumber: 8, type: "Speech Change",
    description: "'It's a beautiful day' → 'it's a rainy day'",
    fullInstructions: "Film someone saying 'it's a beautiful day' → film them saying 'it's a rainy day'. Same person, same position, same background.",
    assignedVA: null, stage: "needs_assignment", dueDate: "2026-02-28", driveLink: "https://drive.google.com/drive/folders/example8", notes: "", videoAUploaded: false, videoBUploaded: false, qaChecklist: { ...defaultQA },
  },
  {
    id: "p9", pairNumber: 9, type: "Speech Change",
    description: "'Going to the store' → 'going to the park'",
    fullInstructions: "Film someone saying 'I'm going to the store' → film them saying 'I'm going to the park'. Identical setup.",
    assignedVA: null, stage: "needs_assignment", dueDate: "2026-03-07", driveLink: "https://drive.google.com/drive/folders/example9", notes: "", videoAUploaded: false, videoBUploaded: false, qaChecklist: { ...defaultQA },
  },
  {
    id: "p10", pairNumber: 10, type: "Speech Change",
    description: "'Hello, how are you' → 'hello, nice to meet you'",
    fullInstructions: "Film someone saying 'hello, how are you' → film them saying 'hello, nice to meet you'. Same framing, same person.",
    assignedVA: null, stage: "needs_assignment", dueDate: "2026-03-03", driveLink: "https://drive.google.com/drive/folders/example10", notes: "", videoAUploaded: false, videoBUploaded: false, qaChecklist: { ...defaultQA },
  },
  {
    id: "p11", pairNumber: 11, type: "Action Change",
    description: "Waving → giving thumbs up",
    fullInstructions: "Film someone waving → film them giving a thumbs up. Same person, same position, same background.",
    assignedVA: null, stage: "needs_assignment", dueDate: "2026-02-26", driveLink: "https://drive.google.com/drive/folders/example11", notes: "", videoAUploaded: false, videoBUploaded: false, qaChecklist: { ...defaultQA },
  },
  {
    id: "p12", pairNumber: 12, type: "Audio Change",
    description: "Ambient sound → same scene with music",
    fullInstructions: "Film a scene with just ambient sound → film the exact same scene but play music in the background. Camera must not move at all between takes.",
    assignedVA: null, stage: "needs_assignment", dueDate: "2026-03-07", driveLink: "https://drive.google.com/drive/folders/example12", notes: "", videoAUploaded: false, videoBUploaded: false, qaChecklist: { ...defaultQA },
  },
];
