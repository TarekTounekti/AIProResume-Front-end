import { combineReducers } from "redux";
import lettreReducer from "./lettreReducer";
import cvReducer from "./cvReducer";

export default combineReducers ({
    lettreReducer ,
    cvReducer
})