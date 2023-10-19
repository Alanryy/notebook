'use client'
import React from 'react';
import useIdeaGenerationStore from './idea-generation';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw } from 'draft-js';
import '../globals.css';
import { EditorState, convertFromRaw } from 'draft-js';

function PageComp() {
  const { editorState, setEditorState , page,setPage, category,setCategory,title,setTitle} = useIdeaGenerationStore();

  const handleSave = async () => {
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const content = JSON.stringify(rawContentState);
    try {
      const response = await fetch(`http://localhost:3000/api/notepages/123`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          categorie: category,
          title: title,
          content: content  // send it as an object
        })
      });
    
      if (response.ok) {
        const data = await response.json();
        console.log('Data inserted successfully:', data);
      } else {
        console.error('Failed to insert data:', response.statusText);
      }
    } catch (error) {
      console.error('Error inserting data:', error);
    } 
  }; 

  const uploadImage = async (file : File) => {
    return new Promise(
      (resolve, reject) => {
        const src = URL.createObjectURL(file);
        resolve({ data: { link: src } });
      }
    );
  };

  return (
    <div className="App w-full ">
      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        toolbar={{
          options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'],
          inline: {
            options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace', 'superscript', 'subscript'],
          },
          blockType: {
            inDropdown: true,
            options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'],
          },
          fontSize: {
            options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
          },
          list: {
            inDropdown: false,
            options: ['unordered', 'ordered', 'indent', 'outdent'],
          },
          textAlign: {
            options: ['left', 'center', 'right', 'justify'],
          },
          image: {
            urlEnabled: true,
            uploadEnabled: true,
            alignmentEnabled: true,
            uploadCallback: uploadImage,
            previewImage: true,
            inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
            alt: { present: true, mandatory: false },
            defaultSize: {
              height: 'auto',
              width: 'auto',
            },
          },
        }}
      />
       <button id="show" onClick={handleSave} className="absolute top-5 right-10 px-4 py-1 bg-pink-700 text-white rounded z-10" hidden>save</button>
    </div>
  );
}

export default PageComp;
