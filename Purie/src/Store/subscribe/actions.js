import { LOAD_PLANS } from "./actionTypes";

export const loadPlans = (plans) => ({
   type: LOAD_PLANS,
   payload: {
       plans:plans
   }
});