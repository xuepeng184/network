<template>
  <div class="header">
    <!-- 这是内容的中间主体区域 -->
    <div class="main">
      <!-- 这是logo部分 -->
      <div class="logo" @click="goHome">
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
        <div class="user_img" v-show="!isShow">
          <img :src="profile.avatarUrl" alt="">
        </div>
        <i class="iconfont" v-show="isShow">&#xe601;</i>
        <!-- 这里切换请登录还有用户名 -->
        <span @click="getCode" v-show="isShow">请登录</span>
        <span v-show="!isShow">{{profile.nickname}}</span>
        <span v-show="!isShow" @click="logOut">退出登录</span>
        <i class="iconfont yifu">&#xe8c7;</i>
      </div>
      <!-- 这是注册和登录的弹窗，默认隐藏 -->
      <Login ref="login" :qrImg="qrImg" @clearTimer="clearTimer"></Login>
    </div>
  </div>
</template>

<script>
import Login from "../views/Login/Login.vue";
import { reqGetCodeKey, reqCreateCode, reqGetCodeStatus,reqGetUserStatus,reqLogOut } from "@/api/login";
export default {
  name: "Header",
  data() {
    return {
      uniKey: "",
      qrImg: "",
      //检查登录是否成功的定时器
      timer:null,
      myCookie:'',
      //登录状态
      userStatus:{},
      //用户相关信息
      profile:{},
      isShow:true,
    };
  },
  created(){
    window.addEventListener('beforeunload',()=>{
      // sessionStorage.removeItem('myCookie')
    })
  },
  methods: {
    //清除定时器
    clearTimer(){
      clearInterval(this.timer);
      this.timer=null
    },
    //退出登录
    async logOut(){
      let result=await reqLogOut()
      console.log('退出登录',result);
      this.isShow=true
      sessionStorage.removeItem('myCookie')
      this.userStatus={};
      this.profile={};
      this.$router.go(0)
    },
    //通过获得二维码key生成二维码图的base64编码
    async getCode() {
      this.$refs.login.$el.style.display = "block";
      let result = await reqGetCodeKey();
      console.log("二维码key", result);
      if (result.code == 200) {
        this.uniKey = result.data.unikey;
      }
      if (this.uniKey) {
        let imgResult = await reqCreateCode(this.uniKey, "img");
        console.log("二维码base64码", imgResult);
        this.qrImg = imgResult.data.qrimg;
      }
      //监测二维码的状态码 800 为二维码过期,801 为等待扫码,802 为待确认,803 为授权登录成功(803 状态码下会返回 cookies)
      await reqGetCodeStatus(this.uniKey).then(res=>{
        console.log('状态码',res);
        if(res.code==801){
          //每隔一秒调用一次监测状态的函数
           this.timer=setInterval(async ()=>{
            
            await reqGetCodeStatus(this.uniKey).then(async (res)=>{
              console.log('状态码',res);
              if(res.code==803){
                console.log('状态码',res);
                clearInterval(this.timer);
                this.timer=null;
                this.myCookie=res.cookie
                //展示用户名，不展示请登录
                this.isShow=false
                //保存在会话存储中
                sessionStorage.setItem('myCookie',this.myCookie)
                let statusResult=await reqGetUserStatus(this.myCookie)
                console.log('登录状态',statusResult);
                if(statusResult.data.code==200){
                  this.userStatus=statusResult.data.account
                  this.profile=statusResult.data.profile
                  this.$refs.login.$el.style.display = "none";
                }
              }
            })
          },1500)
        }
      })
    },
    goHome(){
      this.$router.push('/home')
    }
  },
  components: {
    Login,
  },
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
  z-index: 999;
  .main {
    width: 1400px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    .logo {
      width: 200px;
      overflow: hidden;
      cursor: pointer;
      .imglogo {
        width: 200px;
        height: 60px;
        background-image: url("../assets/Mutil-purpose.png");
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
    .user {
      color: #fff;
      width: 400px;
      line-height: 60px;
      height: 60px;
      position: relative;
      .user_img{
        width: 25px;
        height: 25px;
        position: absolute;
        background-color: #fff;
        border-radius: 50%;
        left: -33px;
        top: 17px;
        img{
          width: 100%;
          height: 100%;
          border-radius: 50%;
          display: block;
        }
      }
      i:nth-of-type(1) {
        font-size: 20px;
        margin-right: 10px;
        margin-left: -30px;
        vertical-align: middle;
      }
      span {
        font-size: 13px;
        cursor: pointer;
      }
      span:nth-of-type(3){
        margin-left: 8px;
      }
      .yifu {
        font-size: 20px;
        vertical-align: middle;
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
.el-input /deep/ .el-input__prefix {
  top: -5px;
}
</style> 