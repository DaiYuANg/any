import "./App.css";
import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {Menu} from "lucide-react";
import {useResizableSidebar} from "@/hook";
import {MainPanel} from "@/components/MainPanel";
import {GlobalCommand} from "@/components/command";
import {useHotkeys} from "react-hotkeys-hook";
import {useCommandPaletteStore} from "@/store/CommandPaletteStore.ts";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const {width: sidebarWidth, handleMouseDown} = useResizableSidebar({
    disabled: isMobile,
  });
  const {setOpen} = useCommandPaletteStore()
  useHotkeys("mod+k", () => setOpen(true));

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <main className="flex h-screen w-screen overflow-hidden">
      {/* ☰ 小屏打开按钮 */}
      {isMobile && !isSidebarOpen && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 z-20"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Menu/>
        </Button>
      )}
      {/* Sidebar：大屏固定，小屏浮动 */}
      {(isSidebarOpen || !isMobile) && (
        <aside
          className={`bg-muted p-4 overflow-y-auto z-10 ${
            isMobile
              ? "fixed top-0 left-0 h-full w-64 shadow-lg border-r"
              : "relative border-r"
          }`}
          style={{width: isMobile ? undefined : `${sidebarWidth}px`}}
        >
          {/* 小屏关闭按钮 */}
          {isMobile && (
            <Button
              variant="ghost"
              size="sm"
              className="mb-4"
              onClick={() => setIsSidebarOpen(false)}
            >
              关闭菜单
            </Button>
          )}
          <div className="space-y-1">
            {/*{treeData.map((node) => (*/}
            {/*  <TreeNode key={node.id} node={node}/>*/}
            {/*))}*/}
          </div>
        </aside>
      )}

      {/* 拖拽条 */}
      {!isMobile && (
        <div
          onMouseDown={handleMouseDown}
          className="w-0.5 cursor-col-resize bg-border hover:bg-primary transition-colors"
        />
      )}

      <MainPanel/>

      <GlobalCommand/>
    </main>
  );
};

export default App;
