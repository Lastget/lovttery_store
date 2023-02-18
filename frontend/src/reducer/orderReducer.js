import * as cons from '../constants/orderContants'

import React from 'react'

export function orderReducer(state ={}, action) {
  switch (action.type) {
    case cons.ORDER_CREATE_REQUEST:
        return {
            loading:true 
        }
           
    case cons.ORDER_CREATE_SUCESS:
        return {
            loading: false,
            success: true,
            order: action.payload  
        }
    case cons.ORDER_CREATE_FAILED: 
        return {
            loading:false,
            error: action.payload 

        }

    case cons.ORDER_CREATE_RESET: 
        return {
        }

    

    default:
        return state 

  }

}
  


export function orderDetailReducer(state ={loading: true, orderItem:[], shippingAddress: {}}, action) {
    switch (action.type) {
      case cons.ORDER_DETAIL_REQUEST:
          return {
              ...state, 
              loading:true 
          }
             
      case cons.ORDER_DETAIL_SUCCESS:
          return {
              loading: false,
              order: action.payload  
          }
      case cons.ORDER_DETAIL_FAILED: 
          return {
              loading:false,
              error: action.payload 
          }
      default:
          return state 
    }
  }


  export function orderPayReducer(state ={}, action) {
    switch (action.type) {
      case cons.ORDER_PAY_REQUEST:
          return {
              loading:true 
          }
             
      case cons.ORDER_PAY_SUCCESS:
          return {
              loading: false,
              success: true
          }
      case cons.ORDER_PAY_FAILED: 
          return {
              loading:false,
              error: action.payload 
          }

        case cons.ORDER_PAY_RESET: 
          return {}

      default:
          return state 
    }
  }


  export function orderDeliverReducer(state ={}, action) {
    switch (action.type) {
      case cons.ORDER_DELIVER_REQUEST:
          return {
              loading:true 
          }
             
      case cons.ORDER_DELIVER_SUCCESS:
          return {
              loading: false,
              success: true
          }
      case cons.ORDER_DELIVER_FAILED: 
          return {
              loading:false,
              error: action.payload 
          }

        case cons.ORDER_DELIVER_RESET: 
          return {}

      default:
          return state 
    }
  }

  export function orderListMyReducer(state ={orders:[]}, action) {
    switch (action.type) {
      case cons.ORDER_LIST_MY_REQUEST:
          return {
              loading:true 
          }
             
      case cons.ORDER_LIST_MY_SUCCESS:
          return {
              loading: false,
              orders: action.payload
          }
      case cons.ORDER_LIST_MY_FAILED: 
          return {
              loading:false,
              error: action.payload 
          }

        case cons.ORDER_LIST_MY_RESET: 
          return {
              orders: []
          }
      default:
          return state 
    }
  }
    

export function orderListReducer(state ={orders:[]}, action) {
switch (action.type) {
    case cons.ORDER_LIST_REQUEST:
        return {
            loading:true 
        }
            
    case cons.ORDER_LIST_SUCCESS:
        return {
            loading: false,
            orders: action.payload
        }
    case cons.ORDER_LIST_FAILED: 
        return {
            loading:false,
            error: action.payload 
        }

    default:
        return state 
}
}



