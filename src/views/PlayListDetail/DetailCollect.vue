<template>
  <div class="collector">
    <div class="collector_item" v-for="item in collectors" :key="item.userId">
      <div class="img">
        <img v-lazy="item.avatarUrl" alt="">
      </div>
      <div class="name">
        <div class="username">{{item.nickname}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import {reqGetCollector} from '@/api/playListDetail';
export default {
  name:'DeatilCollect',
  data() {
    return {
      collectors:[]
    }
  },
  mounted(){
    this.getCollector()
  },
  methods:{
    async getCollector(){
      let id=sessionStorage.getItem('listId')
      let result=await reqGetCollector(id)
      console.log('歌单收藏者',result);
      if(result.code==200){
        this.collectors=result.subscribers
      }
    }
  }
}
</script>

<style lang="less" scoped>
.collector{
  width: 1120px;
  display: flex;
  flex-wrap: wrap;
  .collector_item{
    width: 365px;
    height: 140px;
    display: flex;
    padding-left: 50px;
    box-sizing: border-box;
    .img{
      width: 90px;
      height: 90px;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
      img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .name{
      margin-left: 10px;
      height: 140px;
      .username{
        height: 50%;
        line-height: 100px;
        font-size: 14px;
      }
    }
  }
}
</style>