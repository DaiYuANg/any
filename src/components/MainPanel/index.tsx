import {FlowView} from "@/components/Mindmap";
import {Editor} from "@/components/Editor";
import {Button} from "@/components/ui/button.tsx";
import {Brain, Pencil} from "lucide-react";
import {useEditorModeStore} from "@/store/ModeStore.ts";


const MainPanel = () => {
  const { mode, setMode } = useEditorModeStore()

  return <>
    <main className="flex-grow overflow-auto">
      {mode === "graph" ? <FlowView/> : <Editor/>}
      <div className="absolute top-4 right-4 flex gap-2 z-10 transition-all duration-200">
        <Button
          className="transition-all hover:scale-105 hover:opacity-90"
          variant={mode === "graph" ? "default" : "outline"}
          onClick={() => setMode("graph")}
        >
          <Brain className="mr-2 h-4 w-4"/>
          Graph
        </Button>
        <Button
          className="transition-all hover:scale-105 hover:opacity-90"
          variant={mode === "text" ? "default" : "outline"}
          onClick={() => setMode("text")}
        >
          <Pencil className="mr-2 h-4 w-4"/>
          Rich text
        </Button>
      </div>
    </main>
  </>
}

export {MainPanel}