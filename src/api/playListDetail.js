import requests from './request.js'

//获取歌单详情
export const reqGetWholeList=(id)=>{
  return requests({
    url:`/playlist/detail?id=${id}`
  })
}

//获取全部歌曲
export const reqGetAllSong=(id)=>{
  return requests({
    url:`/playlist/track/all?id=${id}`
  })
}

// 歌单创建者
export const reqGetUser=(userId)=> {
  return requests({
    url:`/user/detail?uid=${userId}`
  })
}

//歌单详情动态
export const reqGetListDetail=(id)=>{
  return requests({
    url:`/playlist/detail/dynamic?id=${id}`
  })
}