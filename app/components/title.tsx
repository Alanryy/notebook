'use client'
import React from 'react'
import useIdeaGenerationStore from './idea-generation';


const Pagetitle =  ( props : any) => {

const {titles} = useIdeaGenerationStore()
const {categories} = useIdeaGenerationStore()


  return (
    <div className='bg-pink-600 p-6 text-white text-xl w-1/7 overflow-hidden min-w-[120px] '>      
          { categories &&
            titles.map((title:any,index) => 
              <li key={index}
              className='m-3 cursor-pointer hover:text-blue-300'
            >
              {title.title}
            </li>
          )
          }
    </div>
  )
}

export default Pagetitle 