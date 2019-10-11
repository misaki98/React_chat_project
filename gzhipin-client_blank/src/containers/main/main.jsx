import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import Cookies from 'js-cookie'  //可以操作cookie对象 set,remove,get
import {NavBar} from 'antd-mobile'

import LaobanInfo from '../laoban-info/laoban-info'
import DashenInfo from '../dashen-info/dashen-info'
import Dashen from '../dashen/dashen'
import Laoban from '../laoban/laoban'
import Message from '../message/message'
import Personal from '../personal/personal'
import NotFound from '../../components/not-found/not-found'
import NavFooter from '../../components/nav-footer/nav-footer'
import Chat from '../../containers/chat/chat'


import { getRedirectTo } from '../../utils/index'
import { getUser } from '../../redux/actions'

class Main extends React.Component {

    // 给组件对象添加属性
    navList = [ // 包含所有导航组件的相关信息数据
        {
            path: '/laoban', // 路由路径
            component: Laoban,
            title: '大神列表',
            icon: 'dashen',
            text: '大神',
        },
        {
            path: '/dashen', // 路由路径
            component: Dashen,
            title: '老板列表',
            icon: 'laoban',
            text: '老板',
        },
        {
            path: '/message', // 路由路径
            component: Message,
            title: '消息列表',
            icon: 'message',
            text: '消息',
        },
        {
            path: '/personal', // 路由路径
            component: Personal,
            title: '用户中心',
            icon: 'personal',
            text: '个人',
        }
    ]

    constructor(props) {
        super(props)
        this.state = {}
    }
    componentDidMount() {
        // cookie中有userid但redux中没有的时候，在这里发请求
        const userid = Cookies.get('userid')
        const { _id } = this.props.user
        if (userid && !_id) {
            // 发送请求获取user信息
            this.props.getUser()
        }
    }

    render() {
        // 读取cookie中的userid，有或无
        // 如果没有，自动重定向到登录界面

        // 如果有，读取redux中user状态，
        // 如果user没有_id,则向后台发请求获取数据，返回null（不做任何显示）
        // 如果user有_id，直接显示对应页面（当请求根路径的时候，需要计算重定向路径）
        const userid = Cookies.get('userid')
        if (!userid) {
            return <Redirect to='/login' />
        }
        const { user, unReadCount } = this.props
        if (!user._id) {
            return null
        } else {
            let path = this.props.location.pathname
            if (path === '/') {
                // 重定向的函数已经写好了
                path = getRedirectTo(user.type, user.header)
                return <Redirect to={path} />
            }
        }

        const path = this.props.location.pathname
        const currentNav = this.navList.find(nav => nav.path === path)

        if(currentNav){
            // 判断哪个路由需要隐藏
            if(user.type === 'laoban'){
                // 隐藏第二个
                this.navList[1].hide = true
                this.navList[0].hide = ''
            }else{
                // 隐藏第一个
                this.navList[0].hide = true
                this.navList[1].hide = ''
            }
        }

        return (
        <div>
            {currentNav ? <NavBar className="newnav-bar">{currentNav.title}</NavBar> : null}
            <Switch>
                <Route path='/laobaninfo' component={LaobanInfo} />
                <Route path='/dasheninfo' component={DashenInfo} />
                {this.navList.map(item=><Route path={item.path} component={item.component} key={item}/>)}
                <Route path='/chat/:userid' component={Chat}  />
                <Route component={NotFound} />
            </Switch>
            {currentNav ? <NavFooter navList={this.navList} unReadCount={unReadCount}></NavFooter> : null}
        </div>
        )
    }
}

export default connect(
    state => ({ user: state.user, unReadCount: state.chat.unReadCount }),
    { getUser }
)(Main)

/**
 * 1.实现自动登录
 *  现在重开浏览器只有cookie，但redux中没有信息，需要发请求获取到对应user存入redux
 *  如果没有cookie，则重定向去登录界面
 * 2.如果已经登录
 *  需要根据user的type和head进行两重判断，1.信息是否完善 2.是大神还是老板
 */