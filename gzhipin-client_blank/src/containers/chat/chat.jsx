import React from 'react'
import { connect } from 'react-redux'
import { NavBar, List, InputItem } from 'antd-mobile'
import { sendMsg } from '../../redux/actions'
const Item = List.Item

class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            content: ''
        }
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
            content: ''
        })
    }
    render() {
        const {user} = this.props
        const {users, chatMsg} = this.props.chat

        // 计算当前聊天的ID
        const meId = user._id
        if(!users[meId]){
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
                <NavBar>{users[targetId].username}</NavBar>
                <List>
                    {
                        msgs.map(msg =>{
                            if(msg.to === meId){ //别人发给我的消息
                                return <Item key={msg._id} thumb={targetIcon}>{msg.content}</Item>
                            }else{ //我发的消息
                                return <Item key={msg._id} className='chat-me' extra='我'>{msg.content}</Item>
                            }
                        })
                    }
                </List>
                <div className='am-tab-bar'>
                    <InputItem placeholder="请输入"
                        value={this.state.content}
                        onChange={val => this.setState({ content: val })}
                        extra={<span onClick={this.handleSend}>发送</span>} />
                </div>
            </div>
        )
    }
}
export default connect(
    state => ({user: state.user, chat: state.chat}),
    { sendMsg }
)(Chat)