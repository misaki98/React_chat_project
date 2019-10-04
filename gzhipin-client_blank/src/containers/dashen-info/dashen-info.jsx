/**
 * 老板信息完善的路由容器组件
 */
import React from 'react'
import {
    NavBar,
    List,
    InputItem,
    TextareaItem,
    WhiteSpace,
    Button,
} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import HeaderSelector from '../../components/header-selector/header-selector'

import {updateUser} from '../../redux/actions'

class DashenInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            header:'',
            post:'',
            info:''
        }
    }

    handleChange = (name, value) => {
        this.setState({
            [name]: value
        })
    }
    // 更新header状态
    setHeader = (header) => {
        this.setState({
            header
        })
    }

    save = () => {
        this.props.updateUser(this.state)
    }


    render() {
        // 如果信息已经完善，自动重定向到对应的主界面
        const {header, type} = this.props.user
        if(header) {
            // 代表信息已经完善了
            const path = type === 'dashen' ? '/dashen' : '/laoban'
            return <Redirect to={path} />
        }
        
        return <div>
            <NavBar>大神信息完善</NavBar>
            <HeaderSelector setHeader={this.setHeader}/>
            <List>
                <WhiteSpace />
                <InputItem placeholder='请输入职位' onChange={val => {this.handleChange('post', val)}}>求职岗位:</InputItem>
                <WhiteSpace />
                <TextareaItem 
                    placeholder='请输入个人介绍'
                    title="个人介绍:" 
                    rows={3}
                    onChange={val => {this.handleChange('info', val)}}
                ></TextareaItem>
                <WhiteSpace />
                <Button type="primary" onClick={this.save}>保&nbsp;&nbsp;&nbsp;存</Button>
            </List>
        </div>
    }
}

export default connect(
    state => ({user: state.user}),
    {updateUser} //在这里放action函数
)(DashenInfo)

