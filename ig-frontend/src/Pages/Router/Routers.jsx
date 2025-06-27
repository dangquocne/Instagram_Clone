import React from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { Route, Routes, useLocation } from 'react-router-dom'
import HomePage from '../HomePage/HomePage'
import Profile from '../../Components/Profile/Profile'
import Story from '../Story/Story'
import Auth from '../Auth/Auth'
import Signup from '../../Components/Rester/Signup'
import EditAccountDetails from '../../Components/EditAccountDetails/EditAccountDetails'


const Router = () => {
  
  //sử dụng useLocation để lấy thông tin về đường dẫn hiện tại
    const location = useLocation();
  return (
    <div>
      {(location.pathname !=="/login" && location.pathname!=="/signup") &&(
         <div className='flex'>
                <div className='w-[20%] border border-gray-200 '>
                  <Sidebar  />
                </div>
                <div className='w-full'>
                    <Routes>
                        <Route path="" element={<HomePage />} />
                        <Route path="/:username" element={<Profile />} />
                          <Route path="/story/:userId" element={<Story/>} />
                          <Route path="/comment/:postId" element={<HomePage />} />
                            <Route path="/account/edit" element={<EditAccountDetails/>} />
                    </Routes>
                </div>
              </div>
      )}   {(location.pathname ==="/login" || location.pathname==="/signup") &&(
                <div>
                  <Routes>
                  
                        <Route path="/signup" element={<Auth/>} />
                          <Route path="/login" element={<Auth/>} />
                    </Routes>
                </div>
      )}

    </div>
  )
}

export default Router