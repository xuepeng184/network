<template>
  <div class="recommend">
    <div class="head">
      <span>推荐歌单</span>
      <img src="../assets/right.png" alt="" />
    </div>
    <div class="main">
      <div class="recommend_item" v-for="item in showList" :key="item.id" @click="goPlayList(item.id)">
        <img v-lazy="item.picUrl" alt="" />
        <p>{{ item.name }}</p>
        <span>{{ item.playCount}}</span>
        <span>{{item.playcount}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { reqGetRecommendList, reqGetUnLogRecommendList } from "@/api/home.js";
export default {
  name: "MyRecommend",
  data() {
    return {
      cookie: "",
      //最终展示的歌单列表
      showList: [],
    };
  },
  mounted() {
    this.cookie = sessionStorage.getItem("myCookie");
    if (this.cookie) {
      this.GetRecommendList();
    } else {
      this.GetUnLogRecommendList();
    }
  },
  methods: {
    //没有登陆的获取歌单
    async GetUnLogRecommendList() {
      let result = await reqGetUnLogRecommendList();
      console.log("推荐歌单(未登录)", result);
      if (result.code == 200) {
        this.showList = result.result.slice(0, 10);
        // 对数字进行格式化
        this.showList.map(item=>{
          item.playCount=this.NumberToCommon(item.playCount)
        })
      }
    },
    async GetRecommendList() {
      let result = await reqGetRecommendList(this.cookie);
      console.log("登录后歌单", result);
      if (result.code == 200) {
        this.showList = result.recommend.slice(0, 10);
        // 对数字进行格式化
        this.showList.map(item=>{
          item.playcount=this.NumberToCommon(item.playcount)
        })
      }
    },
    //将数字格式化的函数
    NumberToCommon(num) {
      if (num < 10000) {
        return num;
      } else if (num > 10000 && num < 100000000) {
        let resultNum = (num / 10000).toFixed(0);
        let result = resultNum + "万";
        return result;
      }else{
        let resultNum=(num/100000000).toFixed(0);
        let result=resultNum+'亿';
        return result;
      }
    },
    // 前往歌单详情页
    goPlayList(id){
      this.$router.push({
        name:'PlayListDetail',
        query:{id:id}
      })
    }
  },
  computed: {},
};
</script>

<style lang="less" scoped>
.recommend {
  .head {
    padding: 0 15px;
    line-height: 25px;
    position: relative;
    margin-bottom: 10px;
    span {
      font-weight: 600;
      font-size: 18px;
    }
    img {
      width: 23px;
      height: 20px;
      position: absolute;
      top: 3px;
    }
  }
  .main {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    .recommend_item {
      margin-top: 10px;
      padding: 0 10px;
      width: 215px;
      height: 250px;
      position: relative;
      // background-color: pink;
      img {
        width: 100%;
        height: 205px;
        border-radius: 10px;
      }
      p {
        font-size: 14px;
        margin-top: 0;
        overflow: hidden;
      }
      span {
        font-size: 12px;
        position: absolute;
        top: 5px;
        right: 15px;
        color: #fff;
      }
    }
  }
}
</style>

