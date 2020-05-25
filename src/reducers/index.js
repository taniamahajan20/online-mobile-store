import { combineReducers } from "redux";
import { items } from "./products";
import { cart } from "./cart";
const rootReducer = combineReducers({
  items,
  cart,
});

export default rootReducer;
