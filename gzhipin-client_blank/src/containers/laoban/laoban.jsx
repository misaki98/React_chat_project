/**
 * 这是老板主界面的路由组件
 */
import React from 'react'
import {connect} from 'react-redux'
import {getUserList} from '../../redux/actions'

import UserList from '../../components/user-list/user-list'

class Laoban extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentWillMount(){
        this.props.getUserList('dashen')
    }

    render() {
        return <div>
            <UserList userlist={this.props.userList} />
        </div>
    }
}
export default connect(
    state => ({userList: state.userList}),
    {getUserList}
)(Laoban)
