/**
 * 管理需要验证的路由
 * */

export const webUrlToken = ['/token']

export const wxUrlToken = ['/wx/upload']

export default [...webUrlToken, ...wxUrlToken]