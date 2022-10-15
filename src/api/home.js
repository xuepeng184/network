import requests from './request'

//获取轮播图
export const reqGetBanner=()=>{
  return requests({
    url:'/banner?type=0',
    method:'get'
  })
}

//获得推荐歌单(未登录的状态)
export const reqGetUnLogRecommendList=()=>{
  return requests({
    url:'/personalized?limit=30'
  })
}

//获取推荐歌单(登录状态)
export const reqGetRecommendList=(cookie)=>{
  return requests({
    url:`/recommend/resource?_t=${new Date().getTime()}`,
    method:'post',
    params:{
      cookie
    }
  })
}

//获取热搜列表(详细状态)
export const reqGetHotSearch=()=>{
  return requests({
    url:'/search/hot/detail'
  })
}