import {create} from "zustand/react";

export type EditorMode = 'graph' | 'text' | 'preview'
interface EditorModeState {
  mode: EditorMode
  setMode: (mode: EditorMode) => void
}

export const useEditorModeStore = create<EditorModeState>((set) => ({
  mode: 'graph',
  setMode: (mode) => set({ mode }),
}))