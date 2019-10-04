/**
 * 这是老板主界面的路由组件
 */
import React from 'react'
import {connect} from 'react-redux'

class Laoban extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return <div>
            Laoban
        </div>
    }
}
export default connect(
    state => ({}),
    {}
)(Laoban)
