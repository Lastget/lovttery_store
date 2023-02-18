import * as constants from '../constants/productConstants'
import axios from 'axios'

// list Product action : making API request and get product list.
export const listProducts = (keyword = '') => async (dispatch) => {
    try{
        dispatch({type: constants.PRODUCT_LIST_REQUEST})

        const {data} = await axios.get(`/api/products/${keyword}`)

        dispatch({
            type: constants.PRODUCT_LIST_SUCCESS,
            payload: data})


    }catch(error){

        dispatch({
            type: constants.PRODUCT_LIST_FAILED,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message

        })

    }
}


export const listProductsDetails = (id) => async (dispatch) => {
    try{
        dispatch({type: constants.PRODUCT_DETAILS_REQUEST})

        const {data} = await axios.get(`/api/products/${id}`)

        dispatch({
            type: constants.PRODUCT_DETAILS_SUCCESS,
            payload: data})


    }catch(error){

        dispatch({
            type: constants.PRODUCT_DETAILS_FAILED,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message

        })

    }
}



export const listTopProducts = () => async (dispatch) => {
    try{
        dispatch({type: constants.PRODUCT_TOP_REQUEST})

        const {data} = await axios.get(`/api/products/top`)

        dispatch({
            type: constants.PRODUCT_TOP_SUCCESS,
            payload: data})


    }catch(error){

        dispatch({
            type: constants.PRODUCT_TOP_FAILED,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message

        })

    }
}


export const deleteProduct = (id) => async(dispatch, getState) => {
    try{
        dispatch({
            type: constants.PRODUCT_DELETE_REQUEST,
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
            `/api/products/delete/${id}/`,
            config
        )
        
        dispatch({
            type:constants.PRODUCT_DELETE_SUCCESS,
        })

    }catch(error){

        dispatch({
            type: constants.PRODUCT_DELETE_FAILED,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message

        })
    }
}



export const createProduct = () => async(dispatch, getState) => {
    try{
        dispatch({
            type: constants.PRODUCT_CREATE_REQUEST,
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
            `/api/products/create/`,
            {},
            config
        )
        
        //send to reducer and update the state
        dispatch({
            type:constants.PRODUCT_CREATE_SUCCESS,
            payload: data,
        })

    }catch(error){

        dispatch({
            type: constants.PRODUCT_CREATE_FAILED,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message

        })
    }
}




export const updateProduct = (product) => async(dispatch, getState) => {
    try{
        dispatch({
            type: constants.PRODUCT_UPDATE_REQUEST,
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
            `/api/products/update/${product._id}/`,
            product,
            config
        )
        
        //send to reducer and update the state
        dispatch({
            type:constants.PRODUCT_UPDATE_SUCCESS,
            payload: data,
        })

        dispatch({type: constants.PRODUCT_DETAILS_SUCCESS, 
                    payload: data})

    }catch(error){

        dispatch({
            type: constants.PRODUCT_UPDATE_FAILED,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message

        })
    }
}




export const createProductReview = (productId, review) => async(dispatch, getState) => {
    try{
        dispatch({
            type: constants.PRODUCT_CREATE_REVIEW_REQUEST,
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

        //in review there are rating and comment
        const {data} = await axios.post(
            `/api/products/${productId}/reviews/`,
            review,
            config
        )
        
        //send to reducer and update the state
        dispatch({
            type:constants.PRODUCT_CREATE_REVIEW_SUCCESS,
            payload: data,
        })


    }catch(error){

        dispatch({
            type: constants.PRODUCT_CREATE_REVIEW_FAILED,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message

        })
    }
}

