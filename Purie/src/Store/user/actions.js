import { STOREUSER, LOGOUT, SAVEQUOTE, RESETQUOTE, SAVETXN, RESETTXN, UPDATEWALLET, UPDATECART, REMOVE_FROM_CART, EMPTY_CART, CARTCONFIG, UPDATETOTAL, LOAD_CART, ADD_TO_CART, UPDATE_ADDRESS } from "./actionTypes";

export const storeUser = (user) => ({
    type: STOREUSER,
    payload: {
        customer: user,
        isLoggedIn: true
    }
});

export const updateAddress = (address) => ({
    type: UPDATE_ADDRESS,
    payload: {
        address: address
    }
});

export const saveQuote = (orderId) => ({
    type: SAVEQUOTE,
    payload: {
        orderId: orderId
    }
});

export const resetQuote = () => {
    type: RESETQUOTE
}


export const saveTxn = (txnId) => ({
    type: SAVETXN,
    payload: {
        txnId: txnId
    }
});

export const resetTxn = () => {
    type: RESETTXN
}

export const updateWallet = (amt) => ({
    type: UPDATEWALLET,
    payload: {
        amt: amt
    }
})


export const cartcount = (count) => ({
    type: FORGOTPASSWORD,
    payload: {
        cartCount: count
    }
});

export const updatecart = (cart,count) => ({
    type: UPDATECART,
    payload: {
        cart : cart,
        cartCount: count
    }
});


export const addToCart = (item) => ({   
    type: ADD_TO_CART,
    payload: {
        
        cart: item
    }
    
});

export const removeItem = (item) => ({
    
        type: REMOVE_FROM_CART,
        payload: {
            item : item
        }
});

export const emptyCart = () => ({
    type: EMPTY_CART
});

export const loadCart = (cart) => ({
    type: CARTCONFIG,
    payload: cart
});

export const updateTotal = (amt,qty) => ({
    type: UPDATETOTAL,
    payload: {
        amount: amt,
        modifyCount: qty
    }

});


export const logout = () => ({
    type: LOGOUT
   
});