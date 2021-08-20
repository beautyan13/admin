//这个文件用来将所有的reducer组合在一起，然后再统一暴露出去
import { combineReducers } from "redux";
//引入各种reducer
import loginReducer from "./login-reducer";
import menuReducer from './menu-reducer'
//汇总所有的reducer
export default combineReducers({
    //所有的reducer
    userInfo:loginReducer,
    saveTitle:menuReducer
})