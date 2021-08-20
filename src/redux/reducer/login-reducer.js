/* reducer是一个函数，用来接收两个参数，一个是之前的状态，一个是action */
/* 
    具体流程：从action中获取到type 和 data
    然后用switch判断type是哪一种，然后进行操作
*/
import {SAVE_USER_INFO,DELETE_USER} from '../index.js'
//定义一个初始状态,admin一刷新就会运行这个文件，所以在定义初始状态时要
//先看看localStorage里面有没有东西，有就说明是登陆状态后的刷新
let username = JSON.parse(localStorage.getItem('username'))
 const initState = {
     username:username || "",  //localStorage里username有值吗，有就有，没有就是空
     isLogin:username? true : false
 }
export default function loginReducer(preState = initState,action){
    //从action中获取type和data
    const {type,data} = action
    //console.log("reducerdata",action.data)
    let newState
    switch (type) {
        case SAVE_USER_INFO:
            newState = {username:data.username ,isLogin:true}
            return newState
        case DELETE_USER:
            newState = {username:'' ,isLogin:false}
            return newState
        default:
            return preState
    }
} 