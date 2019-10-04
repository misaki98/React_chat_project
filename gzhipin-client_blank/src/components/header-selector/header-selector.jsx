/**
 * 用来选择用户头像的UI组件
 */
import React from 'react'
import {List, Grid} from 'antd-mobile'
import PropTypes from 'prop-types'

export default class HeadSelector extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            icon: null //图片对象，默认无
        }
        this.Headerlist = []
        for(let i = 0; i < 20; i++){
            this.Headerlist.push({
                text: '头像'+(i+1),
                icon: require(`../../assets/images/头像${i+1}.png`) //不能使用import，使用commonjs动态加载头像
            })
        }
    }

    static propTypes = {
        setHeader: PropTypes.func.isRequired
    }

    handleClick = ({text, icon}) => {
        // 更新当前组件状态
        this.setState({
            icon
        })
        // 更新父组件状态
        this.props.setHeader(text)
    }

    render() {
        // 头部
        const icon = this.state.icon
        const listHeader = !icon ? '请选择头像' : (<div>已选择头像:<img src={icon} alt=""/></div>)
        return <div>
            <List renderHeader={()=> listHeader}>
                <Grid data={this.Headerlist} 
                        columnNum={5}
                        onClick={this.handleClick} ></Grid>
            </List>
        </div>
    }
}
