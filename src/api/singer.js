import requests from './request'
import axios from 'axios'
// 因为要请求本地的数据，所以不能用封装好的requests，因为地址不对
//获取area
export const reqGetArea=()=>{
  return axios.get('json/area.json')
}

//获取type
export const reqGetType=()=>{
  return axios.get('json/type.json')
}

//获取筛选列表
export const reqGetFilter=()=>{
  return axios.get('json/filter.json')
}

//获取歌手分类
export const reqGetSinger=(area,type,initial)=>{
  return requests({
    url:`/artist/list?type=${type}&area=${area}&initial=${initial}`
  })
}