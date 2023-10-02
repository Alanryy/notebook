import React from 'react'
import PageCard from './components/PageCard'
export default function Home() {
  return (
    <div className='h-screen flex flex-col'>
    <div className='p-6 bg-black bg-opacity-90 text-pink-600 text-4xl text-center font-bold'>
      MY NOTEBOOK
    </div>
    <div className='flex flex-row' style={{ height: 'calc(100vh - 64px)' }}>
      <div className='bg-pink-700 p-6 text-white text-xl text-center w-1/7 overflow-hidden'>
          <ul>
            <li className='m-3'>Category 1</li> <hr/>
            <li className='m-3'>Category 2</li> <hr/>
            <li className='m-3'>Category 3</li> <hr/>
          </ul>
      </div>
      <div className='bg-pink-600 p-6 text-white text-xl text-center w-1/7 overflow-hidden'>
          <ul >
            <li className='m-3'>title  1</li> <hr/>
            <li className='m-3'>title 2</li><hr/>
            <li className='m-3'>title 3</li><hr/>
          </ul>
      </div>


      <div className='flex-grow overflow-auto '>
        <textarea className='w-full h-full p-4 focus:transition-none focus:outline-none' style={{
          fontFamily: 'Cursive', 
          fontSize: '20px', 
          lineHeight: '1.5', 
          backgroundColor: 'rgba(0, 0, 0, 0.95)', // Darker black background
          color: 'white', // Much darker pink text color
          backgroundImage: 'linear-gradient(0deg, transparent 24px, rgb(107 107 107 / 50%) 25px, rgba(0, 0, 0, 0.1) 26px, transparent 27px), linear-gradient(90deg, rgba(0, 0, 0, 0.15) 1px, transparent 2px)',
          backgroundSize: '100% 1.5em',
          resize: 'none'
        }}>
        </textarea>
      </div>
    </div>
</div>

  )
}
