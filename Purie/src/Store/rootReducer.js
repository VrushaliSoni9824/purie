import { combineReducers } from "redux";
import userReducer from "./user/userReducer";
import subscribeReducer from "./subscribe/subscribeReducer";
import cartReducer from './user/cartReducer';

const rootReducer = combineReducers({ 
    user :  userReducer,
    subscriptionPlans : subscribeReducer,
    cart: cartReducer
});

export default rootReducer;