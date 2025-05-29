import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"

export type TreeNodeData = {
  id: string
  label: string
  children?: TreeNodeData[]
}

export function TreeNode({ node, level = 0 }: { node: TreeNodeData; level?: number }) {
  const [expanded, setExpanded] = useState(false)
  const hasChildren = node.children && node.children.length > 0

  return (
    <div className="select-none">
      <div
        className={cn(
          "flex items-center cursor-pointer px-1 py-0.5 rounded hover:bg-accent",
          expanded && "font-medium"
        )}
        style={{ paddingLeft: `${level * 16}px` }}
        onClick={() => hasChildren && setExpanded(!expanded)}
      >
        {hasChildren ? (
          expanded ? <ChevronDown className="w-4 h-4 mr-1" /> : <ChevronRight className="w-4 h-4 mr-1" />
        ) : (
          <span className="w-4 h-4 mr-1" />
        )}
        <span>{node.label}</span>
      </div>


      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {node.children?.map((child) => (
              <TreeNode key={child.id} node={child} level={level + 1} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
