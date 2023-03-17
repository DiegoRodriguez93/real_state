import dynamic from 'next/dynamic';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

const Editor = dynamic(() => import('react-draft-wysiwyg').then((mod) => mod.Editor), { ssr: false });
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

type TextAreaWithHTMLType = {
  name: string;
  values: Record<string, string>;
  setValues: Dispatch<SetStateAction<Record<string, string>>>;
};

const TextAreaWithHTML: FC<TextAreaWithHTMLType> = ({ name, values, setValues }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleOnEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState);
    const value = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    setValues({ ...values, [name]: value });
  };

  return (
    <div>
      <Editor
        editorState={editorState}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onEditorStateChange={handleOnEditorStateChange}
      />
    </div>
  );
};

export default TextAreaWithHTML;
