<template>
  <div class="latestSong">
    <div class="head">
      <div
        class="head_left box"
        @click="goNewSong"
        :class="{ active: activeRouter == 1 }"
      >
        新歌速递
      </div>
      <div
        class="head_right box"
        @click="goNewDisc"
        :class="{ active: activeRouter == 2 }"
      >
        新碟上架
      </div>
    </div>
    <!-- 这是主要部分 -->
    <div class="main">
      <!-- 这是分类部分 -->
      <div class="classify">
        <div class="classify_left">
          <ul>
            <li
              v-for="item in classify"
              :key="item"
              @click="classifyChange(item)"
              :class="{ active: activeClassify == item }"
            >
              {{ item }}
            </li>
          </ul>
        </div>
        <div class="classify_right" v-show="$route.meta.isShow">
          <div class="play right_box">
            <img src="@/assets/bofang.jpg" alt="" />
            <span>播放全部</span>
          </div>
          <div class="collect right_box">
            <img src="@/assets/collect.png" alt="" />
            <span>收藏全部</span>
          </div>
        </div>
      </div>
      <!-- 路由展示部分 -->
      <div class="router">
        <router-view ref="rou" :classify="activeClassify"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LatestSong",
  data() {
    return {
      //分类的列表
      classify: ["全部", "华语", "欧美", "韩国", "日本"],
      //显示哪个路由 1代表新歌 2代表新碟
      activeRouter:1,
      //选中的分类
      activeClassify:'全部',
    };
  },
  created(){
    sessionStorage.setItem('classify',this.activeClassify)
  },
  mounted(){
    this.activeClassify=sessionStorage.getItem('classify')
    if(sessionStorage.getItem('latestActive')=='/home/latestsong/newsong'){
      this.activeRouter=1
    }else{
      this.activeRouter=2
    }
    sessionStorage.setItem("navActive",'/home/latestsong');
    
    
  },
  methods:{
    goNewSong(){
      this.$router.push('/home/latestsong/newsong')
      this.activeRouter=1
    },
    goNewDisc(){
      this.$router.push('/home/latestsong/newdisc')
      this.activeRouter=2
    },
    //改变分类的回调
    classifyChange(item){
      this.activeClassify=item
      sessionStorage.setItem('classify',this.activeClassify)
    }
  }
};
</script>

<style lang="less" scoped>
.latestSong {
  position: relative;
  left: 50px;
  .head {
    width: 230px;
    height: 30px;
    border: 1px solid #bbbbbb;
    margin: 30px auto;
    border-radius: 15px;
    display: flex;
    .box {
      cursor: pointer;
      width: 115px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      font-size: 13px;
      border-radius: 15px;
    }
    div.active {
      background-color: #bbb;
      color: #fff;
    }
  }
  .main {
    width: 1160px;
    // padding-bottom: 110px;
    .classify {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      .classify_left {
        ul {
          display: flex;
          margin: 0;
          li {
            cursor: pointer;
            list-style: none;
            font-size: 13px;
            color: #676767;
            margin: 0 10px;
            height: 30px;
            line-height: 30px;
          }
          li.active {
            font-weight: 600;
            color: #373737;
            font-size: 14px;
          }
        }
      }
      .classify_right {
        display: flex;
        .right_box {
          cursor: pointer;
          margin-right: 15px;
          font-size: 12px;
          display: flex;
          height: 25px;
          border: 1px solid #d8d8d8;
          border-radius: 15px;
          padding: 0 8px;
        }
        .play {
          height: 25px;
          line-height: 25px;
          img {
            width: 25px;
            height: 17px;
            position: relative;
            top: 4px;
          }
          span {
            opacity: 0.9;
          }
        }
        .collect {
          img {
            width: 25px;
            height: 20px;
            position: relative;
            top: 1px;
          }
          span {
            display: block;
            height: 25px;
            line-height: 25px;
          }
        }
      }
    }
  }
}
</style>