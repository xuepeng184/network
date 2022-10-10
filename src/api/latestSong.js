import requests from './request'

//新歌速递
export const reqGetLatestSong=(type)=>{
  return requests({
    url:`/top/song?type=${type}`
  })
}

//新碟上架  本周新碟
export const reqGetLatestDisc=(area)=>{
  return requests({
    url:`/top/album?area=${area}`
  })
}

