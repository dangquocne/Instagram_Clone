import React, { useEffect, useState } from 'react'
import styled  from 'styled-components'
import Progressbar from './Progressbar'

// Container chính bao quanh phần hiển thị story
    const StoryViewerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: black;
`

// Phần hiển thị ảnh story
const StoryImage = styled.img`
  max-height: 90vh;
  object-fit: contain;
`
const StoryViewer = ({stories}) => {

     const[curentStoryIndex,setCurentStoryIndex]= useState(0);
     const[activeIndex,setActiveIndex]= useState(0);

     // Hàm xử lý khi chuyển sang story tiếp theo
     const handleNextStory=()=>{
       
      // Nếu chỉ số story hiện tại chưa phải là cuối cùng trong danh sách
      if(curentStoryIndex<stories?.length-1){

        // Tăng chỉ số story hiện tại lên 1
         setCurentStoryIndex(curentStoryIndex+1);

          // Đồng thời tăng chỉ số story đang active (hiển thị) lên 1
         setActiveIndex(activeIndex+1);
      }

      // Nếu đã đến story cuối cùng
      else if(curentStoryIndex===stories?.length-1){
        // Quay về story đầu tiên
         setCurentStoryIndex(0);
         setActiveIndex(0);
      }
     }

     // Tự động chạy khi component mount hoặc khi curentStoryIndex thay đổi
     useEffect(()=>{
      // Tạo một interval, cứ mỗi 2 giây sẽ gọi hàm handleNextStory để chuyển story
        const interval = setInterval(()=>{handleNextStory()},2000)

        // Hàm cleanup: khi component unmount hoặc khi curentStoryIndex thay đổi,
  // sẽ dừng interval cũ lại để tránh chạy nhiều lần song song
        return () => clearInterval(interval);

     },[curentStoryIndex]) // useEffect sẽ chạy lại mỗi khi curentStoryIndex thay đổi

  return (
    <div className='relative w-full'>
        <StoryViewerContainer>
          <StoryImage src={stories?.[curentStoryIndex].image}/>

             <div className='flex absolute top-0 w-full'>
              {stories.map((item,index)=><Progressbar key={index} index={index} activeIndex={activeIndex} duration={2000} />  )}
             </div>
        
        </StoryViewerContainer>
      </div>
  )
}

export default StoryViewer