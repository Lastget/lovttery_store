import * as cons from '../constants/userConstants'
import * as orderCons from '../constants/orderContants'
import axios from 'axios'
import { bindActionCreators } from '@reduxjs/toolkit'


export const login = (email, password) => async(dispatch) => {
    try{
        dispatch({
            type: cons.USER_LOGIN_REQUEST,
        })

        const config={
            headers: {
                'Content-type': 'application/json'
            }
        }

        const {data} = await axios.post(
            '/api/users/login/',
            {'username':email, 'password': password},
            config
        )
        
        dispatch({
            type:cons.USER_LOGIN_SUCCESS,
            payload:data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    }catch(error){

        dispatch({
            type: cons.USER_LOGIN_FAILED,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message

        })
    }
}

export const logout = () => (dispatch) => { 
    localStorage.removeItem('userInfo')
    dispatch({type: cons.USER_LOGOUT })
    dispatch({type: cons.USER_DETAILS_RESET})
    dispatch({type: orderCons.ORDER_LIST_MY_RESET})
    dispatch({type: cons.USER_LIST_RESET})
} 



export const register = (name, email, password) => async(dispatch) => {
    try{
        dispatch({
            type: cons.USER_REGISTER_REQUEST,
        })

        const config={
            headers: {
                'Content-type': 'application/json'
            }
        }

        const {data} = await axios.post(
            '/api/users/register/',
            {'name':name, 'email':email, 'password': password},
            config
        )
        
        dispatch({
            type:cons.USER_REGISTER_SUCCESS,
            payload:data
        })

        dispatch({
            type:cons.USER_LOGIN_SUCCESS,
            payload:data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    }catch(error){

        dispatch({
            type: cons.USER_REGISTER_FAILED,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message

        })
    }
}



export const getUserDetails = (id) => async(dispatch, getState) => {
    try{
        dispatch({
            type: cons.USER_DETAILS_REQUEST,
        })

        const {
            userLogin: { userInfo }
        } = getState()

        const config={
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}` 
            }
        }

        const {data} = await axios.get(
            `/api/users/${id}/`,
            config
        )
        
        dispatch({
            type:cons.USER_DETAILS_SUCCESS,
            payload:data
        })

    }catch(error){

        dispatch({
            type: cons.USER_DETAILS_FAILED,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message

        })
    }
}

// 

export const updateUserProfile = (user) => async(dispatch, getState) => {
    try{
        dispatch({
            type: cons.USER_UPDATE_PROFILE_REQUEST,
        })

        const {
            userLogin: { userInfo }
        } = getState()

        const config={
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}` 
            }
        }

        const {data} = await axios.put(
            `/api/users/profile/update`,
            user,
            config
        )
        
        dispatch({
            type:cons.USER_UPDATE_PROFILE_SUCCESS,
            payload:data
        })

        dispatch({
            type:cons.USER_LOGIN_SUCCESS,
            payload:data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))


    }catch(error){

        dispatch({
            type: cons.USER_UPDATE_PROFILE_FAILED,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message

        })
    }
}



export const listUsers = () => async(dispatch, getState) => {
    try{
        dispatch({
            type: cons.USER_LIST_REQUEST,
        })

        const {
            userLogin: { userInfo }
        } = getState()

        const config={
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}` 
            }
        }

        const {data} = await axios.get(
            `/api/users/`,
            config
        )
        
        dispatch({
            type:cons.USER_LIST_SUCCESS,
            payload:data
        })


    }catch(error){

        dispatch({
            type: cons.USER_LIST_FAILED,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message

        })
    }
}





export const deleteUser = (id) => async(dispatch, getState) => {
    try{
        dispatch({
            type: cons.USER_DELETE_REQUEST,
        })

        const {
            userLogin: { userInfo }
        } = getState()

        const config={
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}` 
            }
        }

        const {data} = await axios.delete(
            `/api/users/delete/${id}/`,
            config
        )
        
        dispatch({
            type:cons.USER_DELETE_SUCCESS,
            payload:data
        })


    }catch(error){

        dispatch({
            type: cons.USER_DELETE_FAILED,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message

        })
    }
}




export const updateUser = (user) => async(dispatch, getState) => {
    try{
        dispatch({
            type: cons.USER_UPDATE_REQUEST
        })

        const {
            userLogin: { userInfo }
        } = getState()

        const config={
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}` 
            }
        }

        const {data} = await axios.put(
            `/api/users/update/${user._id}/`,
            user,
            config
        )
        
        dispatch({
            type:cons.USER_UPDATE_SUCCESS,
        })

        dispatch({
            type:cons.USER_DETAILS_SUCCESS, 
            payload: data
        })


    }catch(error){

        dispatch({
            type: cons.USER_UPDATE_FAILED,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message

        })
    }
}


