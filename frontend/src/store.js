import {configureStore, combineReducers, applyMiddleware} from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import {composewithDevTools} from 'redux-devtools-extension'
import {productListReducer, productDetailReducer, productDeleteReducer, 
    productCreateReducer, productUpdateReducer, productReviewCreateReducer, productTopRatedReducer} from './reducer/productReducers'
import {cartReducer} from './reducer/cartReducers'
import {userLoginReducer, userRegisterReducer, userDetailsReducer,
     userUpdateProfileReducer, userListReducer, userDeleteReducer, 
     userUpdateReducer} from './reducer/userReducers'
import {orderReducer, orderDetailReducer, orderPayReducer, 
    orderListMyReducer, orderListReducer, orderDeliverReducer} from './reducer/orderReducer'
const reducer = combineReducers({
    productList: productListReducer,
    productDetail : productDetailReducer,
    productDelete: productDeleteReducer, 
    productCreate: productCreateReducer, 
    productUpdate: productUpdateReducer,  
    productReviewCreate: productReviewCreateReducer, 
    productTopRated: productTopRatedReducer,

    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer, 
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer, 
    userDelete: userDeleteReducer,  
    userUpdate: userUpdateReducer,

    orderCreate: orderReducer, 
    orderDetail: orderDetailReducer, 
    orderPay: orderPayReducer, 
    orderListMy : orderListMyReducer, 
    orderList : orderListReducer, 
    orderDeliver: orderDeliverReducer, 
    
})

// get string to JSON load in localstorages
const cartItemFromStorage = localStorage.getItem('cartItems') ?
        JSON.parse(localStorage.getItem('cartItems')) : [];

const userInfoFromStorage = localStorage.getItem('userInfo') ?
        JSON.parse(localStorage.getItem('userInfo')) : null;

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ?
        JSON.parse(localStorage.getItem('shippingAddress')) : {};


export const initialState = {
    cart: {
        cartItems: cartItemFromStorage,
        shippingAddress: shippingAddressFromStorage
    },
    userLogin: {userInfo: userInfoFromStorage}

};

// thunk 
const middleware = [thunk]; 


const store = configureStore({
    reducer: reducer,
    preloadedState: initialState,
    middleware: middleware,
});

export default store; 