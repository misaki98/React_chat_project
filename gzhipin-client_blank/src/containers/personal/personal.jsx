/**
 * 个人中心界面
 */
import React from 'react'
import { connect } from 'react-redux'
import {
    Result,
    List,
    WhiteSpace,
    Button,
    Modal
} from 'antd-mobile'
import Cookies from 'js-cookie'
import {resetUser} from '../../redux/actions'

class Personal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    logout = () => {
        Modal.alert('退出', '确认退出登录吗', [
            { text: '取消' },
            { 
                text: '确认', 
                onPress: () => { 
                    // 清除所有登录信息
                    Cookies.remove('userid') 
                    this.props.resetUser()
                } 
            }
        ])
    }
    render() {
        const { username, info, header, company, post, salary } = this.props.user
        return (
            <div style={{marginTop:50, marginBottom:50}}>
                <Result img={<img src={require(`../../assets/images/${header}.png`)} style={{ width: 50 }} alt="header" />}
                    title={username} message={company} />
                <List renderHeader={() => '相关信息'}>
                    <List.Item multipleLine>
                        <List.Item.Brief>职位:{post}</List.Item.Brief>
                        <List.Item.Brief>简介:{info}</List.Item.Brief>
                        {salary ? <List.Item.Brief>薪资: {salary}</List.Item.Brief> : null}
                    </List.Item>
                </List>
                <WhiteSpace />
                <List>
                    <Button type='warning' onClick={this.logout}>退出登录</Button>
                </List>
            </div>
        )
    }
}
export default connect(
    state => ({ user: state.user }),
    {resetUser}
)(Personal)