import type { VideoPair } from "./types";

const defaultQA = { cameraPosition: false, lighting: false, oneChange: false, duration: false, resolution: false, stableCamera: false, noOutfitChange: false, noFilters: false, naming: false };

export const initialPairs: VideoPair[] = [
  // === OBJECT CHANGE (1-27) ===
  {
    id: "p1", pairNumber: 1, type: "Object Change",
    description: "Film a kitchen counter with a mug → remove the mug, film again",
    fullInstructions: "Film a kitchen counter with a mug → remove the mug, film again. Ensure the camera angle, lighting, and framing are identical between both shots. The ONLY difference should be the presence/absence of the mug.",
    assignedVA: null, stage: "needs_assignment", dueDate: "2026-03-07", driveLink: "", notes: "", videoAUploaded: false, videoBUploaded: false, qaChecklist: { ...defaultQA },
  },
  {
    id: "p2", pairNumber: 2, type: "Object Change",
    description: "Film a table with a plate of food → remove the plate, film again",
    fullInstructions: "Film a table with a plate of food → remove the plate, film again. Keep camera position, lighting, and background completely unchanged.",
    assignedVA: null, stage: "needs_assignment", dueDate: "2026-03-07", driveLink: "", notes: "", videoAUploaded: false, videoBUploaded: false, qaChecklist: { ...defaultQA },
  },
  {
    id: "p3", pairNumber: 3, type: "Object Change",
    description: "Film a counter with a water bottle → replace with a glass, film again",
    fullInstructions: "Film a counter with a water bottle → replace with a glass, film again. Maintain identical framing and lighting.",
    assignedVA: null, stage: "needs_assignment", dueDate: "2026-03-07", driveLink: "", notes: "", videoAUploaded: false, videoBUploaded: false, qaChecklist: { ...defaultQA },
  },
  {
    id: "p4", pairNumber: 4, type: "Object Change",
    description: "Film a table with a bowl → remove the bowl, film again",
    fullInstructions: "Film a table with a bowl → remove the bowl, film again. Everything except the bowl must remain identical.",
    assignedVA: null, stage: "needs_assignment", dueDate: "2026-03-07", driveLink: "", notes: "", videoAUploaded: false, videoBUploaded: false, qaChecklist: { ...defaultQA },
  },
  {
    id: "p5", pairNumber: 5, type: "Object Change",
    description: "Film a kitchen shelf with a jar → remove the jar, film again",
    fullInstructions: "Film a kitchen shelf with a jar → remove the jar, film again. Keep camera position and lighting identical.",
    assignedVA: null, stage: "needs_assignment", dueDate: "2026-03-07", driveLink: "", notes: "", videoAUploaded: false, videoBUploaded: false, qaChecklist: { ...defaultQA },
  },
  {
    id: "p6", pairNumber: 6, type: "Object Change",
    description: "Film a couch with a pillow → remove the pillow, film again",
    fullInstructions: "Film a couch with a pillow → remove the pillow, film again. Same framing, same lighting.",
    assignedVA: null, stage: "needs_assignment", dueDate: "2026-03-07", driveLink: "", notes: "", videoAUploaded: false, videoBUploaded: false, qaChecklist: { ...defaultQA },
  },
  {
    id: "p7", pairNumber: 7, type: "Object Change",
    description: "Film a chair with a blanket → remove the blanket, film again",
    fullInstructions: "Film a chair with a blanket draped on it → remove the blanket, film again. Keep everything else identical.",
    assignedVA: null, stage: "needs_assignment", dueDate: "2026-03-07", driveLink: "", notes: "", videoAUploaded: false, videoBUploaded: false, qaChecklist: { ...defaultQA },
  },
  {
    id: "p8", pairNumber: 8, type: "Object Change",
    description: "Film a coffee table with a remote → remove the remote, film again",
    fullInstructions: "Film a coffee table with a TV remote → remove the remote, film again. Same angle, same lighting.",
    assignedVA: null, stage: "needs_assignment", dueDate: "2026-03-07", driveLink: "", notes: "", videoAUploaded: false, videoBUploaded: false, qaChecklist: { ...defaultQA },
  },
  {
    id: "p9", pairNumber: 9, type: "Object Change",
    description: "Film a shelf with a photo frame → remove the frame, film again",
    fullInstructions: "Film a shelf with a photo frame → remove the frame, film again. Maintain identical framing and lighting.",
    assignedVA: null, stage: "needs_assignment", dueDate: "2026-03-07", driveLink: "", notes: "", videoAUploaded: false, videoBUploaded: false, qaChecklist: { ...defaultQA },
  },
  {
    id: "p10", pairNumber: 10, type: "Object Change",
    description: "Film a table with a vase → remove the vase, film again",
    fullInstructions: "Film a table with a vase → remove the vase, film again. Keep camera and lighting unchanged.",
    assignedVA: null, stage: "needs_assignment", dueDate: "2026-03-07", driveLink: "", notes: "", videoAUploaded: false, videoBUploaded: false, qaChecklist: { ...defaultQA },
  },
  {
    id: "p11", pairNumber: 11, type: "Object Change",
    description: "Film an empty table → add a book, film again",
    fullInstructions: "Film an empty table → add a book to it, film again. Same framing and lighting between both shots.",
    assignedVA: null, stage: "needs_assignment", dueDate: "2026-03-07", driveLink: "", notes: "", videoAUploaded: false, videoBUploaded: false, qaChecklist: { ...defaultQA },
  },
  {
    id: "p12", pairNumber: 12, type: "Object Change",
    description: "Film a couch with a bag on it → remove the bag, film again",
    fullInstructions: "Film a couch with a bag on it → remove the bag, film again. Everything except the bag must remain identical.",
    assignedVA: null, stage: "needs_assignment", dueDate: "2026-03-07", driveLink: "", notes: "", videoAUploaded: false, videoBUploaded: false, qaChecklist: { ...defaultQA },
  },
  {
    id: "p13", pairNumber: 13, type: "Object Change",
    description: "Film a desk with a laptop → replace with a book, film again",
    fullInstructions: "Film a desk with a laptop → replace with a book, film again. Keep camera position, lighting, and background completely unchanged.",
    assignedVA: null, stage: "needs_assignment", dueDate: "2026-03-07", driveLink: "", notes: "", videoAUploaded: false, videoBUploaded: false, qaChecklist: { ...defaultQA },
  },
  {
    id: "p14", pairNumber: 14, type: "Object Change",
    description: "Film a desk with headphones → remove the headphones, film again",
    fullInstructions: "Film a desk with headphones → remove the headphones, film again. Same framing, same lighting.",
    assignedVA: null, stage: "needs_assignment", dueDate: "2026-03-07", driveLink: "", notes: "", videoAUploaded: false, videoBUploaded: false, qaChecklist: { ...defaultQA },
  },
  {
    id: "p15", pairNumber: 15, type: "Object Change",
    description: "Film a desk with a phone → remove the phone, film again",
    fullInstructions: "Film a desk with a phone → remove the phone, film again. Keep everything else identical.",
    assignedVA: null, stage: "needs_assignment", dueDate: "2026-03-07", driveLink: "", notes: "", videoAUploaded: false, videoBUploaded: false, qaChecklist: { ...defaultQA },
  },
  {
    id: "p16", pairNumber: 16, type: "Object Change",
    description: "Film a desk with a pen → remove the pen, film again",
    fullInstructions: "Film a desk with a pen → remove the pen, film again. Same angle, same lighting.",
    assignedVA: null, stage: "needs_assignment", dueDate: "2026-03-07", driveLink: "", notes: "", videoAUploaded: false, videoBUploaded: false, qaChecklist: { ...defaultQA },
  },
  {
    id: "p17", pairNumber: 17, type: "Object Change",
    description: "Film a chair with a backpack → remove the backpack, film again",
    fullInstructions: "Film a chair with a backpack → remove the backpack, film again. Maintain identical framing and lighting.",
    assignedVA: null, stage: "needs_assignment", dueDate: "2026-03-07", driveLink: "", notes: "", videoAUploaded: false, videoBUploaded: false, qaChecklist: { ...defaultQA },
  },
  {
    id: "p18", pairNumber: 18, type: "Object Change",
    description: "Film a bed with an extra pillow → remove the pillow, film again",
    fullInstructions: "Film a bed with an extra pillow → remove the pillow, film again. Same framing, same lighting.",
    assignedVA: null, stage: "needs_assignment", dueDate: "2026-03-07", driveLink: "", notes: "", videoAUploaded: false, videoBUploaded: false, qaChecklist: { ...defaultQA },
  },
  {
    id: "p19", pairNumber: 19, type: "Object Change",
    description: "Film a nightstand with a lamp → remove the lamp, film again",
    fullInstructions: "Film a nightstand with a lamp → remove the lamp, film again. Keep camera and lighting unchanged.",
    assignedVA: null, stage: "needs_assignment", dueDate: "2026-03-07", driveLink: "", notes: "", videoAUploaded: false, videoBUploaded: false, qaChecklist: { ...defaultQA },
  },
  {
    id: "p20", pairNumber: 20, type: "Object Change",
    description: "Film a door with a towel hanging → remove the towel, film again",
    fullInstructions: "Film a door with a towel hanging on it → remove the towel, film again. Same angle, same lighting.",
    assignedVA: null, stage: "needs_assignment", dueDate: "2026-03-07", driveLink: "", notes: "", videoAUploaded: false, videoBUploaded: false, qaChecklist: { ...defaultQA },
  },
  {
    id: "p21", pairNumber: 21, type: "Object Change",
    description: "Film a bathroom counter with soap → remove the soap, film again",
    fullInstructions: "Film a bathroom counter with soap → remove the soap, film again. Everything except the soap must remain identical.",
    assignedVA: null, stage: "needs_assignment", dueDate: "2026-03-07", driveLink: "", notes: "", videoAUploaded: false, videoBUploaded: false, qaChecklist: { ...defaultQA },
  },
  {
    id: "p22", pairNumber: 22, type: "Object Change",
    description: "Film a bed with a folded shirt → remove the shirt, film again",
    fullInstructions: "Film a bed with a folded shirt → remove the shirt, film again. Maintain identical framing and lighting.",
    assignedVA: null, stage: "needs_assignment", dueDate: "2026-03-07", driveLink: "", notes: "", videoAUploaded: false, videoBUploaded: false, qaChecklist: { ...defaultQA },
  },
  {
    id: "p23", pairNumber: 23, type: "Object Change",
    description: "Film a table with sunglasses → remove the sunglasses, film again",
    fullInstructions: "Film a table with sunglasses → remove the sunglasses, film again. Same framing, same lighting.",
    assignedVA: null, stage: "needs_assignment", dueDate: "2026-03-07", driveLink: "", notes: "", videoAUploaded: false, videoBUploaded: false, qaChecklist: { ...defaultQA },
  },
  {
    id: "p24", pairNumber: 24, type: "Object Change",
    description: "Film a wall with a hat on a hook → remove the hat, film again",
    fullInstructions: "Film a wall with a hat on a hook → remove the hat, film again. Keep camera and lighting unchanged.",
    assignedVA: null, stage: "needs_assignment", dueDate: "2026-03-07", driveLink: "", notes: "", videoAUploaded: false, videoBUploaded: false, qaChecklist: { ...defaultQA },
  },
  {
    id: "p25", pairNumber: 25, type: "Object Change",
    description: "Film a doorway with shoes → remove the shoes, film again",
    fullInstructions: "Film a doorway with shoes → remove the shoes, film again. Same angle, same lighting.",
    assignedVA: null, stage: "needs_assignment", dueDate: "2026-03-07", driveLink: "", notes: "", videoAUploaded: false, videoBUploaded: false, qaChecklist: { ...defaultQA },
  },
  {
    id: "p26", pairNumber: 26, type: "Object Change",
    description: "Film a bench with a water bottle → remove the bottle, film again",
    fullInstructions: "Film a bench with a water bottle → remove the bottle, film again. Everything except the bottle must remain identical.",
    assignedVA: null, stage: "needs_assignment", dueDate: "2026-03-07", driveLink: "", notes: "", videoAUploaded: false, videoBUploaded: false, qaChecklist: { ...defaultQA },
  },
  {
    id: "p27", pairNumber: 27, type: "Object Change",
    description: "Film a table with keys → remove the keys, film again",
    fullInstructions: "Film a table with keys → remove the keys, film again. Maintain identical framing and lighting.",
    assignedVA: null, stage: "needs_assignment", dueDate: "2026-03-07", driveLink: "", notes: "", videoAUploaded: false, videoBUploaded: false, qaChecklist: { ...defaultQA },
  },
];
