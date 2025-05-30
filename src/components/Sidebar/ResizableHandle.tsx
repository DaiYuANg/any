import type {MouseEventHandler} from "react";

export const ResizableHandle = ({ onMouseDown }: { onMouseDown: MouseEventHandler }) => (
  <div
    onMouseDown={onMouseDown}
    className="w-0.5 cursor-col-resize bg-border hover:bg-primary transition-colors"
  />
)
