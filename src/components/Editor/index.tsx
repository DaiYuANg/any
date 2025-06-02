import {type InitialConfigType, LexicalComposer} from "@lexical/react/LexicalComposer";
import {HistoryPlugin} from "@lexical/react/LexicalHistoryPlugin";
import {RichTextPlugin} from "@lexical/react/LexicalRichTextPlugin";
import {ContentEditable} from "@lexical/react/LexicalContentEditable";
import {LexicalErrorBoundary} from "@lexical/react/LexicalErrorBoundary";
import {AutoFocusPlugin} from "@lexical/react/LexicalAutoFocusPlugin";
import {ListPlugin} from "@lexical/react/LexicalListPlugin";
import {MarkdownShortcutPlugin} from "@lexical/react/LexicalMarkdownShortcutPlugin";
import {ListItemNode, ListNode} from "@lexical/list";
import {HorizontalRuleNode} from "@lexical/react/LexicalHorizontalRuleNode";
import {HeadingNode, QuoteNode} from "@lexical/rich-text";
import {CodeHighlightNode, CodeNode} from "@lexical/code";
import {AutoLinkNode, LinkNode} from "@lexical/link";
import {TRANSFORMERS} from "@lexical/markdown";
import {TableCellNode, TableNode, TableRowNode} from "@lexical/table";
import {LinkPlugin} from "@lexical/react/LexicalLinkPlugin";
import './editor.css'
import {theme} from "@/components/Editor/theme.ts";
import {ActionsPlugin, CodeHighlightPlugin} from "@/components/Editor/plugin";
import TreeViewPlugin from "@/components/Editor/plugin/TreeViewPlugin.tsx";
import {Placeholder} from "@/components/Editor/placeholder.tsx";
import {ListenerPlugin} from "@/components/Editor/plugin/Listener.ts";
import type {EditorState} from "lexical";

const editorConfig: InitialConfigType = {
  namespace: "MyMarkdownEditor",
  theme: theme,
  onError(error: Error) {
    console.error(error);
  },
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode,
    HorizontalRuleNode
  ]
};

const Editor = () => {
  const handleEditorChange =
    (state: EditorState) => {
      console.log(state)
      console.log(JSON.stringify(state));
      localStorage.setItem("content", JSON.stringify(state));
    };
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container">
        {/*<ToolbarPlugin />*/}
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input"/>}
            placeholder={<Placeholder/>} ErrorBoundary={LexicalErrorBoundary}
          />
          <AutoFocusPlugin/>
          <HistoryPlugin/>
          <ListPlugin/>
          <LinkPlugin/>
          <MarkdownShortcutPlugin transformers={TRANSFORMERS}/>
          <CodeHighlightPlugin/>
          <ListenerPlugin onChange={handleEditorChange}/>
        </div>
        <ActionsPlugin/>
        <TreeViewPlugin/>
      </div>
    </LexicalComposer>
  );
};

export {Editor}