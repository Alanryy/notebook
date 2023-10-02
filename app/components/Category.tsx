
import React from 'react'

interface Page {
    _id: string;
    title: string;
    categorie: string;
    content: string;
    __v: number;
}


const Pagecat = async () => {
    const res =  await fetch('https://notebook-navy.vercel.app/api/notepages/895');
    const data = await res.json();
    const pages : Page[] = data.data;
    console.log(pages.map)
  return (
    <div className='bg-pink-700 p-6 text-white text-xl text-center w-1/7 overflow-hidden'>
          <ul>
            {pages.map(page => 
                <li className='m-3' key={page._id}>{page.categorie}</li> 
            )
            } 
          </ul>
    </div>
  )
}

export default Pagecat 