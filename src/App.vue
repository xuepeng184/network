<template>
  <div id="app">
    <Header></Header>
    <div class="main">
      <div class="left">
        <LeftMenu></LeftMenu>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import LeftMenu from './components/LeftMenu.vue'
import Header from './components/Header.vue'
export default {
  name: 'App',
  components: {
    Header,
    LeftMenu
  }
}
</script>

<style scoped lang="less">
  body{
    margin-right: 0px;
    padding: 0;
  }
  .main{
    width: 1400px;
    margin: 0 auto;
    position: relative;
    display: flex;
    top: 60px;
    .left{
      width: 200px;
      height: calc(100vh-60px);
    }
  }
</style>
