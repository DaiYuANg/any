import {Handle, type NodeProps, Position} from "@xyflow/react";
import {useEffect, useState} from "react";
import {Editor} from "@/components/Editor";

export const EditableNode = ({data, selected}: NodeProps) => {
  const [content, setContent] = useState<string>(data.label as string || "");

  useEffect(() => {
    // data.onContentChange?.(id, content);
  }, [content]);

  return (
    <div className={`rounded border shadow p-2 bg-white min-w-[200px] ${selected ? "border-blue-500" : ""}`}>
      <Handle type="target" position={Position.Top}/>
      <Editor
        initialValue={content}
        onChange={(newValue) => setContent(newValue)}
      />
      <Handle type="source" position={Position.Bottom}/>
    </div>
  );
};