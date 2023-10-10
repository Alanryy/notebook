'use client'
import React, { useEffect, useState } from 'react'
import Title from './title'
import { Console } from 'console';

// interface Page {
//     _id: string;
//     title: string;
//     categorie: string;
//     content: string;
//     __v: number;
// }

// type category = string []

const Pagecat =  () => {
  const [categories, setcategories] = useState([]);
  const [titles, setTitles] = useState([]);
  const [categorySelected, setCategorySelected] = useState("");
  useEffect(() => {
    fetch('http://localhost:3000/api/category/123')
      .then((res) => res.json())
      .then((data) => {
        setcategories(data.data)
      })
  }, [])

  useEffect(() => {
    fetch('http://localhost:3000/api/title/123?category='+categorySelected)
      .then((res) => res.json())
      .then((data) => {
        setTitles(data.data)
      })
  }, [categorySelected])


    const handleClick = (e:string) => {
      console.log(e)
      if (e !== categorySelected){
        setCategorySelected(e);
      }
      
    };

  return (
    <>
      <div className='bg-pink-700 p-6 text-white text-xl w-1/7 overflow-hidden'>
            <ul>
              {categories.map(category => 
                  <li key={category}
                  className='m-3 cursor-pointer hover:text-blue-300'
                  onClick={()=> handleClick(category)} 
                >
                  {category}
                </li>
              )
              } 
            </ul>
      </div>
      <div className='bg-pink-600 p-6 text-white text-xl w-1/7 overflow-hidden min-w-[120px] '>
          
          { categorySelected &&
            titles.map((title:any,index) => 
              <li key={index}
              className='m-3 cursor-pointer hover:text-blue-300'
              
            >
              {title.title}
            </li>
          )
          }
      </div>
    </>
    
  )
}

export default Pagecat 