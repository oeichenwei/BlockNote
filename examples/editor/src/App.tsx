// import logo from './logo.svg'
import { EditorContent, useEditor } from "@blocknote/core";
import "@blocknote/core/style.css";
import { Editor } from "@tiptap/core";
import styles from "./App.module.css";
import { VscFolderOpened, VscSaveAs } from "react-icons/vsc";
import FileSaver from "file-saver";

type WindowWithProseMirror = Window &
  typeof globalThis & { ProseMirror: Editor };

function App() {
  const editor = useEditor({
    onUpdate: ({ editor }) => {
      //console.log(editor.getJSON());
      (window as WindowWithProseMirror).ProseMirror = editor; // Give tests a way to get editor instance
    },
    editorProps: {
      attributes: {
        class: styles.editor,
        "data-test": "editor",
      },
    },
  });

  function onSave() {
    var content = JSON.stringify(editor.getJSON());
    var blob = new Blob([content], {
      type: "text/json;charset=utf-8",
    });
    var tools = document.getElementById("title");
    var title = tools?.innerText;
    FileSaver.saveAs(blob, title + ".json");
  }

  function onOpen() {
    var test = {
      type: "doc",
      content: [
        {
          type: "blockgroup",
          content: [
            {
              type: "block",
              attrs: {
                id: "97eee85d-0cf7-4b22-bde5-7af827364d83",
                listType: "check",
                dataValue: false,
              },
              content: [
                {
                  type: "content",
                  attrs: {},
                  content: [{ type: "text", text: "what" }],
                },
              ],
            },
            {
              type: "block",
              attrs: {
                id: "a94dd096-744d-4fc0-beec-2faef00e6c03",
                listType: "check",
                dataValue: false,
              },
              content: [
                {
                  type: "content",
                  attrs: {},
                  content: [{ type: "text", text: "others" }],
                },
                {
                  type: "description",
                  attrs: {},
                  content: [{ type: "text", text: "sdfd" }],
                },
              ],
            },
            {
              type: "block",
              attrs: {
                id: "a3e10516-a3fe-49c8-8414-28d7c13c6162",
                dataValue: false,
              },
              content: [{ type: "content", attrs: {} }],
            },
          ],
        },
      ],
    };
    editor.commands.setContent(test);
  }

  return (
    <div>
      <div id="title">
        <div id="tools">
          <VscSaveAs size={24} className="tool-button" onClick={onSave} />
          <VscFolderOpened size={24} className="tool-button" onClick={onOpen} />
        </div>
        <div contentEditable="true" suppressContentEditableWarning={true}>
          title
        </div>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}

export default App;
