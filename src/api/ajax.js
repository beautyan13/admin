import axios from 'axios'

import qs from 'querystring'
import Nprogress from 'nprogress'  //这个是用来做网页上边的进度条
import 'nprogress/nprogress.css'
const instance = axios.create({
    timeout:4000
})
//上面的实例是如果4s没有响应就认为超时返回错误，
//如果不写上面的instance，下面的instance全都换成axios


//请求拦截器
 instance.interceptors.request.use((config) => {
     Nprogress.start()
    const {method,data} = config
    if(method.toLowerCase() === 'post'){
        if(data instanceof Object){
            config.data = qs.stringify(data)
        }
    } 
    //console.log("config",config)
    return config;
},  (error) => {
        return Promise.reject(error);
});

  // 设置响应拦截器
  instance.interceptors.response.use((response) => {
      Nprogress.done()
    return response.data;
    }, (error) => {
        Nprogress.done()
        return Promise.reject(error);
        //return '错了'
    });
//export default instance 
export default instance