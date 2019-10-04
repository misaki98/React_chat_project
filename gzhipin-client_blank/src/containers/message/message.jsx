/**
 * 消息界面
 */
import React from 'react'
import {connect} from 'react-redux'

class Message extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return <div>
            Message
        </div>
    }
}
export default connect(
    state => ({}),
    {}
)(Message)