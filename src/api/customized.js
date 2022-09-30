import requests from './request.js'

//获得推荐歌曲
export const reqGetCustomized=()=>{
  return requests({
    url:'/personalized?limit=50'
  })
}