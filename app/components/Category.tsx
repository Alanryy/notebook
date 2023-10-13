'use client'
import React, { useEffect, useState } from 'react'
import useIdeaGenerationStore from './idea-generation';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import Pagetitle from './Title'
import { Console } from 'console';

// interface Page {
//     _id: string;
//     title: string;
//     categorie: string;
//     content: string;
//     __v: number;
// }



// type category = string []

const Pagecat  = () => {
  const {title} = useIdeaGenerationStore()
  const {category} = useIdeaGenerationStore()
  const {titles} = useIdeaGenerationStore()
  const {categories} = useIdeaGenerationStore()
  //const {newCategory} = useIdeaGenerationStore()

  const {setTitle} = useIdeaGenerationStore()
  const {setCategory} = useIdeaGenerationStore()
  const {setTitles} = useIdeaGenerationStore()
  const {setCategories} = useIdeaGenerationStore()
  //const {setNewCategory} = useIdeaGenerationStore()

  useEffect(() => {
    fetch('/api/category/123')
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [])

  useEffect( () => {
    fetch('/api/title/123?category='+category)
      .then((res) => res.json())
      .then((data) => {
        setTitles(data.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [category])


    const handleClickCategory = (e:string) => {
      console.log(e)
      if (e !== category){
        setCategory(e);
      }
    };
    const handleClickAddCategory = () => {
      const input = document.querySelector('input[name="addButton"]') as HTMLInputElement;
      
    };
    const handleShowAddInput = () => {
      const input = document.querySelector('input[name="addButton"]') as HTMLInputElement;
      const addButton = document.getElementById("add") as HTMLElement;
      addButton.hidden = false;
      input.hidden = false;
      input.focus();
    };

  return (
    <>
      <div className='bg-pink-700 p-6 text-white text-xl w-1/7 overflow-hidden relative'>
            <ul>
              {categories.map(category => 
                  <li key={category}
                  className='m-3 cursor-pointer hover:text-blue-300'
                  onClick={()=> handleClickCategory(category)} 
                >
                  {category}
                </li>
              )
              } 
              <li>
                <input type="text" placeholder="Add category" className='text-gray-900' hidden name='addButton'/><br/>
                <button onClick={()=> handleClickAddCategory()}  id='add' hidden>Add </button>
              </li>
            </ul>
          <AiOutlinePlusCircle className="absolute bottom-3 left-[45%] cursor-pointer hover:-scale-110 " size={24}
          onClick={()=> handleShowAddInput()} 
          />
      </div>
      <Pagetitle />
    </>
    
  )
}
export default Pagecat 