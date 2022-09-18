<template>
  <div class="header">
    <!-- 这是内容的中间主体区域 -->
    <div class="main">
      <!-- 这是logo部分 -->
      <div class="logo">
        <div class="imglogo"></div>
      </div>
      <!-- 这是搜索的部分 -->
      <div class="search">
        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
        ></el-input>
      </div>
      <!-- 这是用户名等部分 -->
      <div class="user">
        <!-- 这里的i会切换用户头像 -->
        <i class="iconfont">&#xe601;</i>
        <!-- 这里切换请登录还有用户名 -->
        <span>请登录</span>
        <i class="iconfont yifu">&#xe8c7;</i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {};
  },
  methods: {},
};
</script>
 
<style scoped lang="less">
.header {
  position: fixed;
  top: 0;
  left: 0;
  background-color: #ec4141;
  width: 100%;
  height: 60px;
  overflow: hidden;
  z-index: 999;
  .main {
    width: 1400px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    .logo {
      width: 200px;
      overflow: hidden;
      .imglogo {
        width: 200px;
        height: 60px;
        background-image: url('../assets/Mutil-purpose.png');
        display: inline-block;
        margin-left: 20px;
        margin-top: -5px;
      }
    }
    .search {
      height: 60px;
      width: 800px;
      position: relative;
      .el-input {
        width: 160px;
        height: 30px;
        position: absolute;
        left: 100px;
        top: 15px;
      }
    }
    .user{
      color: #fff;
      width: 400px;
      line-height: 60px;
      height: 60px;
      i:nth-child(1){
        font-size: 20px;
        margin-right: 10px;
        margin-left: -30px;
        vertical-align:middle;
      }
      span{
        font-size: 13px;
        cursor: pointer;
      }
      .yifu{
        font-size: 20px;
        vertical-align:middle;
        margin-left: 100px;
      }
    }
  }
}
.el-input /deep/ input {
  width: 160px;
  height: 30px !important;
  border-radius: 25px;
  background-color: rgba(0, 0, 0, 0.05);
  border: none;
  color: #fff;
    font-size: 12px;
}
.el-input /deep/ .el-input__prefix{
  top: -5px;
}
</style> 