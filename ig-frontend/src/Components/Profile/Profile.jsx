import React, { useEffect } from 'react'
import ProfileUserDetails from '../ProfileComponents/ProfileUserDetails'
import ReqUserPostPart from '../ProfileComponents/ReqUserPostPart'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { findUserByUserNameAction, getUserProfile } from '../../Redux/User/Action';
import { isFollowing, isReqUser } from '../../Config/Logic';

const Profile = () => {

   const {user}= useSelector(store=>store);

   const {username}= useParams();
    const dispatch= useDispatch();
     const token =localStorage.getItem("token");

     //kiểm tra xem người dùng hiện tại có phải là người dùng đang xem trang cá nhân không
     const isRequser=isReqUser(user.reqUser?.id,user.findByUsername?.id);
   

     //kiểm tra xem người dùng hiện tại có theo dõi người dùng đang xem trang cá nhân không
     const isFollowed = isFollowing(user.reqUser,user.findByUsername);

      useEffect(()=>{
             const data={
                 token,
                 username
             }
             dispatch(getUserProfile(token));
             dispatch(findUserByUserNameAction(data));
          },[username,user.follower,user.following])


  return (
    <div className='px-20'>
     <div className=''>
      //
    <ProfileUserDetails user={isRequser ? user.reqUser : user.findByUsername}
    // isFollowed={isFollowed} sử dụng hàm isFollowing để kiểm tra xem người dùng hiện tại có theo dõi người dùng đang xem trang cá nhân không
     isFollowing={isFollowed} isRequser={isRequser}/>
</div>
<div>
    <ReqUserPostPart user={isRequser ? user.reqUser : user.findByUsername} />
</div>
    </div>
  )
}

export default Profile