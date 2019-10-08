/**
 * 显示指定用户列表的UI组件
 */
import React from 'react'
import PropTypes from 'prop-types'
import { WingBlank, WhiteSpace, Card } from 'antd-mobile'
import {withRouter} from 'react-router-dom'

class UserList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    static propTypes = {
        userlist: PropTypes.array.isRequired
    }


    render() {
        return (
            <WingBlank style={{marginBottom:50, marginTop:50}}>
                {
                    this.props.userlist.map(user => (
                        <div key={user._id}>
                            <WhiteSpace />
                            <Card onClick={()=> this.props.history.push(`/chat/${user._id}`)}>
                                <Card.Header thumb={require(`../../assets/images/${user.header? user.header : '头像1'}.png`)} extra={user.username}></Card.Header>
                                <Card.Body>
                                    <div>职位：{user.post}</div>
                                    {user.company ? <div>公司：{user.company}</div> : null}
                                    {user.salary ? <div>月薪：{user.salary}</div> : null}
                                    <div>描述：{user.info}</div>
                                </Card.Body>
                            </Card>
                        </div>
                    ))
                }
            </WingBlank>
        )
    }
}

export default withRouter(UserList)