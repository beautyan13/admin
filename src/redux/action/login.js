//这个文件用来放login的action

import {SAVE_USER_INFO,DELETE_USER} from '../index.js'

// export const 名字 = data => (type:从变量定义处获得,data)
export const createSaveUserAction = (data) =>{
    //把data数据保存在localStorage中，登陆以后刷新页面数据不会丢
    localStorage.setItem('username',JSON.stringify(data.username))
    //localStorage.setItem('isLogin',true)
    return {type:SAVE_USER_INFO,data}
}

//退出登陆的action
export const createDeleteUserAction = () =>{
    //1 把localStorage中保存的东西删除
    localStorage.removeItem('username')
    return {type:DELETE_USER}
}