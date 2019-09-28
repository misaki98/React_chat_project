/**
 * 包含所有工具函数
 */

// 通过user.header和user.type来判断路由跳转的路径
// 返回对应的路由路径
export function getRedirectTo(type, header) {
    let path = ''
    if (type === 'laoban') {
        path = '/laoban'
    } else {
        path = '/dashen'
    }
    if(!header){   //没有值才需要完善信息
        path += 'info'
    }
    return path
}