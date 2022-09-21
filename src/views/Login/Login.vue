<template>
  <div class="login" ref="login">
    <div class="head">
      <span>登录</span>
      <span @click="closeLogin">x</span>
    </div>
    <div class="main">
      <div class="imgLogin">
        <img src="../../assets/login.png" alt="" />
      </div>
      <div class="erweima">
        <div>扫码登录</div>
        <img :src="qrImg" alt="请扫描二维码" />
        <div>
          <span>请使用</span>
          <span>网易云App</span>
          <span>扫码登录</span>
        </div>
      </div>
    </div>
    <div class="bottom">
      <span>其他登录方式</span>
      <span>手机验证码</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  props: ["qrImg"],
  methods: {
    // 关闭登录注册页
    closeLogin() {
      this.$refs.login.style.display='none';
      this.$emit('clearTimer')
    },
  },
};
</script>

<style scoped lang="less">
.login {
  height: 370px;
  width: 550px;
  border: 1px solid black;
  border-radius: 7px;
  border-top: transparent;
  position: absolute;
  top: 150px;
  margin-left: 50%;
  transform: translateX(-50%);
  z-index: 12;
  display: none;
  background-color: #fff;
  .head {
    height: 50px;
    background-color: #000;
    color: #fff;
    line-height: 50px;
    display: flex;
    padding: 0 10px;
    justify-content: space-between;
    border-radius: 7px;
    span:nth-of-type(2){
      cursor: pointer;
      font-size: 20px;
    }
  }
  .main {
    margin-top: 30px;
    display: flex;
    .imgLogin {
      height: 220px;
      width: 50%;
      img {
        height: 100%;
        width: 125px;
        margin-left: 100px;
      }
    }
    .erweima {
      width: 50%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      div:nth-child(1) {
        font-size: 20px;
        font-weight: 600;
        text-align: center;
      }
      img {
        width: 150px;
        height: 150px;
        display: inline-block;
      }
      div:nth-of-type(2) {
        span {
          font-size: 13px;
        }
        span:nth-of-type(2) {
          margin: 0 5px;
          color: #0c73c2;
        }
      }
    }
  }
  .bottom {
    text-align: center;
    margin-top: 20px;
    line-height: 28px;
    span:nth-of-type(1) {
      font-size: 13px;
      border: 1px solid black;
      padding: 5px 10px;
      border-radius: 15px;
    }
    span:nth-of-type(2) {
      cursor: pointer;
      margin-left: 20px;
      color: #0c73c2;
    }
  }
}
</style>