import React, { useEffect, useState } from 'react'
import { AiOutlineTable, AiOutlineUser } from "react-icons/ai";
import { RiVideoAddLine } from "react-icons/ri";
import { BiBookmark } from "react-icons/bi";
import ReqUserPostCard from './ReqUserPostCard';
import { useDispatch, useSelector } from 'react-redux';
import { reqUserPostAction } from '../../Redux/Post/Action';


const ReqUserPostPart = ({user}) => {
     const {post}= useSelector(store=>store);
     const token =localStorage.getItem("token");
     const dispatch= useDispatch();

    const [activeTab, setActiveTab] = useState();


    //phần này sẽ lấy bài post của người dùng hiện tại trong profile
     useEffect(()=>{
        const data={
            jwt:token,
            userIds:user?.id
        }
        dispatch(reqUserPostAction(data));
     },[user,post.createdPost]) 

 const tabs = [
  {
    tab: "Post",
    icon: <AiOutlineTable></AiOutlineTable>,
    activeTab: ""
  },
  {
    tab: "Reels",
    icon: <RiVideoAddLine></RiVideoAddLine>,
    
  },
  {
    tab: "Saved",
    icon: <BiBookmark></BiBookmark>,
    
  },
  {
    tab: "Tagged",
    icon: <AiOutlineUser></AiOutlineUser>,
    
  }
]
    return (
    <div>
      <div className='flex space-x-14 border-t relative  border-t-gray-300'>
         {tabs.map((item) => <div onClick={()=>setActiveTab(item.tab)}  className={`${activeTab === item.tab ? "border-t border-black" : "opacity-60"} flex items-center cursor-pointer py-2 text-sm`}>  
           <p>{item.icon}</p>
          <p className='ml-1'>{item.tab}</p>
           </div>)}

        </div>
        <div>
            <div className='flex flex-wrap '>
                { activeTab==="Post"? post.profilePost?.map((item) => <ReqUserPostCard post={item}/>): ""}  
                {activeTab==="Saved"? user?.savedPost.map((item) => <ReqUserPostCard post={item}/>) : "" } 
            </div>
        </div>
    </div>
  )
}

export default ReqUserPostPart