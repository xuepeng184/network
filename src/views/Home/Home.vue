<template>
  <div class="home">
    <!-- 顶部导航区域 -->
    <div class="top_nav">
      <TopNav></TopNav>
    </div>
    <!-- 路由展示区域 -->
    <router-view></router-view>
  </div>
</template>

<script>
import TopNav from "../../components/TopNav";
export default {
  name: "Home",
  components: {
    TopNav,
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
  
}

</style>