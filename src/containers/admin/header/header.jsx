import React, { Component } from 'react';
import {FullscreenOutlined,FullscreenExitOutlined} from '@ant-design/icons';
import {Modal,Button} from 'antd'
import screenfull from 'screenfull'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom';
import menuList from '../../../config/menuCofig.js';
import dayjs from 'dayjs'
import {createDeleteUserAction} from '../../../redux/action/login'
import './css/header.css'

const { confirm } = Modal;
/* @connect(
    state =>({userInfo:state.userInfo}),
    {
        deleteUser: createDeleteUserAction
    }
) */

 class Header extends Component {
    state = {
        isFull:false,
        date:dayjs().format('YYYY 年 MM月DD日 HH:mm:ss'),
        title:''
    }
    //组件一挂载就显示时间，然后设定定时器
    componentDidMount(){
        setInterval(() => {
            this.setState({date:dayjs().format('YYYY 年 MM月DD日 HH:mm:ss')})
        }, 1000);
        //console.log(this.props)
        //刷新的时候，调用获取标题头
        let title = this.getTitle();
        this.setState({title})

    }



    //这个函数用来控制全屏的图标
    fullscreen = () => {
        let isFull = !this.state.isFull
        this.setState({isFull})
        screenfull.toggle();
    }

    //退出登陆
    quit = () => {
        confirm({
            content: "确定要退出登录吗",
            okText:"确定",
            cancelText:"取消",
            onOk:() => {
                this.props.deleteUser()
            },
            onCancel() {
              
            },
          });
        
    }

    //获取到头部的标题。即点击左边哪个菜单头部就显示什么菜单
    getTitle = () => {
        let keyname = this.props.location.pathname.split('/').reverse()[0]
        let title = ''  //先提前定义好，因为forEach没有return
        menuList.forEach((item) => {  //forEach里面不能写return,因为外边接不到
            if(item.children instanceof Array){
               let tmp = item.children.find((items) => {
                   return items.key === keyname
               })
               if(tmp) title = tmp.title
            }else{
                if(item.key === keyname){
                    title = item.title
                }
            }
        })
        return title    
       
    }
    render() {
        const {isFull} = this.state
       
        return (
            <header className="header">
                <div className="header-top">
                    <Button size="small" onClick={this.fullscreen}>
                    {isFull?  <FullscreenExitOutlined /> : <FullscreenOutlined />}
                    
                    </Button>       
                    <span className="username">欢迎，{this.props.userInfo.username}</span>               
                  <Button type="link" onClick={this.quit}>退出登录</Button>
                </div> 
                <div className="header-bottom">
                    <div className="header-bottom-left">
                    {/* 本页面获取一次title，同时在redux中保存一份title，一旦刷新
                    redux中的title就会被清空，然后用本页面获取的title */}
                      {this.props.saveTitle || this.state.title}
                    </div>
                    <div className="header-bottom-right">
                       {this.state.date}
                        <img src="" alt="天气" />
                        晴
                    </div>
                </div> 
            </header>
        );
    }
}

export default connect(
    state =>({userInfo:state.userInfo,
              saveTitle:state.saveTitle
    }),
    {
        deleteUser: createDeleteUserAction
    }
)(withRouter(Header))    //withRouter可以让一般组件具有路由组件的API
//export default Header



