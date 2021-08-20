import React, { Component } from 'react'
import {Redirect,BrowserRouter,Route, Switch } from 'react-router-dom'
import Login from './containers/login'
import Admin from './containers/admin'
/* import { Button } from 'antd';
import 'antd/dist/antd.css'
import { SearchOutlined } from '@ant-design/icons'; */

export default class App extends Component {
    render() { 
        return (
            <BrowserRouter>  {/* 路由 */}
               <Switch> 
                <Route path='/login' component={Login}></Route>
                <Route path='/admin' component={Admin}></Route>
                <Redirect to='/admin'/>
                </Switch>
            </BrowserRouter>
        )
    }
}
