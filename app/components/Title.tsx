'use client'
import React from 'react'
import useIdeaGenerationStore from './idea-generation';




const Pagetitle =  ( props : any) => {
 
const {category} = useIdeaGenerationStore()
const {titles} = useIdeaGenerationStore()
const {categories} = useIdeaGenerationStore()



  return (
    <div className={'bg-pink-600 text-white text-xl w-1/7 overflow-hidden '+ (category ?  "p-6" : "w-0")} >      
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