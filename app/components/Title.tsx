'use client'
import useIdeaGenerationStore from './idea-generation';
import Page from './Page'
import React, { useEffect, useState } from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Editor } from 'react-draft-wysiwyg';
import { ContentState, convertFromHTML,convertFromRaw,EditorState } from 'draft-js';
import { set } from 'mongoose';



const Pagetitle =  ( props : any) => {
const { editorState, setEditorState } =useIdeaGenerationStore();
const {category} = useIdeaGenerationStore()
const {titles} = useIdeaGenerationStore()
const {title}=useIdeaGenerationStore()
const {categories} = useIdeaGenerationStore()
const {setTitle} = useIdeaGenerationStore()
const {setTitles} = useIdeaGenerationStore()
const { page } = useIdeaGenerationStore();
const { setPage } = useIdeaGenerationStore();


const handleClickTitle = (e:string) => {
  var content = "";
  if(e !== title){
    setTitle(e);
    fetch('http://localhost:3000/api/notepages/123?title='+e)
  .then((res) => res.json())
  .then((data) => {
   setPage(data.data[0].content);
   const show= document.getElementById("show") as HTMLElement;
   show.hidden = false;
//
 const editorStateFromRaw = (rawContent: any) => {
  const contentState = convertFromRaw(rawContent);
  return EditorState.createWithContent(contentState);
}
    var initialState;
    if (data.data[0].content && data.data[0].content !== "") {
      const rawContent = JSON.parse(data.data[0].content);
      initialState = EditorState.createWithContent(convertFromRaw(rawContent));
    } else {
      initialState = EditorState.createEmpty();
    }

setEditorState(initialState);
    console.log(data.data[0].content);
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
  });
  }
};

const Addtitle = async () => {
  const input = document.querySelector('input[name="addButtontitle"]') as HTMLInputElement;
  const title = input.value;
  // Check if title already exists in titles
  const titleExists = titles.some((t: any) => t.title === title);
  if (titleExists) {  
    alert('Title already exists');
    return;
  }

  try {
    const response = await fetch(`/api/title/123?category=${category}&title=${title}&content=`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Data inserted successfully:', data);
      input.value = '';
      input.hidden = true;
      const addButton = document.getElementById("addtitle1") as HTMLElement;
      addButton.hidden = true;
      fetch('/api/title/123?category='+category).then((res) => res.json()).then((data) => {setTitles(data.data)}).catch((error) => {console.error('Error fetching data:', error);
      });
    } else {
      console.error('Failed to insert data:', response.statusText);
    }
  } catch (error) {
    console.error('Error inserting data:', error);
  }
};
const showaddtitle = () => {
  const input1 = document.querySelector('input[name="addButtontitle"]') as HTMLInputElement;
  const addButton1 = document.getElementById("addtitle1") as HTMLElement;
  addButton1.hidden = false;
  input1.hidden = false;
  input1.focus();
  
}
const handleShowAddInput1 = () => {
  showaddtitle();
};
  return (
      <div className={'bg-pink-600 cursor-pointer  text-white text-xl '+ (category  ?  "p-2 w-auto" : "w-0")} >      
          <ul>
            { categories &&
              titles.map((tit:any,index) => 
                <li  
                key={index} 
                className='m-3 p-2  hover:text-blue-300 '
                onClick={()=> handleClickTitle(tit.title)} >
                {tit.title}
                </li>
            )
            }
            <li>
                <input type="text" placeholder="Add category" className='text-gray-900' hidden  name='addButtontitle'/><br/>
                <button onClick={Addtitle} id='addtitle1' hidden >Add </button>
            </li>
          </ul>
          <div className="bottom-3   flex items-center justify-center ">
           <AiOutlinePlusCircle className="cursor-pointer hover:scale-110" size={24} 
           onClick={()=> handleShowAddInput1()}
           />
          </div>
          

      </div>

  )
}

export default Pagetitle 