'use client'
import React, { useEffect, useState } from 'react'
import useIdeaGenerationStore from './idea-generation';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import Pagetitle from './Title'
import { Console } from 'console';



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
      if (e !== category){
        setCategory(e);
      }
    };

    const handleClickAddCategory = async () => {
      const input = document.querySelector('input[name="addButton"]') as HTMLInputElement;
      const category = input.value;
      const isCategoryExists = categories.includes(category);
      if (isCategoryExists) {
        alert('Category already exists');
        return
      }

      try {
        const response = await fetch(`/api/category/123?category=${category}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (response.ok) {
          const data = await response.json();
          input.value = '';
          input.hidden = true;
          const addButton = document.getElementById("add") as HTMLElement;
          addButton.hidden = true;
          fetch('/api/category/123').then((res) => res.json()).then((data) => {setCategories(data.data)}).catch((error) => {console.error('Error fetching data:', error);});
        } else {
          console.error('Failed to insert data:', response.statusText);
        }
      } catch (error) {
        console.error('Error inserting data:', error);
      }
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
      <div className='bg-pink-700 p-2 text-white text-xl  relative '>
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
                <button onClick={handleClickAddCategory} id='add' hidden>Add </button>
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