//项目中所有的请求由这个文件发出
import ajax from '../api/ajax.js'
import { BASE_URL } from '../config'
//登录请求
//export const reqLogin = (values) =>  ajax.post('http://localhost:3000/login',values)
export const reqLogin = (username,password) =>  ajax.post(`${BASE_URL}/login`,{username,password})
    /* .then((result) => {
        
    })
    .catch((reason) => {
        
    }) */

/* export const reqLogin = (values) => {
    console.log("axios")
    return axios.post('http://localhost:3000/login',values)
    
} */

//获取商品分类信息
export const reqCategoryList = () => ajax.get(`${BASE_URL}/manage/category/list`)

//新增商品类别
export const reqAddCategory = (categoryName) => ajax.post(`${BASE_URL}/manage/category/add`,{categoryName})

