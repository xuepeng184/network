<template>
  <div class="home">
    <!-- 顶部导航区域 -->
    <div class="top_nav">
      <TopNav></TopNav>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import TopNav from '../../components/TopNav' 
export default {
  name:'Home',
  components:{
    TopNav
  }
}
</script>

<style>
  .home{
    overflow: hidden;
  }
.top_nav{
  margin-left: 20px;
}
</style>