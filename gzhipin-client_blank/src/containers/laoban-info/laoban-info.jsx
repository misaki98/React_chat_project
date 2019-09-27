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
import { connect } from 'react-redux'

import HeaderSelector from '../../components/header-selector/header-selector'

class LaobanInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return <div>
            <NavBar>老板信息完善</NavBar>
            <HeaderSelector />
            <List>
                <WhiteSpace />
                <InputItem placeholder='请输入职位'>招聘职位:</InputItem>
                <WhiteSpace />
                <InputItem placeholder='请输入公司'>公司名称:</InputItem>
                <WhiteSpace />
                <InputItem placeholder='请输入薪资'>职位薪资:</InputItem>
                <WhiteSpace />
                <TextareaItem placeholder='请输入职位要求' title="职位要求:" rows={3}></TextareaItem>
                <WhiteSpace />
                <Button type="primary">保&nbsp;&nbsp;&nbsp;存</Button>
            </List>
        </div>
    }
}

export default connect(
    state => ({}),
    {} //在这里放action函数
)(LaobanInfo)

