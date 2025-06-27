// Phần này là Kiểm tra trạng thái Like,save,follow của User


export const isPostLikeByUser = (post, userId) => {
    if (!post?.likedByUsers || !userId) return false;
    
    return post.likedByUsers.some(item => {
        // Nếu item là object có id
        if (typeof item === 'object' && item?.id) {
            return item.id == userId; // Dùng == để handle string/number
        }
        // Nếu item là primitive value
        return item == userId;
    });
}


export const isCommentLikeByUser=(comment,userId)=>{
    if(!comment?.likedByUsers || !userId) return false;

    return comment.likedByUsers.some(item=>{
       // Nếu item là object có id
        if (typeof item === 'object' && item?.id) {
            return item.id == userId; // Dùng == để handle string/number
        }
        // Nếu item là primitive value
        return item == userId;
    });

}

export const isSavedPost=(user,postId)=>{
      if(!user?.savedPost || !postId) return false;

    return user.savedPost.some(item=>{
       // Nếu item là object có id
        if (typeof item === 'object' && item?.id) {
            return item.id == postId; // Dùng == để handle string/number
        }
        // Nếu item là primitive value
        return item == postId;
    });


}


export const isFollowing=(reqUser,user2)=>{
    if(reqUser && user2){
    for(let item of user2.follower){
        if(reqUser.id===item.id) return true;
    }
}
    return false;

}

export const  isReqUser =(userId1,userId2)=>{
    if(userId1 && userId2) return userId1===userId2;
}


//hàm để lấy giờ từ timestamp
function getTimeInHours(timestamp) {
  const date = new Date(timestamp);
  const hours = date.getHours();
  return hours;
}


//hàm để lọc ra những người dùng có story trong vòng 24 giờ
// nếu có story thì sẽ trả về mảng người dùng có story
export const hasStory = (users) => {
  const temp = users.reduce((acc, item) => {
    if (item.stories?.length > 0) {
      const time = getTimeInHours(
        item.stories[item.stories?.length - 1].timestamp
      );

      if (time < 24) {
        acc.push(item);
      }
    }
    return acc;
  }, []);

  return temp;
};


//hàm để tính khoảng thời gian từ timestamp
// ví dụ: 1 phút trước, 2 giờ trước, 3 ngày trước,

export const timeDifference = (timestamp) => {
  // 1 min ago
  // 1 hour ago
  // 1 week ago

  const date = new Date(timestamp);
  const diff = Date.now() - date.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);

  if (weeks > 0) {
    return weeks + " week" + (weeks === 1 ? "" : "s") + " ago";
  } else if (days > 0) {
    return days + " day" + (days === 1 ? "" : "s") + " ago";
  } else if (hours > 0) {
    return hours + " hour" + (hours === 1 ? "" : "s") + " ago";
  } 
  else if (minutes > 0) {
  return minutes + " minute" + (minutes === 1 ? "" : "s") + " ago";
}
 else if (seconds > 0) {
  return seconds + " second" + (seconds === 1 ? "" : "s") + " ago";
}
};