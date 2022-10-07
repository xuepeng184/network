import requests from './request.js'

//获取全部榜单
export const reqGetAllTop=()=>{
  return requests({
    url:'/toplist'
  })
}

//获取歌单
export const reqGetTopSong=(id)=>{
  return requests({
    url:`/playlist/track/all?id=${id}&limit=5`
  })
}