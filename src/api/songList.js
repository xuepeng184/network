//这是歌单页面相关的请求

import requests from './request.js'

//获取热门歌单分类
export const reqGetCategoryHot=()=>{
  return requests({
    url:'/playlist/hot'
  })
}

//获取歌单
export const reqGetList=(limit,cat,offset)=>{
  return requests({
    url:`/top/playlist?limit=${limit}&cat=${cat}&offset=${offset}`
  })
}

// 精品歌单
export function reqGetFineList(limit, cat) {
  return requests({
      url: `/top/playlist/highquality?limit=${limit}&cat=${cat}`
  })
}