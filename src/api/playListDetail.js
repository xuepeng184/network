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

//获取歌曲url
export const reqGetSongUrl=(songId)=>{
  return requests({
    url:`/song/url?id=${songId}`
  })
}

//获取歌曲歌词
export const reqGetSongLyric=(songId)=>{
  return requests({
    url:`/lyric?id=${songId}`
  })
}

//获取歌单评论
export const reqGetListComment=(id)=>{
  return requests({
    url:`/comment/playlist?id=${id}&limit=50`
  })
}