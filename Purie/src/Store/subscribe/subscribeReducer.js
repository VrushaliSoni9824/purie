import { LOAD_PLANS } from "./actionTypes";

const initialState = {
    plans: ''
}

const subscribeReducer = (state = initialState, {type,payload}) => {

    switch (type) 
    {
        case LOAD_PLANS: 
            return {
                ...state,
                plans: payload.plans  
            };

        default:
            return state;
    }

}

export default subscribeReducer;

