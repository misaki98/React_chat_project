/**
 * 这是大神主界面的路由组件
 */
import React from 'react'
import {connect} from 'react-redux'

class Dashen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return <div>
            Dashen
        </div>
    }
}
export default connect(
    state => ({}),
    {}
)(Dashen)