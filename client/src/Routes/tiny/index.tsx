import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

export type TinyEditorProps = {};

const TinyEditor: React.FC<TinyEditorProps> = ({}) => {
  let tempContent = "";
  const [content, setContent] = useState();
  const handleEditorChange = (e: any) => {
    tempContent = e.target.getContent();
  };

  const handleClick = () => (e: React.MouseEvent<unknown>) => {
    console.log(tempContent);
    setContent(tempContent);
  };

  return (
    <div>
      <h2>Default</h2>
      <Editor
        apiKey="pvpw2z0ouubmjquu6398rg3vxyqch3rfrhuru6qsekuf49ne"
        initialValue="<p>This is the initial content of the editor</p>"
        init={{
          height: 500,
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
      <h2>Custom</h2>
      <Editor
        id="customEdit"
        apiKey="pvpw2z0ouubmjquu6398rg3vxyqch3rfrhuru6qsekuf49ne"
        initialValue="<p>This is the initial content of the editor</p>"
        init={{
          height: 500,
          menubar: ["edit", "insert", "table", "view"],
          plugins: [
            "a11ychecker",
            "lists",
            "advlist",
            "image",
            "imagetools",
            "paste",
            "table",
            "preview"
          ],
          mobile: {
            plugins: [
              "a11ychecker",
              "lists",
              "advlist",
              "image",
              "imagetools",
              "paste",
              "table",
              "preview"
            ]
          },
          toolbar:
            "undo redo | fontselect fontsizeselect formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help a11ycheck preview | \
             image paste",
          paste_data_images: true, // 이미지 복붙
          language: "sv_SE"
        }}
        onChange={e => handleEditorChange(e)}
      />
      <button type="button" onClick={handleClick()}>
        Save
      </button>
    </div>
  );
};

export default TinyEditor;
