import React from 'react'
import { connect } from 'react-redux'
import { NavBar, List, InputItem, Grid, Icon } from 'antd-mobile'
import QueueAnim from 'rc-queue-anim'
import { sendMsg, readMsg } from '../../redux/actions'
const Item = List.Item

class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            content: '',
            isShow: false  //是否显示表情列表
        }
    }
    // 在组件第一次render之前回调
    componentWillMount() {
        // 初始化表情列表数据
        const emojis = ['😃', '😀', '🤣', '🙃', '😃', '😀', '🤣', '🙃', '😃', '😀', '🤣', '🙃', '😃', '😀', '🤣', '🙃',
            '😃', '😀', '🤣', '🙃', '😃', '😀', '🤣', '🙃', '😃', '😀', '🤣', '🙃', '😃', '😀', '🤣', '🙃',
            '😃', '😀', '🤣', '🙃', '😃', '😀', '🤣', '🙃', '😃', '😀', '🤣', '🙃', '😃', '😀', '🤣', '🙃',
            '😃', '😀', '🤣', '🙃', '😃', '😀', '🤣', '🙃', '😃', '😀', '🤣', '🙃', '😃', '😀', '🤣', '🙃'
        ]
        this.emojis = emojis.map(item => ({ text: item }))
    }

    componentDidMount() {
        // 初始化显示列表
        window.scrollTo(0, document.body.scrollHeight)
        // 在这里向后台发请求更新未读消息的数量
        const targetId = this.props.match.params.userid
        const userid = this.props.user._id
        this.props.readMsg(targetId, userid)
    }

    componentDidUpdate() {
        // 初始化显示列表
        window.scrollTo(0, document.body.scrollHeight)
    }
    componentWillUnmount() {
        const targetId = this.props.match.params.userid
        const userid = this.props.user._id
        this.props.readMsg(targetId, userid)
    }


    handleSend = () => {
        const from = this.props.user._id
        const to = this.props.match.params.userid
        const content = this.state.content.trim()
        // 发送请求
        if (content) {
            this.props.sendMsg({ from, to, content })
        }
        // 清除输入的数据
        this.setState({
            content: '',
            isShow: false
        })
    }

    toggleShow = () => {
        this.setState({ isShow: !this.state.isShow })
        if (!this.state.isShow) {
            // 异步手动派发一个resize事件
            setTimeout(() => { window.dispatchEvent(new Event('resize')) }, 0)
        }
    }
    render() {
        const { user } = this.props
        const { users, chatMsg } = this.props.chat

        // 计算当前聊天的ID
        const meId = user._id
        if (!users[meId]) {
            return null
        }
        const targetId = this.props.match.params.userid
        const chatId = [meId, targetId].sort().join('_')
        // 对chatMsg进行过滤
        const msgs = chatMsg.filter(msg => msg.chat_id === chatId)
        // 得到目标用户的header图片对象
        const header = users[targetId].header
        const targetIcon = header ? require(`../../assets/images/${header}.png`) : null
        return (
            <div id='chat-page'>
                <NavBar icon={<Icon type='left' />}
                    className='newnav-bar'
                    onLeftClick={() => this.props.history.goBack()}
                >{users[targetId].username}</NavBar>
                <List style={{ margin: '50px 0' }}>
                    <QueueAnim type='left' >
                        {
                            msgs.map(msg => {
                                if (msg.to === meId) { //别人发给我的消息
                                    return <Item key={msg._id} thumb={targetIcon}>{msg.content}</Item>
                                } else { //我发的消息
                                    return <Item key={msg._id} className='chat-me' extra='我'>{msg.content}</Item>
                                }
                            })
                        }
                    </QueueAnim>

                </List>
                <div className='am-tab-bar'>
                    <InputItem placeholder="请输入"
                        onFocus={() => this.setState({ isShow: false })}
                        value={this.state.content}
                        onChange={val => this.setState({ content: val })}
                        extra={
                            <span>
                                <span style={{ marginRight: '5px' }} onClick={this.toggleShow}>😀</span>
                                <span onClick={this.handleSend}>发送</span>
                            </span>
                        } />
                    {
                        this.state.isShow ? (<Grid data={this.emojis}
                            columnNum={8}
                            carouselMaxRow={4}
                            isCarousel={true} //是否有轮播效果
                            onClick={(item) => {
                                this.setState({ content: this.state.content + item.text }
                                )
                            }} />) : null
                    }
                </div>
            </div>
        )
    }
}
export default connect(
    state => ({ user: state.user, chat: state.chat }),
    { sendMsg, readMsg }
)(Chat)