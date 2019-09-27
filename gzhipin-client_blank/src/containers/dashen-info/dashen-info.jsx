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

import HeaderSelector from '../../components/header-selector/header-selector'

class DashenInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return <div>
            <NavBar>大神信息完善</NavBar>
            <HeaderSelector />
            <List>
                <WhiteSpace />
                <InputItem placeholder='请输入职位'>求职岗位:</InputItem>
                <WhiteSpace />
                <TextareaItem placeholder='请输入个人介绍' title="个人介绍:" rows={3}></TextareaItem>
                <WhiteSpace />
                <Button type="primary">保&nbsp;&nbsp;&nbsp;存</Button>
            </List>
        </div>
    }
}

export default connect(
    state => ({}),
    {} //在这里放action函数
)(DashenInfo)

