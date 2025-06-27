import { CREATE_COMMENT, LIKE_COMMENT, UNLIKE_COMMENT } from "./ActionType";

const BASE_API= "http://localhost:8080/api"
export const createCommentAction = (data) => async (dispatch) => {
    try {

        const res = await fetch(`${BASE_API}/comments/create/${data.postId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",

                Authorization: "Bearer "+data.jwt,

            },
            body:JSON.stringify(data.data)

        })

       
        const comment = await res.json();

        console.log(" create comment: ", comment)
       
        dispatch({ type:CREATE_COMMENT, payload: comment })

    } catch (error) {
        console.log(error)
    }

}


export const findPostCommentAction = (data) => async (dispatch) => {
    try {
        const res = await fetch(`${BASE_API}/comments/${data.postId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + data.jwt,
            },
        });

        const comment = await res.json();
        console.log("find post Comment ", comment);
        dispatch({ type: GET_POST_COMMENT, payload: comment });
    } catch (error) {
        console.log("catch ", error);
    }
}


export const likeCommentAction = (data) => async (dispatch) => {
    try {
        const res = await fetch(`${BASE_API}/comments/like/${data.commentId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + data.jwt,
            },
        });

        const comment = await res.json();
        console.log("like Comment ", comment);
        dispatch({ type:LIKE_COMMENT, payload: comment });
    } catch (error) {
        console.log("catch ", error);
    }
}



export const unLikeCommentAction = (data) => async (dispatch) => {
    try {
        const res = await fetch(`${BASE_API}/comments/unlike/${data.commentId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + data.jwt,
            },
        });

        const comment = await res.json();
        console.log("un like Comment ", comment);
        dispatch({ type:UNLIKE_COMMENT, payload: comment });
    } catch (error) {
        console.log("catch ", error);
    }
}


