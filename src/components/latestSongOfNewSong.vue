<template>
  <div class="NewSong">
    <el-table
      :data="newSongList"
      stripe
      style="width: 100%"
      :show-header="false"
      @row-click="getSongAbout"
    >
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="date" width="550">
        <template slot-scope="{ row }">
          <div style="position: relative">
            <img
              v-lazy="row.album.picUrl"
              style="
                 {
                  width: 60px;
                  height: 60px;
                  border-radius: 5px;
                }
              "
            />
            <span style="position: absolute; top: 18px; left: 75px">{{
              row.name
            }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column width="180">
        <template slot-scope="{ row }">
          <div>
            {{ row.artists[0].name }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="address" width="250">
        <template slot-scope="{ row }">
          <div>
            {{ row.album.name }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="duration" width="130"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {reqGetSongUrl,reqGetSongLyric} from '@/api/playListDetail';
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import { reqGetLatestSong } from "@/api/latestSong";
export default {
  name: "LatestSongOfNewSong",
  data() {
    return {
      //分类代表的type,传递时携带的参数
      type: 0,
      //截取的长度
      end: 10,
      newSongList: [],
      songId: 0,
    };
  },
  props: ["classify"],
  // created() {
  //   this.classify = sessionStorage.getItem("classify");
  // },
  mounted() {
    sessionStorage.setItem('latestActive',this.$route.path)
    this.getNewSong();
  },
  methods: {
    async getNewSong() {
      let result = await reqGetLatestSong(this.type);
      console.log("新歌速递", result);
      this.newSongList = result.data.slice(0, this.end);
      this.newSongList.forEach((item) => {
        item.duration = moment.duration(item.duration).format("mm:ss");
      });
    },
    //获取并传递相关歌曲信息给app组件的播放器
    async getSongAbout(row) {
      this.$bus.$emit("songAboutFromLatestSong", row);
      console.log(row);
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
  },
  watch: {
    classify(newClassify) {
      switch (newClassify) {
        case "全部":
          this.type = 0;
          break;
        case "华语":
          this.type = 7;
          break;
        case "欧美":
          this.type = 96;
          break;
        case "日本":
          this.type = 8;
          break;
        case "韩国":
          this.type = 16;
          break;
      }
      this.getNewSong();
    },
  },
};
</script>

<style scoped lang="less">
@import url("@/css/newSongTable.css");
</style>