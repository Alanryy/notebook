
import React from 'react'

interface Page {
    _id: string;
    title: string;
    categorie: string;
    content: string;
    __v: number;
}


const Pagetitle = async () => {
    const res =  await fetch('http://localhost:3000/api/notepages');
    const data = await res.json();
    const pages : Page[] = data.data;
    console.log(pages.map)
  return (
    <div className='bg-pink-600 p-6 text-white text-xl text-center w-1/7 overflow-hidden'>
          <ul>
            {pages.map(page => 
                <li className='m-3' key={page._id}>{page.title}</li> 
            )
            } 
          </ul>
    </div>
  )
}

export default Pagetitle 