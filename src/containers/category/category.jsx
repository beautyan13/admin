import React, { Component } from 'react';
import {Card,Button,Table,Modal,Form,Input,message} from 'antd';
import {PlusOutlined} from '@ant-design/icons'
import {reqCategoryList,reqAddCategory} from '../../api';
import { PAGE_SIZE } from '../../config';


export default class Category extends Component {

    state = {
        categoryList:[]  ,  //商品分类列表
        visible:false,  //弹窗是否显示
        operationType:'',  //操作类型，是添加还是修改
        isLoading:true, //是否在加载中
        modalCurrentValue:'' //弹窗中input中的值，添加input没有值，修改input中是当前分类的名称
    }
    formRef = React.createRef()
    //获取商品列表
    getCategoryList = async () => {
        let result = await reqCategoryList()
        this.setState({isLoading:false})
        const {status,data,msg} = result
        if(status === 0){
            this.setState({categoryList:data.reverse()}) //reverse()反转，让后添加的在前面
        }else{      
            message.error(msg,1)  //提示错误并且1s之后消失
        }
        
    }
    
    componentDidMount(){
        //组件一挂载就发请求获取分类列表
        this.getCategoryList()
       
    }

    //用于展示弹窗
    showAdd = () => {
        this.setState({visible:true,operationType:'添加分类'})
    };
    showUpdate = async (item) => {
        //console.log('itme',item);
        const {name} = item
       //下面的setState是异步操作，如果没有await可能会找不到modalCurrentValue,加上await就setState完成之后再
       //调用modalCurrentValue就可以调用了
       await this.setState({visible:true,operationType:'修改分类',modalCurrentValue:name})
       console.log("cuo",this.state.modalCurrentValue);
       
    };
    
    //增加商品分类
    toAddcategory = async (values) =>{
        let result = await reqAddCategory(values.categoryName)
        //console.log('result',result)
        const {status,data,msg} = result
        if(status === 0) {  //添加成功
            message.success("添加成功")
            //让新增的商品分类位于第一位
            let categoryList = [...this.state.categoryList]
            categoryList.unshift(data)
            this.setState({categoryList})
            this.setState({visible:false})
             //重置表单
             this.formRef.current.resetFields()
        }
        else message.error(msg,2)

    }
    
   
    handleOk = async() => {
        const {operationType} = this.state 
        const form = this.formRef.current
        //表单的统一验证
        await form.validateFields().then(
          (values) => {
               //console.log("dule",values)
               //如果是添加分类，就执行添加分类的功能
               if(operationType === '添加分类')   this.toAddcategory(values)
               this.setState({visible:false})
              
           }
       ).catch(
           (err) => {
               alert("输入有误 ，请重新输入")
                //重置表单
                form.resetFields()

           }
       )
  
    };
    handleCancel = () => {
        this.setState({visible:false})
        const form = this.formRef.current
        //重置表单
      form.resetFields();
       
    };
   
    render() {
        
        const dataSource = this.state.categoryList
          
          const columns = [
            {
              title: '分类名称',
              dataIndex: 'name',
              key: 'name',
            },
            
            {
              title: '操作',
              //dataIndex: 'address',
              key: 'manage',
              render:(item) => {return <Button type="link" onClick={() => {this.showUpdate(item)}}>修改分类</Button>}, 
              width:'25%',
              align:'center'
            },
          ];
        

        return (
            <div>
            
                <Card  extra={<Button type="primary" icon={<PlusOutlined />} onClick={this.showAdd}>添加</Button> }>
                    <Table 
                    dataSource={dataSource}
                    columns={columns}
                    bordered
                    rowKey="_id"
                    pagination={{pageSize:PAGE_SIZE , showQuickJumper:true} }
                    loading={this.state.isLoading}  //当网速比较慢时，会显示转圈
                    />
                </Card>
                <Modal title = {this.state.operationType}
                       visible={this.state.visible}
                       onOk={this.handleOk} 
                       onCancel={this.handleCancel}
                       okText="确定"
                       cancelText="取消">
                    <Form ref={this.formRef} initialValues={{categoryName: this.state.modalCurrentValue}}>
                    <Form.Item
                       
                        name="categoryName"
                        rules={[
                            {whitespace:true ,required:true, message:'请输入分类名' }, 
                            ]}
                        
                    >
                        <Input placeholder='请输入分类名'  />
                    </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}

