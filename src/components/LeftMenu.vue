<template>
  <div class="left_nav_menu">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo">
      <el-menu-item index="21">
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


</style>