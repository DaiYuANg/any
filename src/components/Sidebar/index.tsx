// components/Layout/Sidebar/Sidebar.tsx
import { Button } from '@/components/ui/button'
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

export const Sidebar = ({ isMobile, onClose }: { isMobile: boolean; onClose: () => void }) => (
  <aside
    className={`bg-muted p-4 overflow-y-auto z-10 ${
      isMobile ? 'fixed top-0 left-0 h-full w-64 shadow-lg border-r' : 'relative border-r'
    }`}
  >
    {isMobile && (
      <Button variant="ghost" size="sm" className="mb-4" onClick={onClose}>
        关闭菜单
      </Button>
    )}
    <div className="space-y-1">
      {treeData.map((node) => (
        <TreeNode key={node.id} node={node} />
      ))}
    </div>
  </aside>
)
