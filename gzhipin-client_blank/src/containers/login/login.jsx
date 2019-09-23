import React from 'react'
import {
    NavBar,
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Button
} from 'antd-mobile'
import Logo from '../../components/logo/logo'

export default class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '', //用户名数据
            password:'',  //密码
        }
    }


    login = () => {

    }

    // 处理输入数据的改变，更新对于状态的改变
    handleChange = (name, val) =>{
        // 加上[]后，字符串变为变量
        this.setState({
            [name]:val  // 属性名不是name，而是name的值
        })
    }

    toRegister = ()=>{
        this.props.history.replace('/register')
    }
    
    render() {
        return (
            <div>
                <NavBar>MiSAKi</NavBar>
                <Logo />
                <WingBlank>
                    <List>
                        <WhiteSpace />
                        <InputItem placeholder='请输入用户名' onChange={(val)=>{this.handleChange('username',val)}}>用户名:</InputItem>
                        <WhiteSpace />
                        <InputItem placeholder='请输入密码' type="password" onChange={(val)=>{this.handleChange('password',val)}}>密&nbsp;&nbsp;&nbsp;码:</InputItem>
                        <WhiteSpace />

                        <Button type="primary" onClick={this.login}>登&nbsp;&nbsp;&nbsp;录</Button>
                        <Button onClick={this.toRegister}>还没有账户</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}
