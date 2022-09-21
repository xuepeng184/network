<template>
  <div class="left_nav_menu">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo">
      <el-menu-item index="1">
        <span slot="title">发现音乐</span>
      </el-menu-item>
      <el-menu-item index="2">
        <span slot="title">博客</span>
      </el-menu-item>
      <el-menu-item index="3">
        <span slot="title">视频</span>
      </el-menu-item>
      <el-menu-item index="4">
        <span slot="title">关注</span>
      </el-menu-item>
      <el-menu-item index="5">
        <span slot="title">直播</span>
      </el-menu-item>
      <el-menu-item index="6">
        <span slot="title">私人FM</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name:'LeftMenu'
}
</script>

<style lang="less" scoped>
.el-menu-item.is-active{
  background-color: #f8f8f9;
  color:#000;
  font-size: 17px;
  font-weight: 600;
}
.el-menu-item:hover{
  background-color: #f8f8f9;
}
</style>