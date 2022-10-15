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
          v-model="inputValue"
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          @focus="showHot"
          @change="changeHot"
          @blur="hidHot"
        ></el-input>
        <!-- 这是隐藏的热搜榜 -->
        <div class="search_hot" ref="hot">
          <div class="hot_header">
            热搜榜
          </div>
          <div class="hot_main" v-for="(item,index) in hotSearch" :key="item.iconUrl" :class="{active:index in [0,1,2]}">
            <div class="hot_main_left">
              {{index+1}}
            </div>
            <div class="hot_main_right">
              <div class="hot_right_top">
                <span class="hot_name">{{item.searchWord}}</span> 
                <span class="hot_number">{{item.score}}</span>
              </div>
              <p class="hot_describe" >{{item.content}}</p>
            </div>
          </div>
        </div>
      </div>
      <!-- 这是用户名等部分 -->
      <div class="user">
        <!-- 这里的i会切换用户头像 -->
        <div class="user_img" v-show="!isShow">
          <img :src="profile.avatarUrl" alt="" />
        </div>
        <i class="iconfont" v-show="isShow">&#xe601;</i>
        <!-- 这里切换请登录还有用户名 -->
        <span @click="getCode" v-show="isShow">请登录</span>
        <span v-show="!isShow">{{ profile.nickname }}</span>
        <span v-show="!isShow" @click="logOut">退出登录</span>
        <i class="iconfont yifu">&#xe8c7;</i>
      </div>
      <!-- 这是注册和登录的弹窗，默认隐藏 -->
      <Login ref="login" :qrImg="qrImg" @clearTimer="clearTimer"></Login>
    </div>
  </div>
</template>

<script>
import {reqGetHotSearch} from '@/api/home';
import Login from "../views/Login/Login.vue";
import {
  reqGetCodeKey,
  reqCreateCode,
  reqGetCodeStatus,
  reqGetUserStatus,
  reqLogOut,
} from "@/api/login";
export default {
  name: "Header",
  data() {
    return {
      uniKey: "",
      qrImg: "",
      //检查登录是否成功的定时器
      timer: null,
      myCookie: "",
      //登录状态
      userStatus: {},
      //用户相关信息
      profile: {},
      isShow: true,
      //热搜列表
      hotSearch:[],
      isHowDes:false,
      inputValue:''
    };
  },
  async created() {
    this.myCookie = sessionStorage.getItem("myCookie");
    if (this.myCookie) {
      this.isShow = !this.isShow;
      //再次获取用户信息
      let statusResult = await reqGetUserStatus(this.myCookie);
      console.log("登录状态", statusResult);
      if (statusResult.data.code == 200) {
        this.userStatus = statusResult.data.account;
        this.profile = statusResult.data.profile;
        this.$refs.login.$el.style.display = "none";
      }
    } else {
      this.isShow = true;
    }
  },
  mounted(){
    this.getHotSearch()
  },
  methods: {
    //清除定时器
    clearTimer() {
      clearInterval(this.timer);
      this.timer = null;
    },
    //退出登录
    async logOut() {
      let result = await reqLogOut();
      console.log("退出登录", result);
      this.isShow = true;
      sessionStorage.removeItem("myCookie");
      this.userStatus = {};
      this.profile = {};
      this.$router.go(0);
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
      await reqGetCodeStatus(this.uniKey).then((res) => {
        console.log("状态码", res);
        if (res.code == 801) {
          //每隔一秒调用一次监测状态的函数
          this.timer = setInterval(async () => {
            await reqGetCodeStatus(this.uniKey).then(async (res) => {
              console.log("状态码", res);
              if (res.code == 803) {
                console.log("状态码", res);
                clearInterval(this.timer);
                this.timer = null;
                this.myCookie = res.cookie;
                //展示用户名，不展示请登录
                this.isShow = false;
                //保存在会话存储中
                sessionStorage.setItem("myCookie", this.myCookie);
                let statusResult = await reqGetUserStatus(this.myCookie);
                console.log("登录状态", statusResult);
                if (statusResult.data.code == 200) {
                  this.userStatus = statusResult.data.account;
                  this.profile = statusResult.data.profile;
                  this.$refs.login.$el.style.display = "none";
                  this.$router.go(0)
                }
              }
            });
          }, 1500);
        }
      });
    },
    //点击logo回到主页面
    goHome() {
      sessionStorage.setItem("navActive", "/home/recommend");
      this.$router.push("/home");
    },
    //获得热搜列表详细信息
    async getHotSearch(){
      let result=await reqGetHotSearch()
      console.log('热搜列表',result);
      this.hotSearch=result.data
    },
    //搜索框获得焦点的事件
    showHot(){
      this.$refs.hot.style.display='block'
    },
    //blur事件触发
    hidHot(){
      this.$refs.hot.style.display='none'
    },
    changeHot(){
      this.$refs.hot.style.display='none'
      this.$router.push({
        path:'/search',
        query:{inputValue:this.inputValue}
      })
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
      .search_hot{
        display: none;
        background-color: #fff;
        position: absolute;
        width: 350px;
        height: 600px;
        overflow-y: scroll;
        top: 65px;
        left: 30px;
        border-radius: 5px;
        box-shadow: -3px 3px 5px #eee;
        &::-webkit-scrollbar{
          width: 5px;
        }
        &::-webkit-scrollbar-thumb{
          background-color: #e0e0e0;
        }
        &::-webkit-scrollbar-track{
          background-color: #e0e0e0;
        }
        .hot_header{
          height: 40px;
          line-height: 40px;
          font-size: 14px;
          color: #8d8d8d;
          padding-left: 20px;
        }
        .hot_main{
          display: flex;
          height: 53px;
          &:hover{
            background-color: #f2f2f2;
            cursor: pointer;
          }
          .hot_main_left{
            width: 50px;
            height: 53px;
            text-align: center;
            line-height: 53px;
            opacity: .6;
            color: #dedede;
          }
          .hot_main_left.active{
            color: #ff3d3d;
            opacity: 1;
          }
          .hot_main_right{
            width: 280px;
            height: 53px;
            font-size: 12px;
            p{
              margin: 0;
            }
            .hot_right_top{
              margin-top: 8px;
              margin-bottom: 8px;
              .hot_name{
              opacity: 0.7;
              margin-top: 7px;
            }
            .hot_number{
              margin-left: 10px;
              color: #dedede;
            }
            }
            .hot_describe{
              width: 100%;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
              opacity: 0.5;
            }
          }
        }
        .hot_main.active{
          .hot_main_left{
            color: #ff3d3d;
            opacity: 1;
          }
          .hot_main_right{
            .hot_right_top{
              .hot_name{
                font-weight: 550;
              }
            }
          }       
        }
      }
    }
    .user {
      color: #fff;
      width: 400px;
      line-height: 60px;
      height: 60px;
      position: relative;
      .user_img {
        width: 25px;
        height: 25px;
        position: absolute;
        background-color: #fff;
        border-radius: 50%;
        left: -33px;
        top: 17px;
        img {
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
      span:nth-of-type(3) {
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
  &::-webkit-input-placeholder{
    color: #fff;
    opacity: 0.6;
  }
}
.el-input /deep/ .el-input__prefix {
  top: -5px;
}
</style> 