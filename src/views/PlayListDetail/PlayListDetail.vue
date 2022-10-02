<template>
  <div class="detail">
    <div class="head">
      <div class="head_img">
        <img :src="playlist.coverImgUrl" alt="" />
      </div>
      <div class="head_right">
        <div class="top">
          <div class="gedan">歌单</div>
          <div class="title">{{ playlist.name }}</div>
        </div>
        <div class="user">
          <img :src="avatarUrl" alt="" />
          <span>{{ userName }}</span>
          <span>{{ createTime }} 创建</span>
        </div>
        <div class="option">
          <div class="box">
            <i class="iconfont">&#xea6d;</i>
            <span>播放全部</span>
            <i class="iconfont">&#xe626;</i>
          </div>
          <div class="box">
            <i class="iconfont">&#xe668;</i>
            <span>收藏 ({{ collectNum }})</span>
          </div>
          <div class="box">
            <i class="iconfont">&#xe602;</i>
            <span>分享 ({{ playlist.shareCount }})</span>
          </div>
          <div class="box">
            <i class="iconfont">&#xe6d1;</i>
            <span>下载全部</span>
          </div>
        </div>
        <div class="descript">
          <div class="tag">
            <span>标签：</span>
            <span v-for="item in playlist.tags" :key="item" class="tags">{{
              item
            }}</span>
          </div>
          <div class="song">
            <span>歌曲： {{ songsLength }}</span>
            <span>播放： {{ playlist.playCount }}</span>
          </div>
          <div class="des">
            <span>简介： {{ playlist.description }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="menu">
        <el-menu
          class="el-menu-demo"
          mode="horizontal"
          :router="true"
          :default-active="defaultActive"
          @select="changeActive"
        >
          <el-menu-item index="/playlistdetail/detaillist"
            >歌曲列表</el-menu-item
          >
          <el-menu-item index="/playlistdetail/detailcomment"
            >评论({{commentLength}})</el-menu-item
          >
          <el-menu-item index="/playlistdetail/detailcollect"
            >收藏者</el-menu-item
          >
        </el-menu>
      </div>
      <div class="view">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import {reqGetListComment} from '@/api/playListDetail'
import moment from "moment";
import {
  reqGetWholeList,
  reqGetUser,
  reqGetListDetail,
} from "@/api/playListDetail";
export default {
  name: "PlayListDetail",
  data() {
    return {
      //歌单id
      id: "",
      //歌单详情数据
      playlist: {},
      //用户id
      userId: 0,
      //创建者头像
      avatarUrl: "",
      //创建者名称
      userName: "",
      //创建时间
      createTime: "",
      //一共多少歌曲
      songsLength: 0,
      //收藏数
      collectNum: "",
      //导航默认的路由
      defaultActive: "/playlistdetail/detaillist",
      //评论数
      commentLength:0
    };
  },
  mounted() {
    this.defaultActive = sessionStorage.getItem("listActive");
    this.getListDetail();
    this.getCommentLength()
  },
  destroyed() {
    // sessionStorage.removeItem("listId");
  },
  methods: {
    async getListDetail() {
      this.id = sessionStorage.getItem("listId");
      let result = await reqGetWholeList(this.id);
      console.log("歌单详情", result);
      if (result.code == 200) {
        this.playlist = result.playlist;
        this.createTime = moment(this.playlist.createTime).format("YYYY-MM-DD");
        this.userId = this.playlist.userId;
        this.songsLength = this.playlist.trackCount;
        this.playlist.playCount = this.NumberToCommon(this.playlist.playCount);
        this.playlist.shareCount = this.NumberToCommon(
          this.playlist.shareCount
        );
      }
      // 获取创建者相关信息
      let userResult = await reqGetUser(this.userId);
      console.log("歌单user", userResult);
      this.avatarUrl = userResult.profile.avatarUrl;
      this.userName = userResult.profile.nickname;
      //获取歌单详情动态，例如收藏数等
      let detailResult = await reqGetListDetail(this.id);
      console.log("歌单详情动态", detailResult);
      this.collectNum = this.NumberToCommon(detailResult.commentCount);
    },
    //将数字格式化的函数
    NumberToCommon(num) {
      if (num < 1000) {
        return num;
      } else if (num < 10000) {
        let resultNum = (num / 1000).toFixed(0);
        let result = resultNum + "千";
        return result;
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
    //改变菜单展示项
    changeActive(index) {
      this.defaultActive = index;
    },
    async getCommentLength(){
      let result=await reqGetListComment(this.id)
      this.commentLength=result.total
    }
  },
};
</script>

<style lang="less" scoped>
.detail {
  width: 1250px;
  height: 100vh;
  .head {
    display: flex;
    height: 185px;
    overflow: hidden;
    margin-left: 30px;
    margin-top: 30px;
    .head_img {
      width: 185px;
      height: 185px;
      // background-color: green;
      img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
      }
    }
    .head_right {
      // background-color: red;
      flex: 1;
      padding-left: 20px;
      .top {
        margin-top: 5px;
        display: flex;
        .gedan {
          width: 35px;
          height: 18px;
          color: #ee418e;
          border: 1px solid;
          font-size: 12px;
          text-align: center;
          border-radius: 4px;
          margin-top: 3px;
          line-height: 18px;
        }
        .title {
          font-weight: bold;
          font-size: 18px;
          padding-left: 10px;
        }
      }
      .user {
        height: 25px;
        margin-top: 18px;
        img {
          width: 25px;
          height: 100%;
          border-radius: 50%;
          vertical-align: middle;
        }
        span {
          display: inline-block;
          font-size: 12px;
          height: 100%;
          padding-left: 7px;
        }
        span:nth-of-type(1) {
          color: #0b58b0;
        }
      }
      .option {
        margin-top: 13px;
        display: flex;
        .box {
          cursor: pointer;
          line-height: 30px;
          height: 30px;
          border-radius: 25px;
          border: 1px solid #e0e0e0;
          padding: 0 8px;
          opacity: 0.8;
          margin-right: 15px;
          font-size: 14px;
          span {
            margin: 0 5px;
          }
        }
        .box:nth-of-type(1) {
          color: #fff;
          background-color: #ec4141;
          border: none;
          opacity: 1;
        }
        .box:nth-of-type(2) {
          i {
            font-size: 27px;
            vertical-align: bottom;
          }
          span {
            margin-left: 0;
          }
        }
        .box:nth-of-type(3) {
          i {
            font-size: 18px;
          }
        }
        .box:nth-of-type(4) {
          i {
            font-size: 22px;
            vertical-align: bottom;
          }
        }
      }
      .descript {
        font-size: 13px;
        margin-top: 10px;
        opacity: 0.8;
        div {
          margin-top: 3px;
        }
        .tag {
          .tags {
            color: #0b58b0;
            margin: 0 3px;
          }
        }
        .song {
          span {
            margin-right: 10px;
          }
        }
        .des {
          width: 575px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
  .main {
    height: 200px;
    margin-top: 35px;
    .menu {
      margin-left: 30px;
    }
    .view {
      width: 100%;
      margin-top: 10px;
    }
  }
}
//重置el-menu的样式
.el-menu {
  border-bottom: none;
}
.el-menu-item.is-active {
  border-bottom: 2px solid #ff0000;
  font-weight: 600;
  font-size: 17px;
}
</style>