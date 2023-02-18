import * as cons  from '../constants/orderContants'
import * as cartcons from '../constants/cartConstants'
import axios from 'axios'
import { Container } from 'react-bootstrap'


export const createOrder = (order) => async(dispatch, getState) => {
    try{
        dispatch({
            type: cons.ORDER_CREATE_REQUEST,
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

        const {data} = await axios.post(
            `/api/orders/add/`,
            order,
            config
        )
        
        dispatch({
            type:cons.ORDER_CREATE_SUCESS,
            payload:data
        })

        dispatch({
            type:cartcons.CART_CLEAR_ITEM,
            payload:data
        })

        localStorage.removeItem('cartItems')


    }catch(error){

        dispatch({
            type: cons.ORDER_CREATE_FAILED,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message

        })
    }
}



export const getOrderDetail = (id) => async(dispatch, getState) => {
    try{
        dispatch({
            type: cons.ORDER_DETAIL_REQUEST,
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
            `/api/orders/${id}/`,
            config
        )
        
        dispatch({
            type:cons.ORDER_DETAIL_SUCCESS,
            payload:data
        })

    }catch(error){

        dispatch({
            type: cons.ORDER_DETAIL_FAILED,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message

        })
    }
}


export const payOrder = (id, paymentResult) => async(dispatch, getState) => {
    try{
        dispatch({
            type: cons.ORDER_PAY_REQUEST,
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
            `/api/orders/${id}/pay/`,
            paymentResult,
            config
        )
        
        dispatch({
            type:cons.ORDER_PAY_SUCCESS,
            payload:data
        })

    }catch(error){

        dispatch({
            type: cons.ORDER_PAY_FAILED,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message

        })
    }
}



export const deliverOrder = (order) => async(dispatch, getState) => {
    try{
        dispatch({
            type: cons.ORDER_DELIVER_REQUEST,
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
            `/api/orders/${order._id}/deliver/`,
            {},
            config
        )
        
        dispatch({
            type:cons.ORDER_DELIVER_SUCCESS,
            payload:data
        })

    }catch(error){

        dispatch({
            type: cons.ORDER_DELIVER_FAILED,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message

        })
    }
}




export const listMyOrders = () => async(dispatch, getState) => {
    try{
        dispatch({
            type: cons.ORDER_LIST_MY_REQUEST,
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
            `/api/orders/myorders/`,
            config
        )
        
        dispatch({
            type:cons.ORDER_LIST_MY_SUCCESS,
            payload:data
        })

    }catch(error){

        dispatch({
            type: cons.ORDER_LIST_MY_FAILED,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message

        })
    }
}


export const listOrders = () => async(dispatch, getState) => {
    try{
        dispatch({
            type: cons.ORDER_LIST_REQUEST,
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
            `/api/orders/`,
            config
        )
        
        dispatch({
            type:cons.ORDER_LIST_SUCCESS,
            payload:data
        })

    }catch(error){

        dispatch({
            type: cons.ORDER_LIST_FAILED,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message

        })
    }
}

