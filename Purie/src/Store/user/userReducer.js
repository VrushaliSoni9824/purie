import store from "..";
import { STOREUSER, LOGOUT,SAVEQUOTE, RESETQUOTE, SAVETXN, RESETTXN, UPDATEWALLET, UPDATE_ADDRESS } from "./actionTypes";

const initialState = {
    isLoggedIn: false,
    customer: {
        name: '',
        email: '',
        mobile: '',
        userId: '',

        
    }, 
    shippingAddress: {
        shippingId: '',
        flat: '',
        block: '',
        society: '',
        city: '',
        state: '',
        country: '',
        zip: '',
        landmark: ''
    },
    recoverFor: '',
    orderId: '',
    rpzTxnId: '',
    walletBalance: 0,
}

const userReducer = (state = initialState, {type,payload}) => {

    switch (type)
    {
        case STOREUSER: 
            return {
                ...state,
                isLoggedIn: payload.isLoggedIn,
                customer: payload.customer
            };
                
        case LOGOUT:
            console.log('RD LOGOUT');
            return {
               
                ...state,
               isLoggedIn: false
            };
        case SAVEQUOTE:
            return {
                ...state,
                orderId:payload.orderId
            };
        case RESETQUOTE: 
            return {
                ...state,
                orderId: ''
            };
        case SAVETXN: 
         return {
             ...state,
             rpzTxnId: payload.txnId
         };
         case RESETTXN: 
         return {
             ...state,
             rpzTxnId: ''
         };
         case UPDATEWALLET: return {
             ...state,
            walletBalance: payload.amt
         }
         case UPDATE_ADDRESS: 
         return {
             ...state,
             shippingAddress: payload.address
         };
        default:
            return state;    
    }

}

export default userReducer;