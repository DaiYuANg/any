import {CommandDialog, CommandInput, CommandItem, CommandList} from "@/components/ui/command.tsx";
import {Brain, Pencil} from "lucide-react";
import {useEditorModeStore} from "@/store/ModeStore.ts";
import {useCommandPaletteStore} from "@/store/CommandPaletteStore.ts";

const GlobalCommand = () => {
  const {setMode} = useEditorModeStore()
  const {open, setOpen} = useCommandPaletteStore()
  return <>
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="切换编辑模式…"/>
      <CommandList>
        <CommandItem
          onSelect={() => {
            setMode("graph");
            setOpen(false);
          }}
        >
          <Brain className="mr-2 h-4 w-4"/>
          🧠 图形模式
        </CommandItem>
        <CommandItem
          onSelect={() => {
            setMode("text");
            setOpen(false);
          }}
        >
          <Pencil className="mr-2 h-4 w-4"/>
          ✍️ 文本模式
        </CommandItem>
      </CommandList>
    </CommandDialog>
  </>
}

export {GlobalCommand}