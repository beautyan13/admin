import React, { Component } from 'react'
import './login.css'
import logo from '../../static/images/logo.jpg'
import { Form, Input, Button, message } from 'antd';
import { Redirect } from 'react-router-dom';
import 'antd/dist/antd.css'
import {reqLogin} from '../../api'
import { connect } from 'react-redux';
import {createSaveUserAction} from '../../redux/action/login.js'
//import axios from 'axios'
//import qs from 'querystring'

/* @connect(
    state => ({isLogin:state.userInfo.isLogin}), 
    {
     saveUserinfo : createSaveUserAction
    }
) */
 class Login extends Component {
    
      onFinish = async (values) => {
       
        const {username,password} = values
        // let result = reqLogin(values)
        let result = await reqLogin(username,password)
        //console.log('test',result);
        if(result.status ===0){
            //登录成功，
            
            //1 服务器返回的user信息，还有token交由redux管理
            this.props.saveUserinfo(result.data)
           // console.log("result.data",result.data)
            //2跳转到admin
            this.props.history.replace('/admin')
        }else{
             message.warning(result.msg)
        }
        //console.log("@result",result)
         /* .then((result) => {
            console.log('@',result.data)
        })
        .catch((reason) => {
            console.log('@',reason)
            
        })  */
         /* axios.post('http://localhost:3000/login',values)
         .then((result) => {
             console.log('@',result.data)
         })
         .catch((reason) => {
             console.log('@',reason)
             
         }) */
        //console.log(result)
        };   

    render(){
        //先判断一下是不是已经登陆了
        const {isLogin} = this.props
        if(isLogin){
            return <Redirect to="/admin/home" />
        }
        return (
            <div className="login">
               <div className="login-header">
                   <div className="login-headerinner">
                    <img src={logo} alt="背景" />
                    <h2>React项目：后台管理系统</h2></div> 
               </div>
               <div className="login-content">
                   <h2>用户登录</h2>
                   <Form
                   className="form1"
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 10 }}
                    initialValues={{ remember: true }}
                    onFinish={this.onFinish}
                    >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {required: true,whitespace:true , message: 'Please input your username!' }, 
                            {min:4, message: '最少4位'},
                            {max:12, message: '最多12位'},
                            {pattern:/^[a-zA-Z0-9_]+$/,message:'以数字字母下划线开头'}
                            ]}
                        initialValue={'admin'}  //设置初始值
                            
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            { required: true,whitespace:true , message: 'Please input your password!' },
                            {min:4, message: '最少4位'},
                            {max:12, message: '最多12位'},
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 10, span: 20 }}>
                        <Button type="primary" htmlType="submit">
                        登录
                        </Button>
                    </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}


export default connect(    
   state => ({isLogin:state.userInfo.isLogin}), 
   {
    saveUserinfo : createSaveUserAction
   }
)(Login)
//export default Login