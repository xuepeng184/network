<template>
  <div id="app">
    <Header></Header>
    <div class="main">
      <div class="left">
        <LeftMenu></LeftMenu>
      </div>
      <router-view></router-view>
    </div>
    <!-- 底部的播放器区域 -->
    <div class="bottom_aplayer">
      <aplayer :key=music.src :music="music" ref="aplayer" autoplay :showLrc="true" v-if="music.src"/>
    </div>
  </div>
</template>

<script>
import Aplayer from 'vue-aplayer'
import LeftMenu from "./components/LeftMenu.vue";
import Header from "./components/Header.vue";
export default {
  name: "App",
  data() {
    return {
      songUrl: "",
      songLyric: "",
      music: {
        title: "",
        artist: "",
        src: "",
        // 歌曲图片
        pic: "",
        // 歌词
        lrc: "",
      },
      songAbout: {},
    };
  },
  components: {
    Header,
    LeftMenu,
    Aplayer
  },
  created() {
    this.$bus.$on("sendSongUrl", (res) => {
      this.songUrl = res;
      this.music.src = res;
    });
    this.$bus.$on("sendSongLyric", (res) => {
      this.songLyric = res;
      this.music.lrc = res;
    });
    this.$bus.$on("songAbout", (res) => {
      this.songAbout = res;
      this.music.title = res.name;
      this.music.artist = res.ar[0].name;
      this.music.pic = res.al.picUrl;
    });
    this.$bus.$on("songAboutFromLatestSong", (res) => {
      this.songAbout = res;
      this.music.title = res.name;
      this.music.artist = res.artists[0].name;
      this.music.pic = res.album.picUrl;
    });
  },

};
</script>

<style scoped lang="less">
body {
  margin-right: 0px;
  padding: 0;
}
.main {
  width: 1400px;
  margin: 0 auto;
  position: relative;
  display: flex;
  top: 60px;
  .left {
    width: 200px;
    height: calc(100vh-60px);
  }
}
.bottom_aplayer {
  height: 90px;
  position: fixed;
  bottom: 5px;
  z-index: 9999;
  width: 1430px;
  border-radius: 10px;
  margin-left: 40px;
}
</style>
