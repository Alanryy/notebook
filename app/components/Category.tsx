'use client'
import React from 'react'
import Title from './title'

interface Page {
    _id: string;
    title: string;
    categorie: string;
    content: string;
    __v: number;
}

type category = string []

const Pagecat = async () => {

    const handleClick = () => {
      
    };
    const res =  await fetch('https://notebook-navy.vercel.app/api/category/123');
   //const res =  await fetch('http://localhost:3000/api/notepages/category/123');
    const data = await res.json();
    //const pages : Page[] = data.data;
    const categories : category = data.data;
  return (
    <>
    <div className='bg-pink-700 p-6 text-white text-xl text-center w-1/7 overflow-hidden'>
          <ul>
            {categories.map(category => 
                <li key={category}
                className='m-3'
                onClick={(handleClick)} // Wrap the onClick handler with useClient
                id={category}
              >
                {category}
              </li>
            )
            } 
          </ul>
    </div>

          <Title category ="category"/>
          </>
    
  )
}

export default Pagecat 