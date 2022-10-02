<template>
  <div class="Home_top_nav">
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      :router='true'
      :default-active="defaultActive"
    >
      <el-menu-item index="/home/recommend">个性推荐</el-menu-item>
      <el-menu-item index="/home/customized">专属定制</el-menu-item>
      <el-menu-item index="/home/songlist">歌单</el-menu-item>
      <el-menu-item index="/home/chart">排行榜</el-menu-item>
      <el-menu-item index="/home/singer">歌手</el-menu-item>
      <el-menu-item index="/home/latestsong">最新音乐</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name:'TopNav',
  data() {
    return {
      defaultActive:''
    }
  },
  created(){
    this.defaultActive=sessionStorage.getItem('navActive')==undefined?this.$route.path:sessionStorage.getItem('navActive');
  },
  watch:{
    $route(now){
      this.defaultActive=now.path
    }
  }
};
</script>

<style lang="less" scoped>
  .el-menu-item.is-active{
    border-bottom: 2px solid #ff0000;
    font-weight: 600;
    font-size: 17px;
  }
</style>