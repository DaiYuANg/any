import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {useEffect} from "react";
import type {EditorState} from "lexical";

type Props = {
  onChange: (state: EditorState) => void;
};

export function ListenerPlugin({onChange}: Props) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerUpdateListener(({editorState}) => {
      editorState.read(() => {
        onChange(editorState);
      });
    });
  }, [editor]);

  return null;
}
