import React, { Component } from 'react';
import { Menu } from 'antd';
/* import {
    AppstoreOutlined,
   // MenuUnfoldOutlined,
   // MenuFoldOutlined,
   HomeOutlined,
   UserOutlined,
   SafetyOutlined,
   AreaChartOutlined,
   BarsOutlined,
   ToolOutlined
    
  } from '@ant-design/icons'; */
  import * as Icon from '@ant-design/icons'
  import { Link ,withRouter} from 'react-router-dom';
  import {connect} from 'react-redux'
  import menuList from '../../../config/menuCofig.js'
  import logo from '../../../static/images/logo.jpg'
  import './left_nav.css'
  import {createSaveTitleAction} from '../../../redux/action/menu-action'
  const { SubMenu } = Menu;

 class LeftNav extends Component {
   




    //定义一个方法，用来生成没有下级的菜单，这样就可以直接调用这个方法，写二级菜单的
    //时候，把这个方法包起来就好了
    createMenu = (target) => {  //这个函数：传的参数是谁就遍历谁
        return target.map((item) => {
            const icon = React.createElement(Icon[item.icon], {}, null);
            //判断有没有二级菜单
            if(!item.children){
                return (
                    <Menu.Item key={item.key} icon={icon} onClick={()=>{this.props.saveTitle(item.title)}} >
                        <Link to={item.path}>{item.title} </Link>     
                    </Menu.Item>
                )
           
            }else{
                return(
                    <SubMenu key={item.key} icon={icon} title={item.title}> 
                        {this.createMenu(item.children)}       
                  </SubMenu>
                )
            }
        })
    }

    render() {
        
        return (
            <div>  
            <header className="left-header">
            <img src={logo} alt="" /> 
            <h1>商品后台管理</h1>
            </header>

            <Menu
            //不管选中哪个菜单一刷新就会回到home，所以要对defaultSelectedKeys就行设置
            //从props中拿到pathname,刷新就不会回到home了
            //拿到的pathname按照/分隔开，然后reverse调转拿到原本末尾的地址
            //split的作用是按/把字符串分隔开然后变成一个数组
              defaultSelectedKeys={this.props.location.pathname.split('/').reverse()[0]}
            
            //上面的代码是用来在刷新之后还能选中之前的菜单，但是还存在的问题就是如果选中的是
            //子菜单，父菜单在刷新之后不会展开，因此用下面这行代码来使父菜单展开
            //直接把路径写上可以，也可以对路径处理一下，把前2个给删除掉就好了
              //defaultOpenKeys={this.props.location.pathname}
              defaultOpenKeys={this.props.location.pathname.split('/').splice(2)}
              mode="inline"
              theme="dark"
            >
              {
                this.createMenu(menuList)
              }
            </Menu>
          </div>
        );
    }
}

export default connect(
    state => ({}),
    {
        saveTitle: createSaveTitleAction
    }
)(withRouter(LeftNav))
