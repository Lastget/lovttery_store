import * as cons from '../constants/cartConstants'

export const cartReducer = (state = {cartItems:[], shippingAddress: {}}, action) => {
    switch(action.type){
        case cons.CART_ADD_ITEM:
            const item = action.payload
            const existItem = state.cartItems.find(x => x.product === item.product)

            if (existItem){
                // update Item replace with new Item , or original. 
                return{
                    ...state,
                    cartItems: state.cartItems.map(x => 
                        x.product === existItem.product ? item : x 
                        )
                }
            }else{
                // add new Item 
                return{
                    ...state, 
                    cartItems: [...state.cartItems, item ]
                }
            }
        
        case cons.CART_REMOVE_ITEM:
            return{
                ...state,
                cartItems: state.cartItems.filter(x => x.product !== action.payload)
            }

        case cons.CART_SAVE_SHIPPING_ADDRESS:
            return{
                ...state,
                shippingAddress: action.payload
            }

        case cons.CART_SAVE_PAYMENT_METHOD:
            return{
                ...state, 
                paymentMethod: action.payload
            }

        case cons.CART_CLEAR_ITEM:
            return{
                ...state, 
                cartItems: []
            }
        

        default: 
            return state 

    }


}