import React from 'react'
import Category from './components/Category'
import PageComp from './components/Page'

export default function Home() {
  return (
    <div className='h-screen flex flex-col'>
    <div className='p-6 bg-black bg-opacity-90 text-pink-600 text-4xl text-center font-bold'>
      MY NOTEBOOK
    </div>
    <div className='flex flex-row' style={{ height: 'calc(100vh - 64px)' }}>
      <Category />
      <PageComp/>
    </div>
</div>

  )
}
