import "./App.css";
import {useEffect, useRef, useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {Menu} from "lucide-react";
import {TreeNode, type TreeNodeData} from "@/components/TreeNode";

const treeData: TreeNodeData[] = [
  {
    id: "project-a",
    label: "项目 A",
    children: [
      {id: "a1", label: "节点 A1"},
      {id: "a2", label: "节点 A2"},
    ],
  },
  {
    id: "project-b",
    label: "项目 B",
    children: [
      {id: "b1", label: "节点 B1"},
      {id: "b2", label: "节点 B2"},
    ],
  },
]

function App() {
  const [sidebarWidth, setSidebarWidth] = useState(240)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const isResizing = useRef(false)

  const MIN_WIDTH = 160
  const MAX_WIDTH = 480

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMobile) return
    isResizing.current = true
    const startX = e.clientX
    const startWidth = sidebarWidth

    const onMouseMove = (moveEvent: MouseEvent) => {
      if (!isResizing.current) return
      const delta = moveEvent.clientX - startX
      const newWidth = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, startWidth + delta))
      setSidebarWidth(newWidth)
    }

    const onMouseUp = () => {
      isResizing.current = false
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mouseup", onMouseUp)
    }

    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mouseup", onMouseUp)
  }


  return (
    <main className="container flex h-screen w-screen overflow-hidden">
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
            {treeData.map((node) => (
              <TreeNode key={node.id} node={node}/>
            ))}
          </div>
        </aside>
      )}

      {/* 拖拽条 */}
      {!isMobile && (
        <div
          onMouseDown={handleMouseDown}
          className="w-1 cursor-col-resize bg-border hover:bg-primary transition-colors"
        />
      )}

      {/* MainPanel */}
      <main className="flex-grow overflow-auto p-4">
        <h1 className="text-2xl font-bold mb-4">content</h1>
      </main>
    </main>
  );
}

export default App;
