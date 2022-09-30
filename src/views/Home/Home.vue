<template>
  <div class="home">
    <!-- 顶部导航区域 -->
    <div class="top_nav">
      <TopNav></TopNav>
    </div>
    <!-- 路由展示区域 -->
    <router-view></router-view>
    <!-- 底部的播放器区域 -->
    <!-- <div class="bottom_aplayer"> -->
      <!-- <Aplayer></Aplayer> -->
    <!-- </div> -->
  </div>
</template>

<script>
//引入音乐播放器插件
import Aplayer from "vue-aplayer";
import TopNav from "../../components/TopNav";
export default {
  name: "Home",
  components: {
    TopNav,
    Aplayer,
  },
  data() {
    return {
      
    }
  },
};
</script>

<style lang="less" scoped>
.home {
  width: 1250px;
  height: 100vh;
  .top_nav {
    margin-left: 30px;
  }
  .bottom_aplayer{
    height: 90px;
    position: fixed;
    bottom: 0px;
    z-index: 9999;
    width: 1430px;
    background-color: pink;
    margin-left: -220px;
    border-radius: 10px;
  }
}
</style>