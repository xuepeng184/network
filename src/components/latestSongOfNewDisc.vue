<template>
  <div class="newDisc">
    <div class="disc_left">
      <p v-show="showWeek">本周新碟</p>
      <div v-show="!showWeek">
        <p class="p1">{{ nowMonth }}</p>
        <i class="p3">/</i>
        <p class="p2">{{ nowYear }}</p>
      </div>
    </div>
    <div class="disc_main">
      <div class="main_item" v-for="item in showList" :key="item.id">
        <img v-lazy="item.picUrl" alt="" />
        <p>{{ item.name }}</p>
        <p>{{ item.artist.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { reqGetLatestDisc } from "@/api/latestSong";
export default {
  name: "LatestSongOfNewDisc",
  props: ["classify"],
  data() {
    return {
      //地区
      area: "ALL",
      end: 60,
      showList: [],
      nowYear: "",
      nowMonth: "",
      showWeek: true,
    };
  },
  created(){
    this.classify=sessionStorage.getItem('classify')
  },
  mounted() {
    this.nowYear = new Date().getFullYear();
    this.nowMonth = new Date().getMonth() + 1;
    sessionStorage.setItem("latestActive", this.$route.path);
    this.GetLatestDisc();
    window.addEventListener("scroll",()=>{
        //窗口高度
        let windowHeight = document.documentElement.clientHeight|| document.body.clientHeight;
        //滚动高度
        let myScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        //页面高度
        let documentHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        // console.log(windowHeight,myScrollTop,documentHeight);
        if(windowHeight + myScrollTop >= (documentHeight-150)){
            this.end+=30
            this.GetLatestDisc()
            // console.log('底部');
        }
    })
  },
  methods: {
    async GetLatestDisc() {
      let myClassify=sessionStorage.getItem('classify')
      switch (myClassify) {
        case "全部":
          this.area = "ALL";
          break;
        case "华语":
          this.area = "ZH";
          break;
        case "欧美":
          this.area = "EA";
          break;
        case "日本":
          this.area = "JP";
          break;
        case "韩国":
          this.area = "KR";
          break;
      }
      let result = await reqGetLatestDisc(this.area);
      console.log("新碟上架", result);
      if (result.weekData) {
        this.showList = result.weekData;
        this.showWeek = true;
      } else {
        this.showList = result.monthData.slice(0, this.end);
        this.showWeek = false;
      }
    },
  },
  watch: {
    classify() {
      this.GetLatestDisc();
    },
  },
};
</script>

<style scoped lang="less">
.newDisc {
  display: flex;
  padding-bottom: 110px;
  .disc_left {
    width: 50px;
    font-size: 26px;
    margin-right: 20px;
    position: relative;
    p {
      margin: 0;
    }
    .p1 {
      margin-top: 15px;
      font-size: 18px;
      opacity: 0.9;
      position: relative;
      left: 10px;
    }
    .p3 {
      font-size: 24px;
      position: absolute;
      top: 20px;
      left: 13px;
    }
    .p2 {
      font-size: 12px;
      margin-left: 23px;
      margin-top: -7px;
    }
  }
  .disc_main {
    display: flex;
    flex-wrap: wrap;
    .main_item {
      cursor: pointer;
      width: 170px;
      height: 220px;
      margin-right: 40px;
      margin-bottom: 18px;
      img {
        width: 170px;
        height: 170px;
        border-radius: 10px;
      }
      p {
        margin: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      p:nth-of-type(1) {
        font-size: 15px;
      }
      p:nth-of-type(2) {
        font-size: 12.5px;
        opacity: 0.4;
        margin-top: 5px;
      }
    }
  }
}
</style>