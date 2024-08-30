import { useState, useEffect, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";

import {
  ClassicEditor,
  AccessibilityHelp,
  Autoformat,
  Autosave,
  BalloonToolbar,
  BlockQuote,
  Bold,
  Essentials,
  Heading,
  Indent,
  IndentBlock,
  Italic,
  List,
  ListProperties,
  Paragraph,
  SelectAll,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TextTransformation,
  TodoList,
  Underline,
  Undo,
  type EditorConfig,
} from "ckeditor5";

import { type Control, Controller, type FieldValues } from "react-hook-form";

import "ckeditor5/ckeditor5.css";

import "./ckEditor.css";

type CKEditorFormProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: FieldValues;
  name: string;
  defaultValue?: string;
  disabled?: boolean;
};

export default function CKEditorForm({
  name,
  control,
  defaultValue,
  disabled,
}: CKEditorFormProps) {
  const editorRef = useRef(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  useEffect(() => {
    setIsLayoutReady(true);

    return () => setIsLayoutReady(false);
  }, []);

  const editorConfig: EditorConfig = {
    toolbar: {
      items: [
        "undo",
        "redo",
        "|",
        "selectAll",
        "|",
        "heading",
        "|",
        "bold",
        "italic",
        "underline",
        "|",
        "insertTable",
        "blockQuote",
        "|",
        "bulletedList",
        "numberedList",
        "todoList",
        "outdent",
        "indent",
        "|",
        "accessibilityHelp",
      ],
      shouldNotGroupWhenFull: false,
    },
    plugins: [
      AccessibilityHelp,
      Autoformat,
      Autosave,
      BalloonToolbar,
      BlockQuote,
      Bold,
      Essentials,
      Heading,
      Indent,
      IndentBlock,
      Italic,
      List,
      ListProperties,
      Paragraph,
      SelectAll,
      Table,
      TableCaption,
      TableCellProperties,
      TableColumnResize,
      TableProperties,
      TableToolbar,
      TextTransformation,
      TodoList,
      Underline,
      Undo,
    ],
    balloonToolbar: ["bold", "italic", "|", "bulletedList", "numberedList"],
    heading: {
      options: [
        {
          model: "paragraph",
          title: "Paragraph",
          class: "ck-heading_paragraph",
        },
        {
          model: "heading1",
          view: "h2",
          title: "Heading 1",
          class: "ck-heading_heading1",
        },
        {
          model: "heading2",
          view: "h3",
          title: "Heading 2",
          class: "ck-heading_heading2",
        },
        {
          model: "heading3",
          view: "h4",
          title: "Heading 3",
          class: "ck-heading_heading3",
        },
        {
          model: "heading4",
          view: "h5",
          title: "Heading 4",
          class: "ck-heading_heading4",
        },
      ],
    },
    // initialData:
    //   "<h2>Congratulations on setting up CKEditor 5! 🎉</h2>\n<p>\n\tYou've successfully created a CKEditor 5 project. This powerful text editor\n\twill enhance your application, enabling rich text editing capabilities that\n\tare customizable and easy to use.\n</p>\n<h3>What's next?</h3>\n<ol>\n\t<li>\n\t\t<strong>Integrate into your app</strong>: time to bring the editing into\n\t\tyour application. Take the code you created and add to your application.\n\t</li>\n\t<li>\n\t\t<strong>Explore features:</strong> Experiment with different plugins and\n\t\ttoolbar options to discover what works best for your needs.\n\t</li>\n\t<li>\n\t\t<strong>Customize your editor:</strong> Tailor the editor's\n\t\tconfiguration to match your application's style and requirements. Or\n\t\teven write your plugin!\n\t</li>\n</ol>\n<p>\n\tKeep experimenting, and don't hesitate to push the boundaries of what you\n\tcan achieve with CKEditor 5. Your feedback is invaluable to us as we strive\n\tto improve and evolve. Happy editing!\n</p>\n<h3>Helpful resources</h3>\n<p>\n\t<i>An editor without the </i><code>Link</code>\n\t<i>plugin? That's brave! We hope the links below will be useful anyway </i\n\t>😉\n</p>\n<ul>\n\t<li>\n\t\t📝 Trial sign up: https://orders.ckeditor.com/trial/premium-features,\n\t</li>\n\t<li>\n\t\t📕 Documentation:\n\t\thttps://ckeditor.com/docs/ckeditor5/latest/installation/index.html,\n\t</li>\n\t<li>\n\t\t⭐️ GitHub (star us if you can!): https://github.com/ckeditor/ckeditor5,\n\t</li>\n\t<li>🏠 CKEditor Homepage: https://ckeditor.com,</li>\n\t<li>🧑‍💻 CKEditor 5 Demos: https://ckeditor.com/ckeditor-5/demo/</li>\n</ul>\n<h3>Need help?</h3>\n<p>\n\tSee this text, but the editor is not starting up? Check the browser's\n\tconsole for clues and guidance. It may be related to an incorrect license\n\tkey if you use premium features or another feature-related requirement. If\n\tyou cannot make it work, file a GitHub issue, and we will help as soon as\n\tpossible!\n</p>\n",
    list: {
      properties: {
        styles: true,
        startIndex: true,
        reversed: true,
      },
    },
    placeholder: "Type or paste your content here!",
    table: {
      contentToolbar: [
        "tableColumn",
        "tableRow",
        "mergeTableCells",
        "tableProperties",
        "tableCellProperties",
      ],
    },
  };

  return (
    <div ref={editorRef}>
      <Controller
        name={name}
        control={control as Control<FieldValues>}
        defaultValue={defaultValue}
        disabled={disabled}
        render={({ field }) => (
          <CKEditor
            editor={ClassicEditor}
            config={editorConfig}
            data={field.value}
            onReady={(editor) => {
              if (isLayoutReady) {
                editor.editing.view.change((writer) => {
                  writer.setStyle(
                    "height",
                    "100%",
                    editor.editing.view.document.getRoot()!
                  );
                });
              }
            }}
            onChange={(_event, editor) => {
              const data = editor.getData();
              field.onChange(data);
            }}
          />
        )}
      />
    </div>
  );
}
