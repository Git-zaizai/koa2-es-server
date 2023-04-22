/**
 * 不需要验证的路由
 * */

export const webUrlToken = ['/login']

export const wxUrlToken = ['/wx/upload']

export default [...webUrlToken, ...wxUrlToken]
