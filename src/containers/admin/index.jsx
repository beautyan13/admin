import React, { Component } from 'react'
import { connect } from 'react-redux';
//引入重定向
import {Redirect,Route,Switch} from 'react-router-dom'
import { Layout } from 'antd'

import './css/admin.css'
import Header from './header/header.jsx'
import LeftNav from './sider/left_nav'
import Home from '../../components/home/home'
import Bar from '../bar/bar'
import Category from '../category/category'
import Line from '../line/line'
import Pie from '../pie/pie'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'


const { Footer,Sider, Content } = Layout
/* @connect(
    state =>({userInfo:state.userInfo}),
    {
        deleteUser: createDeleteUserAction
    }
) */
 class Admin extends Component {
     /* componentDidMount(){
         console.log("admin",this.props)
     } */
    render() {
        const { isLogin} = this.props.userInfo
        //在显示admin之前要判断isLogin是否是true，如果是false则代表不是
        //通过正常登陆而来的，就跳出登陆页面
        if(!isLogin){
            //isLogin为false，则返回登陆页面
            return <Redirect to="/login"/>
        }else{
            return (         
                    <Layout className="admin">
                    <Sider className="sider">
                        <LeftNav />
                    </Sider>
                        <Layout>
                            <Header />
                            <Content className="content">
                                <Switch>
                                    <Route path="/admin/home" component={Home} />
                                    <Route path="/admin/prod_about/category" component={Category} />
                                    <Route path="/admin/prod_about/product" component={Product} />
                                    <Route path="/admin/user" component={User} />
                                    <Route path="/admin/role" component={Role} />
                                    <Route path="/admin/charts/bar" component={Bar} />
                                    <Route path="/admin/charts/line" component={Line} />
                                    <Route path="/admin/charts/pie" component={Pie} />
                                    <Redirect to="/admin/home" />
                                </Switch>
                            </Content>
                            <Footer className="footer">
                                推荐使用谷歌浏览器，获取最佳用户体验
                            </Footer>
                        </Layout>
                    </Layout>
                
            )
        }

    }
}

export default connect(
    state =>({userInfo:state.userInfo}),
    {
       
    }
)(Admin)


//下面是使用装饰器语法来进行connect,connect由于要包含Admin组件，所以要
//放在上面
//export default Admin