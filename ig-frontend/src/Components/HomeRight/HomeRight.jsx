import React from 'react'
import SuggestionCard from './SuggetionCard'
import { useSelector } from 'react-redux'

const HomeRight = () => {

  const user = useSelector(store => store.user);
  return (
    <div className=''>
      <div>
       
        <div className='flex  justify-between items-center'>
        <div className='flex items-center '>
          <div>
            <img className='w-12 h-12 rounded-full' 
            src={user.reqUser?.image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="" />
          </div>
          <div className='ml-3'>
            <p>{user.reqUser?.name}</p>
            <p className='opacity-70'>{user.reqUser?.username}</p>
          </div>

        </div>
          <div>
            <p className='text-blue-700 font-semibold'>Swith</p>
          </div>
       
        </div>
        {/* Phan nay ung de hien thi ban be can follow ben phai */}
         <div className='space-y-5 mt-10'>
          {[1,1,1,1].map((item)=><SuggestionCard/>)}
        </div>
      </div>
    </div>
  )
}

export default HomeRight