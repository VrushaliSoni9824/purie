import { ADD_TO_CART, EMPTY_CART, REMOVE_FROM_CART, CARTCONFIG, UPDATECART, UPDATETOTAL, LOAD_CART } from './actionTypes';

const initialState = {
    cart: [],
    cartSubTotal: 0,
    cartCount:0,
    shipping: 0,
    total: 0
}

 const cartReducer = (state = initialState, { type, payload }) => {

    switch(type){
        case ADD_TO_CART:
            return {
                ...state,
              //  cart: [state.cart,payload.cart.cart],
                cart : payload.cart.cart,
                cartSubTotal: payload.cart.cartSubTotal,
                cartCount: parseInt(payload.cart.cartCount),
                total: parseInt(payload.cart.total)   
            }
            case LOAD_CART: 
                return {
                    ...state,
                    cart: payload
                }
            case EMPTY_CART:
                return {
                    ...state,
                    cart: [],
                    cartSubTotal: 0,
                    cartCount:0,
                    shipping: 0,
                    total: 0
                }
            case REMOVE_FROM_CART:
                return {
                    ...state,
                    cart: state.cart.filter((item, i) => i !== payload.index),
                    cartSubTotal: state.cartSubTotal - payload.item.amount,
                    cartCount: state.cartCounter - payload.item.qty,
                    total: state.total - payload.item.amount
                }
            case CARTCONFIG:
            return {
                ...state,
                cart: payload.cart.cart,
                total: payload.cart.grandTotal ,
                shipping: payload.cart.shipping,
                cartSubTotal: payload.cart.total,
                cartCount: payload.cart.cartCount,
                
            }

            case UPDATETOTAL:
                return  {
                    ...state,
                    cartSubTotal: state.cartSubTotal + payload.amount,
                    cartCount: state.cartCount + payload.modifyCount
                }
        
        default: 
            return state;
    }
};

export default cartReducer;