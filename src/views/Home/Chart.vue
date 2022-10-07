<template>
  <div class="chart">
    <div class="official">
      <div class="official_head">
        <p>官方榜单</p>
      </div>
      <div class="official_main">
        <div
          class="official_main_item"
          v-for="item in officialList"
          :key="item.id"
        >
          <div class="leftImg" @click="goPlayList(item.id)">
            <img :src="item.coverImgUrl" alt="" />
            <p>{{ item.updateTime }}更新</p>
          </div>
          <div class="right_table">
            <el-table
              :data="item.songlist"
              stripe
              style="width: 100%"
              :show-header="false"
              @row-click="getSongAbout"
            >
              <el-table-column type="index"></el-table-column>
              <el-table-column prop="name" width="690"></el-table-column>
              <el-table-column prop="" width="180">
                <template slot-scope="{ row }">
                  <div>
                    {{ row.ar[0].name }}
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <div class="world">
      <div class="world_head">
        <p>全球榜单</p>
      </div>
      <div class="world_main">
        <div class="world_main_item" v-for="item in worldList" :key="item.id" @click="goPlayList(item.id)">
          <img :src="item.coverImgUrl" alt="">
          <p>{{item.name}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { reqGetAllTop, reqGetTopSong } from "@/api/chart";
import { reqGetSongUrl, reqGetSongLyric } from "@/api/playListDetail";
export default {
  name: "Chart",
  data() {
    return {
      // 官方榜单
      officialList: [],
      // 全球榜单
      worldList: [],
    };
  },
  mounted() {
    sessionStorage.setItem("navActive", this.$route.path);
    this.getAllTopList();
  },
  methods: {
    //获得所有榜单信息
    async getAllTopList() {
      let result = await reqGetAllTop();
      console.log("所有榜单", result);
      //给前五个添加歌单元素用于遍历
      this.officialList = result.list.slice(0, 4);
      this.officialList.forEach(async (item) => {
        item.updateTime = moment(item.updateTime).format("MM月DD日");
        let songResult = await reqGetTopSong(item.id);
        console.log("前五首歌", songResult);
        this.$set(item, "songlist", songResult.songs);
      });
      this.worldList = result.list.slice(4,34);
    },
    //点击表单某一行
    async getSongAbout(row) {
      this.$bus.$emit("songAbout", row);
      this.songId = row.id;
      let result = await reqGetSongUrl(this.songId);
      console.log("歌曲url", result);
      if (result.code == 200) {
        this.songUrl = result.data[0].url;
        let lyricResult = await reqGetSongLyric(this.songId);
        console.log("歌曲歌词", lyricResult);
        if (lyricResult.code == 200) {
          this.songLyric = lyricResult.lrc.lyric;
          this.$bus.$emit("sendSongLyric", this.songLyric);
          this.$bus.$emit("sendSongUrl", this.songUrl);
        }
      }
    },
    //去往歌单界面
    goPlayList(id) {
      sessionStorage.setItem("listId", id);
      this.$router.push({
        path: "/playlistdetail",
      });
    },
  },
};
</script>

<style lang="less">
@import url("@/css/chartTble.css");
.chart {
  width: 1130px;
  position: relative;
  top: 20px;
  left: 50px;
  padding-bottom: 110px;
  // 这一部分是官方榜单部分
  .official {
    .official_head {
      p {
        margin: 0;
        font-weight: 600;
      }
    }
    .official_main {
      .official_main_item {
        display: flex;
        margin-top: 20px;
        justify-content: space-between;
        .leftImg {
          width: 175px;
          height: 180px;
          position: relative;
          cursor: pointer;
          img {
            width: 100%;
            height: 100%;
            border-radius: 10px;
          }
          p {
            position: absolute;
            left: 50%;
            bottom: 35px;
            color: #fff;
            font-size: 12px;
            transform: translateX(-50%);
          }
        }
        .right_table {
          width: 920px;
        }
      }
    }
  }
  //全球榜单部分
  .world{
    .world_head{
      p{
        font-weight: 600;
        margin-top: 50px;
      }
    }
    .world_main{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .world_main_item{
        cursor: pointer;
        width: 205px;
        height: 235px;
        margin-bottom: 20px;
        img{
          width: 100%;
          border-radius: 10px;
        }
        p{
          margin: 0;
          font-size: 14px;
          opacity: 0.9;
        }
     } 
    }
  }
}
</style>