import React, { useEffect } from 'react'
import StoryViewer from '../../Components/StoryComponents/StoryViewer'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { findStoryByUserIdAction } from '../../Redux/Story/Action'

const Story = () => {

       const {story}= useSelector(store => store);
       console.log("story: ", story);

      const {userId}= useParams();
  const token = localStorage.getItem("token");
  
  // Lấy hàm dispatch để gửi action đến Redux store
  const dispatch = useDispatch();
//     const story= [
//         {
//                image:"https://cdn.pixabay.com/photo/2022/03/24/15/46/woman-7089304_640.jpg"
//         },
//         {
//                image:"https://cdn.pixabay.com/photo/2021/10/07/00/48/boat-6686952_1280.jpg"
//         },
//         {
//                image:"https://cdn.pixabay.com/photo/2025/05/09/01/22/waiting-9588284_640.jpg"
//         },
//         {
//                image:"https://cdn.pixabay.com/photo/2025/01/09/17/48/boat-9322331_640.jpg"
//         },
//         {
//                image:"https://cdn.pixabay.com/photo/2023/10/27/10/28/woman-8344944_640.jpg"
//         },

// ]
    

// dùng để lấy danh sách story của người dùng theo userId
useEffect(() => {
       const data = {
           jwt: token,
           userIds: userId
       };
       dispatch(findStoryByUserIdAction(data));

   }, [userId]);

  return (
    <div>
        {story?.stories?.length>0 && <StoryViewer stories={story?.stories}/>}
    </div>
  )
}

export default Story