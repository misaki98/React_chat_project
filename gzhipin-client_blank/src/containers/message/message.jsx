/**
 * 消息界面
 */
import React from 'react'
import { connect } from 'react-redux'
import { List, Badge } from 'antd-mobile'

const Item = List.Item
const Brief = List.Item.Brief

class Message extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    /**
     * 对chatmsg进行分组并保存，得到每个组的lastMsg组成的数组
     * 1. 找出每个聊天的lastMsg，使用对象容器保存{chat_id:lastMsg}
     * 2. 得到所有lastMsg对象组成的数组
     * 3. 对数组进行排序（根据时间进行降序排序）
     */
    getLastMsgs = (chatMsg, userid) => {
        const lastMsgObjects = {}
        chatMsg.forEach(msg => {
            // 对msg进行个体的统计
            if(msg.to === userid && !msg.read){
                msg.unReadCount = 1
            }else{
                msg.unReadCount = 0
            }
           

            const chatId = msg.chat_id //当前这组消息的标识ID
            let lastMsg = lastMsgObjects[chatId]  // 获取以保存的当前组的lastMsg
            if (!lastMsg) {
                // 当前Msg就是所在组的LastMsg
                lastMsgObjects[chatId] = msg
            } else {
                const unReadCount = lastMsgObjects[chatId].unReadCount  // 保存已经统计的未读数量
                // 如果Msg比lastMsg还要新，就更新msg为lastMsg
                if (msg.create_time > lastMsg.create_time) {
                    lastMsgObjects[chatId] = msg
                }
                lastMsgObjects[chatId].unReadCount = unReadCount + msg.unReadCount //累加并保存在最新的lastMsg上
            }
        })
        const lastMsgs = Object.values(lastMsgObjects)
        lastMsgs.sort(function (m1, m2) {  //如果结果<0，m1在前 我们希望前面是大的数，后面是小的数
            return m2.create_time - m1.create_time
        })
        return lastMsgs
    }
    render() {
        const { user } = this.props
        const { users, chatMsg } = this.props.chat
        // 对chatMsg进行分组，按chat_id进行分组
        const lastMsgs = this.getLastMsgs(chatMsg, user._id)
        return (
            <List style={{ margin: '50px 0' }}>
                {
                    lastMsgs.map(item => {
                        const targetUserId = item.to === user._id ? item.from : item.to //得到目标用户的ID
                        const targetUser = users[targetUserId]  //得到目标用户的信息
                        return (
                            <Item key={item._id} extra={<Badge text={item.unReadCount} />}
                                thumb={targetUser.header ? require(`../../assets/images/${targetUser.header}.png`) : null}
                                arrow='horizontal'
                                onClick={() => this.props.history.push(`/chat/${targetUserId}`)}
                            > {targetUser.username}
                                <Brief>{item.content}</Brief>
                            </Item>
                        )
                    })
                }
            </List>

        )
    }
}
export default connect(
    state => ({ user: state.user, chat: state.chat }),
    {}
)(Message)