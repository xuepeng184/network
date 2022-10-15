<template>
  <div class="search">
    <div class="search_top">
      搜索 {{inputValue}}
    </div>
  </div>
</template>

<script>
export default {
  name:'Search',
  data() {
    return {
      //搜索的
      inputValue:''
    }
  },
  created(){
    this.inputValue=this.$route.query.inputValue
  },
}
</script>

<style lang="less" scoped>
.search{
  height: 100vh;
  width: 1250px;
  padding-left: 30px;
  .search_top{
    font-size: 19px;
    font-weight: 600;
    height: 50px;
    line-height: 50px;
    
  }
}
</style>