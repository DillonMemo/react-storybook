import React from "react";
import { Editor } from "@tinymce/tinymce-react";

export type TinyEditorProps = {};

const TinyEditor: React.FC<TinyEditorProps> = ({}) => {
  const handleEditorChange = (e: any) => {
    console.log(e.target.getContent());
  };
  return (
    <div>
      <h2>Default</h2>
      <Editor
        apiKey="pvpw2z0ouubmjquu6398rg3vxyqch3rfrhuru6qsekuf49ne"
        initialValue="<p>This is the initial content of the editor</p>"
        init={{
          height: 300,
          menubar: false,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount"
          ],
          toolbar:
            "undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help"
        }}
        onChange={e => handleEditorChange(e)}
      />
      <h2>addons plugins + toolbar</h2>
      <Editor
        apiKey="pvpw2z0ouubmjquu6398rg3vxyqch3rfrhuru6qsekuf49ne"
        initialValue="<p>This is the initial content of the editor</p>"
        init={{
          height: 300,
          menubar: "insert edit",
          plugins: ["a11ychecker", "lists", "advlist", "image", "imagetools", "paste"],
          toolbar:
            "undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help a11ycheck | \
             image paste"
        }}
        onChange={e => handleEditorChange(e)}
      />
    </div>
  );
};

export default TinyEditor;
