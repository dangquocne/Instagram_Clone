import React, { useEffect } from 'react'
import { TbCircleDashed } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const ProfileUserDetails = ({user}) => {
    //  const {user}= useSelector(store=>store);
    const navigator= useNavigate();
    const dispatch= useDispatch();

     const token =localStorage.getItem("token");
     const handleEdit=()=>{
           navigator("/account/edit");   
     }

    
  return (
    <div className='py-10 w-full  '>
        <div className='flex items-center '>
                <div className='w-[15%]'>
                   <img className='w-32 h-32 rounded-full'
                    src={user?.image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="" />
                </div>


                <div className='space-y-5 '>
                    <div className='flex space-x-10 items-center '>
                        <p>{user?.username}</p>
                        <button className='px-5' onClick={handleEdit}> Edit Profile</button>
                        <TbCircleDashed></TbCircleDashed>
                    </div>

                    <div className='flex space-x-10'>
                        <div>
                            <span className='font-semibold mr-2'>10</span>
                            <span>posts</span>
                        </div>
                        <div>
                            <span className='font-semibold mr-2'>{user?.follower.length}</span>
                            <span>followers</span>
                        </div>
                        <div>
                            <span className='font-semibold mr-2'>{user?.following.length}</span>
                            <span>following</span>
                        </div>
                    </div>

                    <div>
                        <p className='font-semibold'>{user?.name}</p>
                        <p className='font-thin text-sm'>{user?.bio}</p>
                    </div>
                </div>
         </div>
    </div>
  )
}

export default ProfileUserDetails