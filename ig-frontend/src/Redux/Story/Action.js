import { FETCH_USER_STORY } from "./ActionType";

const BASE_API= "http://localhost:8080/api"

export const createStoryAction = (data) => async (dispatch) => {
    try {

        const res = await fetch(`${BASE_API}/stories/create`, {

            method: "POST",
            headers: {
                "Content-Type": "application/json",

                Authorization: "Bearer "+data.jwt,

            },
            body:JSON.stringify(data.data)

        })

       
        const story = await res.json();

        console.log(" create story: ", story)

        dispatch({ type:CREATE_NEW_STORY, payload: story })

    } catch (error) {
        console.log(error)
    }

}


export const  findStoryByUserIdAction = (data) => async (dispatch) => {
    try {


        const res = await fetch(`${BASE_API}/stories/all/${data.userIds}`, {

            method: "GET",
            headers: {
                "Content-Type": "application/json",

                Authorization: "Bearer "+data.jwt,

            }

        })

       
        const stories = await res.json();

        console.log(" find story by user id: ", stories)

        dispatch({ type:FETCH_USER_STORY , payload: stories })

    } catch (error) {
        console.log(error)
    }

}