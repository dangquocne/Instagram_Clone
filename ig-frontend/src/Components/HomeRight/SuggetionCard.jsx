import React from 'react'

const SuggestionCard = () => {
  return (
    <div className='flex justify-between items-center'>
      <div className='flex items-center'>
        <img className='w-9 h-9 rounded-full' src='https://cdn.pixabay.com/photo/2023/10/27/10/28/woman-8344944_640.jpg' alt='' />
        <div className='ml-2'>
          <p className='text-sm font-semibold'>username</p>
          <p className='text-sm font-semibold opacity-70'>Follows you</p>
        </div>
      </div>
      <p className='text-blue-700 text-sm font-semibold'>Follow</p>
    </div>
  )
}

export default SuggestionCard