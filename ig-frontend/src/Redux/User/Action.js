import { FOLLOW_USER, GET_USER_BY_USERNAME, GET_USERS_BY_USER_IDS, REQ_USER, SEARCH_USER, UNFOLLOW_USER, UPDATE_USER } from "./ActionType";

const BASE_API= "http://localhost:8080/api"

export const getUserProfile = (jwt) => async (dispatch) => {
    try {

        const res = await fetch(`${BASE_API}/users/req`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",// Kiểu dữ liệu gửi đi (dù GET thường không cần)

                // Thêm header Authorization kiểu Basic Auth: base64(email:password)
                Authorization: "Bearer "+jwt,

            }

        })

        // Đọc dữ liệu JSON từ response (thông tin người dùng mới tạo)
        const reqUser = await res.json();

        // Gửi action đến Redux store để cập nhật state người dùng sau khi load user thanhf cong 
        dispatch({ type: REQ_USER, payload: reqUser })

    } catch (error) {
        console.log(error)
    }

}


export const findUserByUserNameAction = (data) => async (dispatch) => {
    try {

        const res = await fetch(`${BASE_API}/users/username/${data.username}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",

                Authorization: "Bearer "+data.token,

            }

        })

       
        const user = await res.json();

        console.log(" find by username: ",user)
       
        dispatch({ type:GET_USER_BY_USERNAME, payload: user })

    } catch (error) {
        console.log(error)
    }

}


export const findUserByIdsAction = (data) => async (dispatch) => {
    try {

        const res = await fetch(`${BASE_API}/users/m/${data.userIds}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",

                Authorization: "Bearer "+data.jwt,

            }

        })

       
        const users = await res.json();

        console.log(" find by userIds: ",users)
       
        dispatch({ type:GET_USERS_BY_USER_IDS, payload: users })

    } catch (error) {
        console.log(error)
    }

}


export const followUserAction = (data) => async (dispatch) => {
    try {

        const res = await fetch(`${BASE_API}/users/follow/${data.userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",

                Authorization: "Bearer "+data.jwt,

            }

        })

       
        const user = await res.json();

        console.log(" follow user: "+ user)
       
        dispatch({ type:FOLLOW_USER, payload: user })

    } catch (error) {
        console.log(error)
    }

}




export const unFollowUserAction = (data) => async (dispatch) => {
    try {

        const res = await fetch(`${BASE_API}/users/unfollow/${data.userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",

                Authorization: "Bearer "+data.jwt,

            }

        })

       
        const user = await res.json();

        console.log("un follow user: "+ user)
       
        dispatch({ type:UNFOLLOW_USER, payload: user })

    } catch (error) {
        console.log(error)
    }

}



export const searchUserAction = (data) => async (dispatch) => {
    try {

        const res = await fetch(`${BASE_API}/users/search?q=${data.query}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",

                Authorization: "Bearer "+data.jwt,

            }

        })

       
        const user = await res.json();

        console.log(" search user: ", user)
       
        dispatch({ type:SEARCH_USER, payload: user })

    } catch (error) {
        console.log(error)
    }

}



export const editUserAction = (data) => async (dispatch) => {
    try {

        const res = await fetch(`${BASE_API}/users/account/edit`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",

                Authorization: "Bearer "+data.jwt,

            },
            body:JSON.stringify(data.data)

        })

       
        const user = await res.json();

        console.log(" edit user: "+ user)
       
        dispatch({ type:UPDATE_USER, payload: user })

    } catch (error) {
        console.log(error)
    }

}