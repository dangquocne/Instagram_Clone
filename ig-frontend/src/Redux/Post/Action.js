
import { CREATE_NEW_POST, DELETE_POST, GET_SINGLE_POST, GET_USER_POST, LIKE_POST, REQ_USER_POST, SAVE_POST, UNLIKE_POST, UNSAVE_POST } from "./ActionType";


const BASE_API= "http://localhost:8080/api"

export const createPostAction = (data) => async (dispatch) => {
    try {

        const res = await fetch(`${BASE_API}/posts/create`, {
          
            method: "POST",
            headers: {
                "Content-Type": "application/json",

                Authorization: "Bearer "+data.jwt,

            },
            body:JSON.stringify(data.data)

        })

       
        const post = await res.json();

        console.log(" create post: ", post)
       
        dispatch({ type:CREATE_NEW_POST, payload: post })

    } catch (error) {
        console.log(error)
    }

}


export const  findUserPostAction = (data) => async (dispatch) => {
    try {

        
        const res = await fetch(`${BASE_API}/posts/following/${data.userIds}`, {
            
            method: "GET",
            headers: {
                "Content-Type": "application/json",

                Authorization: "Bearer "+data.jwt,

            }

        })

       
        const posts = await res.json();

        console.log(" find post by user id: ", posts)
       
        dispatch({ type:GET_USER_POST, payload: posts })

    } catch (error) {
        console.log(error)
    }

}



export const  reqUserPostAction = (data) => async (dispatch) => {
    try {

        const res = await fetch(`${BASE_API}/posts/following/${data.userIds}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",

                Authorization: "Bearer "+data.jwt,

            }

        })

       
        const posts = await res.json();

        console.log(" req user post: ", posts)
       
        dispatch({ type:REQ_USER_POST, payload: posts })

    } catch (error) {
        console.log(error)
    }

}



export const  likePostAction = (data) => async (dispatch) => {
    try {

        const res = await fetch(`${BASE_API}/posts/like/${data.postId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",

                Authorization: "Bearer "+data.jwt,

            }

        })

       
        const posts = await res.json();

        console.log(" like post: ", posts)
       
        dispatch({ type:LIKE_POST, payload: posts })

    } catch (error) {
        console.log(error)
    }

}




export const  unLikePostAction = (data) => async (dispatch) => {
    try {

        const res = await fetch(`${BASE_API}/posts/unLike/${data.postId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",

                Authorization: "Bearer "+data.jwt,

            }

        })

       
        const posts = await res.json();

        console.log(" un like post: ", posts)
       
        dispatch({ type:UNLIKE_POST, payload: posts })

    } catch (error) {
        console.log(error)
    }

}




export const  savePostAction = (data) => async (dispatch) => {
    try {

        const res = await fetch(`${BASE_API}/posts/save_post/${data.postId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",

                Authorization: "Bearer "+data.jwt,

            }

        })

       
        const posts = await res.json();

        console.log(" save post: ", posts)
       
        dispatch({ type:SAVE_POST, payload: posts })

    } catch (error) {
        console.log(error)
    }

}



export const  unSavePostAction = (data) => async (dispatch) => {
    try {

        const res = await fetch(`${BASE_API}/posts/unSave_post/${data.postId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",

                Authorization: "Bearer "+data.jwt,

            }

        })

       
        const posts = await res.json();

        console.log("un save post: ", posts)
       
        dispatch({ type:UNSAVE_POST, payload: posts })

    } catch (error) {
        console.log(error)
    }

}





export const  findPostByIdPostAction = (data) => async (dispatch) => {
    try {

        const res = await fetch(`${BASE_API}/posts/${data.postId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",

                Authorization: "Bearer "+data.jwt,

            }

        })

       
        const posts = await res.json();

        console.log("get single post : ", posts)
       
        dispatch({ type:GET_SINGLE_POST, payload: posts })

    } catch (error) {
        console.log(error)
    }

}


export const  deletePostAction = (data) => async (dispatch) => {
    try {

        const res = await fetch(`${BASE_API}/posts/delete/${data.postId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",

                Authorization: "Bearer "+data.jwt,

            }

        })

       
        const post = await res.json();

        console.log("delete post: ", post)
       
        dispatch({ type:DELETE_POST, payload: post})

    } catch (error) {
        console.log(error)
    }

}