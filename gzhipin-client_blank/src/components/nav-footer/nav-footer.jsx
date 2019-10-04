import React from 'react'
import PropTypes from 'prop-types'
import { TabBar } from 'antd-mobile'
import {withRouter} from 'react-router-dom'


// 在非路由组件使用路由组件的api
// withRoute()
class NavFooter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    static propTypes = {
        navList: PropTypes.array.isRequired
    }
    render() {
        let { navList } = this.props
        // 对数组进行过滤，过滤掉hide为true的项目
        navList = navList.filter(item => !item.hide)
        const pathname = this.props.location.pathname
        return (
            <TabBar>
                {navList.map((item, index) => (
                    <TabBar.Item 
                        key={item.path} 
                        title={item.text} 
                        icon={{uri: require(`./images/${item.icon}.png`)}}
                        selectedIcon={{uri: require(`./images/${item.icon}-selected.png`)}}
                        selected={pathname === item.path}
                        onPress={()=> this.props.history.replace(item.path)}
                    />
                
                ))}

            </TabBar>
        )
    }
}
// 内部会向组件传入一些路由组件特有的属性：history、location、math
export default withRouter(NavFooter)  //向外暴露withRouter包装产生的组件
