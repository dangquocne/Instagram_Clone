import React, { useEffect, useState } from 'react'
import { BsBookmarkFill, BsThreeDots, BsBookmark, BsEmojiSmile } from "react-icons/bs";
import './PostCard.css';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import { RiSendPlaneLine } from 'react-icons/ri';
import CommentModal from '../Comment/CommentModal';
import { useDisclosure } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePostAction, likePostAction, savePostAction, unLikePostAction, unSavePostAction } from '../../Redux/Post/Action';
import { isPostLikeByUser, isSavedPost } from '../../Config/Logic';
import { useNavigate } from 'react-router-dom';

const PostCard = ({ post }) => {

    const [showDropDown, setShowDropDown] = useState(false);
    const [isPostLiked, setIsPostLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { user } = useSelector((store) => store);
    const dispatch = useDispatch();
    const navigator = useNavigate();

    const token = localStorage.getItem("token");




    const data = { jwt: token, postId: post?.id };

    //ham xu ly khi click vao nut luu bai
    const handleSavePost = () => {

        setIsSaved(true);

        dispatch(savePostAction(data));
    }

    const handleUnSavePost = () => {
        setIsSaved(false);
        dispatch(unSavePostAction(data));
    }

    //ham xu ly khi click vao nut thich bai
    const handlePostLike = () => {
        setIsPostLiked(true);
        dispatch(likePostAction(data));
    }

    const handleUnPostLike = () => {
        setIsPostLiked(false);
        dispatch(unLikePostAction(data));
    }

    //ham xu ly khi click vao nut 3 cham
    const handleClick = () => {
        setShowDropDown(!showDropDown);
    }


    //ham xu ly khi click vao nut delete
    const handleDeletePost = () => {
        const data={
            jwt: token,
            postId: post?.id
        }

        dispatch(deletePostAction(data));
        setShowDropDown(false);
    }


    //ham xu ly khi click vao nut binh luan de mo modal thong tin va binh luan
    const handleOpenCommentModal = () => {
        navigator(`/comment/${post.id}`)
        onOpen()
    }


    // useEffect quản lý trạng thái tương tác của user với bài post
    // Mục đích: Cập nhật UI để hiển thị chính xác trạng thái like và save của user
    useEffect(() => {
        setIsPostLiked(isPostLikeByUser(post, user.reqUser?.id));
        setIsSaved(isSavedPost(user.reqUser, post.id));
    }, [post.likedByUsers, user.reqUser, post.id])


    return (
        <div>
            {/* // day la phan hien thi bai viet */}
            <div className=' rounded-md w-full'>
                {/* // day la phan hien thi hinh anh va thong tin cua bai viet */}
                <div className='flex justify-between items-center w-full py-4 '>
                    {/* //phan nay la hien thi hinh anh va thong tin nguoi dung */}
                    <div className='flex items-center space-x-3 '>
                        <img className='h-12 w-12 rounded-full'
                            src={user.reqUser?.image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="" />

                        <div>
                            <p className='font-semibold text-sm'>{post.user.username} </p>
                            <p className='font-thin text-sm'>{post.location} </p>
                        </div>
                    </div>

                    <div>
                        <BsThreeDots className='dots' onClick={handleClick} />
                        <div className="dropdown-content">
                            {showDropDown && <p className="bg-black text-white py-1 px-4 rounded-md cursor-pointer" onClick={handleDeletePost}>delete</p>}
                        </div>
                    </div>
                </div>

                {/* //day la phan hien thi hinh anh cua bai viet */}
                <div className='w-full'>
                    <img className='w-full'
                        src={post?.image} alt="" />
                </div>

                {/* //day la phan hien thi icons like, comment, share va luu bai */}
                <div className='flex justify-between items-center w-full px-5 py-4'>

                    <div className='flex space-x-2 items-center'>


                        {isPostLiked ? <AiFillHeart
                            className='text-2xl hover:opacity-50 cursor-pointer text-red-500'
                            onClick={handleUnPostLike} /> :
                            <AiOutlineHeart className='text-2xl hover:opacity-50 cursor-pointer'
                                onClick={handlePostLike} />
                        }


                        <FaRegComment onClick={handleOpenCommentModal} className='text-xl hover:opacity-50 cursor-pointer ' />
                        <RiSendPlaneLine className='text-xl hover:opacity-50 cursor-pointer' />
                    </div>
                    <div>
                        {isSaved ? <BsBookmarkFill className='text-xl hover:opacity-50 cursor-pointer'
                            onClick={handleUnSavePost} /> : <BsBookmark className='text-xl hover:opacity-50 cursor-pointer'
                                onClick={handleSavePost} />}
                    </div>
                </div>

                {/* //day la phan hien thi so luong like, comment va luu bai */}
                <div className='w-full px-5 py-2'>
                    <p>{post?.likedByUsers?.length} likes</p>
                    <p className='font-bold text-sm'>{post?.user?.username} <span className='font-semibold'>{post?.caption}</span> </p>
                    <p className='opacity-50 py-2 cursor-pointer'>View all {post?.comments?.length} comments</p>
                </div>

                <div>
                    <div className=' border-b border-b-gray-300  flex items-center w-full px-5'>

                        <input className='commentInput' type="text" placeholder="Add a comment..." />
                        <BsEmojiSmile />
                    </div>
                </div>
            </div>
            {/* // day la phan hien thi modal binh luan */}
            <CommentModal onClose={onClose} isOpen={isOpen} isPostLiked={isPostLiked} isSaved={isSaved} handlePostLike={handlePostLike} handleSavePost={handleSavePost} />
        </div>
    )
}

export default PostCard