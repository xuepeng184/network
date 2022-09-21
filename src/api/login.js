import requests from './request.js'

//获取二维码key
export const reqGetCodeKey=()=>{
  return requests({
    url:`/login/qr/key?&_t=${new Date().getTime()}`
  })
}

//创建二维码
export const reqCreateCode=(keyCode,qrimg)=>{
  return requests({
    url:`/login/qr/create?key=${keyCode}&qrimg=${qrimg}&_t=${new Date().getTime()}`
  })
}

//获取二维码状态
export const reqGetCodeStatus=(keyCode)=>{
  return requests({
    url:`/login/qr/check?key=${keyCode}&_t=${new Date().getTime()}`
  })
}

//获取登录状态
export const reqGetUserStatus=(cookie)=>{
  return requests({
    url:`/login/status?_t=${new Date().getTime()}`,
    method:'post',
    params: {
      cookie
  }
  })
}

//退出登录
export const reqLogOut=()=>{
  return requests({
    url:'/logout'
  })
}