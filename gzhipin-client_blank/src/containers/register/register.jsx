import React from 'react'
import {
    NavBar,
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Button,
    Radio
} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {register} from '../../redux/actions'
import Logo from '../../components/logo/logo'

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '', //用户名数据
            password:'',  //密码
            password2:'',  //确认密码
            type:'laoban' //用户类型
        }
    }


    register = () => {
        this.props.register(this.state)
    }

    // 处理输入数据的改变，更新对于状态的改变
    handleChange = (name, val) =>{
        // 加上[]后，字符串变为变量
        this.setState({
            [name]:val  // 属性名不是name，而是name的值
        })
    }

    toLogin = ()=>{
        this.props.history.replace('/login')
    }
    
    render() {
        const {type} = this.state
        const { msg, redirectTo} = this.props.user
        // 如果重定向有值，就需要重定向到指定的路由
        if(redirectTo){
            return <Redirect to={redirectTo} />
        }
        return (
            <div>
                <NavBar>MiSAKi</NavBar>
                <Logo />
                <WingBlank>
                { msg ? <div className="error-msg">{msg}</div> : null}
                    <List>
                        <WhiteSpace />
                        <InputItem placeholder='请输入用户名' onChange={(val)=>{this.handleChange('username',val)}}>用户名:</InputItem>
                        <WhiteSpace />
                        <InputItem placeholder='请输入密码' type="password" onChange={(val)=>{this.handleChange('password',val)}}>密&nbsp;&nbsp;&nbsp;码:</InputItem>
                        <WhiteSpace />
                        <InputItem placeholder='请确认密码' type="password" onChange={(val)=>{this.handleChange('password2',val)}}>确认密码:</InputItem>
                        <WhiteSpace />
                        <List.Item>
                            <span>用户类型</span>
                            &nbsp;&nbsp;&nbsp;
                            <Radio checked={type === 'dashen'} onChange={()=>{this.handleChange('type','dashen')}}>大神</Radio>
                            &nbsp;&nbsp;&nbsp;
                            <Radio checked={type === 'laoban'} onChange={()=>{this.handleChange('type','laoban')}}>老板</Radio>
                        </List.Item>
                        <WhiteSpace />
                        <Button type="primary" onClick={this.register}>注&nbsp;&nbsp;&nbsp;册</Button>
                        <Button onClick={this.toLogin}>已有账户</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {register}
)(Register)