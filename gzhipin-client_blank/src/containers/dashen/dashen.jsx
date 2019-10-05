/**
 * 这是大神主界面的路由组件
 */
import React from 'react'
import {connect} from 'react-redux'
import {getUserList} from '../../redux/actions'

import UserList from '../../components/user-list/user-list'

class Dashen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentWillMount(){
        this.props.getUserList('laoban')
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
)(Dashen)
