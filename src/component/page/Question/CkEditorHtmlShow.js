import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
export default function CkEditorHtmlShow(props) {
  // console.log(props);
  return (
    <div className="mt-2">
      {!props.data ? (
        <div>No Description found</div>
      ) : (
        <CKEditor
          editor={Editor}
          disabled
          data={props?.data}
          config={
            ({ placeholder: "Enter Your Description..." },
            {
              toolbar: [],
            })
          }
          // placeholder="Enter Your Description"
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            // console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            editor.getData(props?.data);
            //   setDescription(data);
          }}
          onBlur={(event, editor) => {
            // console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            // console.log("Focus.", editor);
          }}
        />
      )}
    </div>
  );
}
