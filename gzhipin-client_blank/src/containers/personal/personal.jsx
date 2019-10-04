/**
 * 个人中心界面
 */
import React from 'react'
import {connect} from 'react-redux'

class Personal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return <div>
            Personal
        </div>
    }
}
export default connect(
    state => ({}),
    {}
)(Personal)