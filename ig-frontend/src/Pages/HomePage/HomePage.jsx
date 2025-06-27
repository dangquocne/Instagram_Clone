import React, { use, useEffect, useState } from 'react'
import StoryCircle from '../../Components/Story/StoryCircle'
import HomeRight from '../../Components/HomeRight/HomeRight'
import PostCard from '../../Components/Post/PostCard'
import CreatePostModal from '../../Components/Post/CreatePostModal'
import { useDispatch, useSelector } from 'react-redux'
import { findUserPostAction } from '../../Redux/Post/Action'
import {  findUserByIdsAction } from '../../Redux/User/Action'
import { hasStory } from '../../Config/Logic'

const HomePage = () => {

// Lấy thông tin người dùng,bài post từ Redux store
  const { user, post } = useSelector(store => store);
  const [userIds, setUserIds] = useState();
  const token = localStorage.getItem("token");
  
  // Lấy hàm dispatch để gửi action đến Redux store
  const dispatch = useDispatch();


  // useEffect thứ nhất: Tạo danh sách ID người dùng để lấy bài post
// Mục đích: Khi thông tin user thay đổi, tạo mảng userIds gồm:
// - ID của chính user hiện tại
// - ID của tất cả những người mà user đang follow
// Điều này giúp hiển thị bài post từ bản thân và những người đang theo dõi (như newsfeed)
  useEffect(() => {
    const newIds = user.reqUser?.following?.map((user) => user.id) || [];
    setUserIds([user.reqUser?.id, ...newIds]);

  }, [user.reqUser]);



  // useEffect thứ hai: Gọi API lấy bài post dựa trên danh sách userIds
// Mục đích: Khi có thay đổi về:
// - userIds (danh sách người dùng cần lấy post)
// - post.createdPost (có bài post mới được tạo)
// - post.deletedPost (có bài post bị xóa)
// Thì sẽ gọi lại API để cập nhật danh sách bài post hiển thị
    useEffect(() => {

      const data = {
        jwt: token,
        userIds: [userIds].join(","),

      };

      // console.log(data);
      dispatch( findUserByIdsAction(data));
      dispatch(findUserPostAction(data));
    }, [userIds, post.createdPost, post.deletedPost]);


      const storyUsers = hasStory(user.findUserByIds);
  return (
    <div>
      <div className='mt-10 flex w-[100%] justify-center '>

        <div className='w-[44%] px-10 '>
          {/* // day la phan story */}
          <div className='storyDiv flex space-x-2 border border-gray-300 p-4 rounded-md justify-start w-full'>
            {storyUsers.length>0 && storyUsers.map((item) => <StoryCircle user={item} />)}
          </div>

          {/* // day la phan dang thong tin*/}
          <div className='space-y-10 w-full mt-10'>
            {post.usersPost.length > 0 && post.usersPost.map((item) => (
              <PostCard post={item} />))}
          </div>
        </div>

        {/* //phan nay la phan ben phai  */}
        <div className='w-[27%]'>
          <HomeRight />
        </div>
      </div>

      {/* <CreatePostModal/>   */}
    </div>
  )
}

export default HomePage