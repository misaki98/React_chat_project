/**
 * 用来选择用户头像的UI组件
 */
import React from 'react'
import {List, Grid} from 'antd-mobile'

export default class HeadSelector extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.Headerlist = []
        for(let i = 0; i < 20; i++){
            this.Headerlist.push({
                text: '头像'+(i+1),
                icon: require(`../../assets/images/头像${i+1}.png`) //不能使用import，使用commonjs动态加载头像
            })
        }
    }
    
    render() {
        // 头部
        const listHeader = '请选择头像'
        return <div>
            <List renderHeader={()=> listHeader}>
                <Grid data={this.Headerlist} columnNum={5}></Grid>
            </List>
        </div>
    }
}
