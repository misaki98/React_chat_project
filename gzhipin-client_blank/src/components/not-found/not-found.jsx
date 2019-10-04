/**
 * 找不到页面时展示的组件
 */
import React from 'react'
import {Button} from 'antd-mobile'

export default class NotFound extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
        <div>
            <div>
                <h2>抱歉，找不到该页面！</h2>
                <Button type="primary" onClick={()=> this.props.history.replace('/')}>回到首页</Button>
            </div>
        </div>
        )
    }
}
