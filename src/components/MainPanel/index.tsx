import {FlowView} from "@/components/Mindmap";
import {useState} from "react";
import {Editor} from "@/components/Editor";
import {Button} from "@/components/ui/button.tsx";
import {Brain, Pencil} from "lucide-react";
import {useHotkeys} from "react-hotkeys-hook";
import {CommandDialog, CommandInput, CommandItem, CommandList} from "@/components/ui/command.tsx";


type EditorMode = "text" | "graph";
const MainPanel = () => {
  const [mode, setMode] = useState<EditorMode>("graph");
  const [commandOpen, setCommandOpen] = useState(false);
  useHotkeys("mod+k", () => setCommandOpen(true));
  return <>
    {/* MainPanel */}
    <main className="flex-grow overflow-auto">
      {mode === "graph" ? <FlowView/> : <Editor initialValue={"text"}/>}
      {/* 浮动切换按钮栏 */}
      <div className="absolute bottom-4 right-4 flex gap-2 z-10 transition-all duration-200">
        <Button
          className="transition-all hover:scale-105 hover:opacity-90"
          variant={mode === "graph" ? "default" : "outline"}
          onClick={() => setMode("graph")}
        >
          <Brain className="mr-2 h-4 w-4"/>
          图形
        </Button>
        <Button
          className="transition-all hover:scale-105 hover:opacity-90"
          variant={mode === "text" ? "default" : "outline"}
          onClick={() => setMode("text")}
        >
          <Pencil className="mr-2 h-4 w-4"/>
          文本
        </Button>
      </div>

      <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
        <CommandInput placeholder="切换编辑模式…"/>
        <CommandList>
          <CommandItem
            onSelect={() => {
              setMode("graph");
              setCommandOpen(false);
            }}
          >
            <Brain className="mr-2 h-4 w-4"/>
            🧠 图形模式
          </CommandItem>
          <CommandItem
            onSelect={() => {
              setMode("text");
              setCommandOpen(false);
            }}
          >
            <Pencil className="mr-2 h-4 w-4"/>
            ✍️ 文本模式
          </CommandItem>
        </CommandList>
      </CommandDialog>
    </main>
  </>
}

export {MainPanel}