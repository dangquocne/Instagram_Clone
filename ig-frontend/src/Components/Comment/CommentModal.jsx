import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { BsBookmarkFill, BsBookmark, BsThreeDots, BsEmojiSmile } from 'react-icons/bs'
import CommentCard from './CommentCard'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { FaRegComment } from 'react-icons/fa'
import { RiSendPlaneLine } from 'react-icons/ri'
import './CommentModal.css'
import { data, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createCommentAction, findPostCommentAction } from '../../Redux/Comment/Action'
import { findPostByIdPostAction } from '../../Redux/Post/Action'
import { timeDifference } from '../../Config/Logic'

const CommentModal = ({onClose, isOpen, isPostLiked, isSaved, handlePostLike, handleSavePost}) => {

    const [commentContent,setCommentContent]=useState();
    const {postId}=useParams();
    const token= localStorage.getItem("token");
    const { comment, post,user } = useSelector(store => store);
    const dispatch=useDispatch();


    // console.log("reqUser-------",user)
    
    useEffect(()=>{
        const data={jwt:token, postId};
        if(postId){
            dispatch(findPostByIdPostAction(data));
        }   
    },[comment.createdComment,postId])

    return (
        <div> <Modal size={"4xl"} onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent>


                <ModalBody>
                    {/* // day la phan hien thi thong tin cua bai viet */}
                    <div className='flex h-[75vh]'>

                        {/* // day la phan hien thi hinh anh cua bai viet \*/}
                        <div className='w-[45%] flex flex-col justify-center '>

                            <img className='max-h-full w-full' src={post?.singlePost?.image} alt="" />
                        </div>

                        {/* // day la phan hien thi thong tin ten nguoi dung va noi dung bai viet   va tat ca nguoi binh luan */}
                        <div className=' w-[55%] pl-10 relative'>

                            {/* // day la phan hien thi thong tin nguoi chinh chu dang bai */}
                            <div className='flex justify-between items-center py-5'>

                                <div className='flex items-center'>
                                    <div>
                                        <img className='w-9 h-9 rounded-full' 
                                        src={user.reqUser.userImage || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}  alt="" />
                                    </div>
                                    <div className='ml-2'>
                                        <p>{user.reqUser.username}</p>

                                    </div>
                                </div>

                                <BsThreeDots />
                            </div>

                            {/* // day la phan hien thi tat cat binh luan cua bai viet */}
                            <div className='comment'>
                                {post.singlePost?.comments?.map((item) =>( <CommentCard comment={item} />))}
                            </div>

                            <div className='absolute bottom-0 w-[95%] '>
                                {/* //day la phan hien thi icons like, comment, share va luu bai */}
                            <div className='flex justify-between items-center w-full  py-4'>

                                <div className='flex space-x-2 items-center'>

                                    {isPostLiked ? <AiFillHeart
                                        className='text-2xl hover:opacity-50 cursor-pointer text-red-500'
                                        onClick={handlePostLike} />:
                                        <AiOutlineHeart className='text-2xl hover:opacity-50 cursor-pointer' onClick={handlePostLike} />
                                    
                                     }


                                    <FaRegComment className='text-xl hover:opacity-50 cursor-pointer ' />
                                    <RiSendPlaneLine className='text-xl hover:opacity-50 cursor-pointer' />
                                </div>
                                <div>
                                    {isSaved ? <BsBookmarkFill className='text-xl hover:opacity-50 cursor-pointer' onClick={handleSavePost} /> : <BsBookmark className='text-xl hover:opacity-50 cursor-pointer' onClick={handleSavePost} />}
                                </div>
                            </div>

                            {/* //day la phan hien thi so luong like, comment va luu bai */}
                            <div className='w-full py-2'>
                                 <p>{post?.singlePost   ?.likedByUsers?.length} likes</p>
                                <p className='opacity-50 text-sm'>{timeDifference(post?.singlePost?.createdAt)}</p>
                            </div>


                            {/* //day la phan hien thi input de binh luan */}
                            {/* <div className='w-full border border-t border-t-gray-300 py-2'>     */}
                            <div className='flex items-center w-full border-t border-t-gray-300 '>
                                <BsEmojiSmile />
                                <input className='commentInput' type="text" name="content"
                                 placeholder="Add a comment..." 
                                 onChange={(e)=>setCommentContent(e.target.value)}
                                 onKeyPress={(e)=>{
                                    if(e.key === "Enter"){
                                        const data={
                                            jwt:token,
                                            postId,
                                            data:{
                                            content:commentContent,
                                            }
                                           
                                        };
                                        dispatch(createCommentAction(data));
                                    }
                                 }}/>
                            </div>
                             {/* </div> */}
                            </div>
                        </div>

                    </div>

                </ModalBody>

            </ModalContent>
        </Modal></div>
    )
}

export default CommentModal