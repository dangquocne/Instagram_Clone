import React, { useEffect, useState } from 'react'

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { likeCommentAction, unLikeCommentAction } from '../../Redux/Comment/Action';
import { isCommentLikeByUser, timeDifference } from '../../Config/Logic';
const CommentCard = ({ comment }) => {

    const [isCommentLiked, setIsCommentLiked] = useState(false);
    const { user } = useSelector(store => store);
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");


    const data = { jwt: token, commentId: comment.id };

    //Hàm xử lý khi nhấn like comment
    const handleLikeComment = () => {
        setIsCommentLiked(true);
        dispatch(likeCommentAction(data))
    }

    const handleUnLikeComment = () => {
        setIsCommentLiked(false);
        dispatch(unLikeCommentAction(data))
    }


    // useEffect quản lý trạng thái like của user đối với comment
    // Mục đích: Cập nhật UI để hiển thị chính xác trạng thái like comment của user hiện tại
    useEffect(() => {
        setIsCommentLiked(isCommentLikeByUser(comment, user.reqUser?.id));

    }, [comment.id, user.reqUser, comment.likedByUsers])

    return (
        <div>
            <div className='flex justify-between items-center py-5'>
                <div className='flex items-center '>
                    {/* // day la phan hien thi hinh anh va thong tin nguoi dung */}
                    <div >
                        <img className='w-9 h-9 rounded-full'
                            src={comment.user.userImage || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="" />
                    </div>
                    <div className='ml-3'>
                        {/* //hien thi thong tin nguoi dung va noi dung binh luan */}
                        <p>
                            <span className=' font-semibold'>{comment?.user?.username}</span>
                            <span className='ml-2'>{comment?.content}</span>
                        </p>

                        {/* // day la phan hien thi thoi gian va so luot thich */}
                        <div className='flex items-center space-x-3 text-xs opacity-60 pt-2 '>
                            <span>{timeDifference(comment.createdAt)}</span>
                            <span>{comment.likedByUsers.length} likes</span>
                        </div>
                    </div>
                </div>

                {/* // day la phan hien thi icon thich binh luan */}
                {isCommentLiked ? (<AiFillHeart
                    className='text-xs hover:opacity-50 cursor-pointer text-red-500'
                    onClick={handleUnLikeComment} />) :
                    (<AiOutlineHeart className='text-xs hover:opacity-50 cursor-pointer' onClick={handleLikeComment} />)
                }
            </div>
        </div>
    )
}

export default CommentCard