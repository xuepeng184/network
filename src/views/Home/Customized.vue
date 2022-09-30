<template>
  <div class="customized">
    <!-- 这是上方的雷达推荐歌曲 -->
    <div class="radar">
      <div class="radar_top">
        <p>你的雷达歌曲</p>
        <p>根据你的红心收藏为你推荐更多宝藏歌曲</p>
      </div>
      <div class="radar_main">
        <div class="recommend_item" v-for="item in radarList" :key="item.id" @click="goPlayList(item.id)">
          <img v-lazy="item.picUrl" alt="" />
          <p>{{ item.name }}</p>
          <span>{{ item.playCount }}</span>
        </div>
      </div>
    </div>
    <!-- 这是剩余的歌单  -->
    <div class="rest">
      <div class="restTop">
        <p>惬意的音乐时光</p>
      </div>
      <div class="rest_main">
        <div class="recommend_item" v-for="item in restList" :key="item.id" @click="goPlayList(item.id)">
          <img v-lazy="item.picUrl" alt="" />
          <p>{{ item.name }}</p>
          <span>{{ item.playCount }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reqGetCustomized } from "@/api/customized.js";
export default {
  name: "Customized",
  data() {
    return {
      //雷达歌单
      radarList: [],
      //剩余歌单
      restList: [],
    };
  },
  mounted() {
    sessionStorage.setItem("navActive", this.$route.path);
    this.getCustomized();
  },
  methods: {
    async getCustomized() {
      let result = await reqGetCustomized();
      console.log("专属定制所有歌单", result);
      if (result.code == 200) {
        this.radarList = result.result.slice(0, 5);
        // 对数字进行格式化
        this.radarList.map((item) => {
          item.playCount = this.radarNumberToCommon(item.playCount);
        });
        this.restList = result.result.slice(5);
        this.restList.map((item) => {
          item.playCount = this.radarNumberToCommon(item.playCount);
        });
      }
    },
    //将数字格式化的函数
    radarNumberToCommon(num) {
      if (num < 10000) {
        return num;
      } else if (num > 10000 && num < 100000000) {
        let resultNum = (num / 10000).toFixed(0);
        let result = resultNum + "万";
        return result;
      } else {
        let resultNum = (num / 100000000).toFixed(0);
        let result = resultNum + "亿";
        return result;
      }
    },
    // 前往歌单详情页
    goPlayList(id) {
      this.$router.push({
        name: "PlayListDetail",
        query: { id: id },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.customized {
  position: relative;
  left: 50px;
  top: 20px;
  .radar {
    .radar_top {
      p:nth-of-type(1) {
        font-size: 20px;
        font-weight: 600;
        margin: 0;
      }
      p:nth-of-type(2) {
        margin-top: 6px;
        color: #9f9f9f;
        font-size: 13px;
      }
    }
    .radar_main {
      width: 1200px;
      display: flex;
      flex-wrap: wrap;
      margin-left: -10px;
      .recommend_item {
        margin-top: 10px;
        padding: 0 10px;
        width: 215px;
        height: 250px;
        position: relative;
        // background-color: pink;
        img {
          width: 100%;
          height: 205px;
          border-radius: 10px;
        }
        p {
          font-size: 14px;
          margin-top: 0;
          overflow: hidden;
        }
        span {
          font-size: 12px;
          position: absolute;
          top: 5px;
          right: 15px;
          color: #fff;
        }
      }
    }
  }
  .rest {
    margin-top: 30px;
    padding-bottom: 110px;
    .restTop {
      p {
        font-weight: 600;
        font-size: 20px;
        margin: 0;
      }
    }
    .rest_main {
      width: 1200px;
      display: flex;
      flex-wrap: wrap;
      margin-left: -10px;
      .recommend_item {
        margin-top: 10px;
        padding: 0 10px;
        width: 215px;
        height: 250px;
        position: relative;
        // background-color: pink;
        img {
          width: 100%;
          height: 205px;
          border-radius: 10px;
        }
        p {
          font-size: 14px;
          margin-top: 0;
          overflow: hidden;
        }
        span {
          font-size: 12px;
          position: absolute;
          top: 5px;
          right: 15px;
          color: #fff;
        }
      }
    }
  }
}
</style>