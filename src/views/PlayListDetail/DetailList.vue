<template>
  <div class="table">
    <el-table
      stripe
      style="width: 1206px"
      :data="songList"
      @row-click="getSongAbout"
    >
      <el-table-column width="30"> </el-table-column>
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column label="操作" width="80">
        <i
          class="iconfont"
          style="
            font-size: 20px;
            padding-right: 5px;
            position: relative;
            top: 2px;
          "
          >&#xe668;</i
        >
        <i class="iconfont">&#xe6d1;</i>
      </el-table-column>
      <el-table-column prop="name" label="标题" width="400"> </el-table-column>
      <el-table-column prop="address" label="歌手" width="210">
        <template slot-scope="scope">
            <div>{{scope.row.ar[0].name}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="专辑" width="300">
        <template slot-scope="scope">
            <div>{{scope.row.al.name}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="时间" width="100">
        <template slot-scope="scope">
            <div>{{scope.row.dt}}</div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import moment from 'moment';
import momentDurationFormatSetup from "moment-duration-format";
import {reqGetAllSong,reqGetSongUrl,reqGetSongLyric} from '@/api/playListDetail';
export default {
  name:'DetailList',
  data() {
    return {
      //全部歌曲
      songList:[],
      //歌单id
      id:0,
      //歌曲id
      songId:0,
      //歌曲url
      songUrl:'',
      //歌曲歌词
      songLyric:''
    }
  },
  created(){
    sessionStorage.setItem('listActive',this.$route.path)
  },
  mounted(){
    this.id=sessionStorage.getItem('listId')
    this.getAllSong()
  },
  methods:{
    async getAllSong(){
      let result=await reqGetAllSong(this.id)
      console.log('全部歌曲',result);
      if(result.code==200){
        this.songList=result.songs
        this.songList.forEach((item)=>{
          item.dt = moment.duration(item.dt).format("mm:ss", { trim: false });
        })
      }
    },
    async getSongAbout(row){
      this.$bus.$emit('songAbout',row)
      this.$bus.$emit('reset')
      this.songId=row.id
      let result=await reqGetSongUrl(this.songId)
      console.log('歌曲url',result);
      if(result.code==200){
      this.songUrl=result.data[0].url
      let lyricResult=await reqGetSongLyric(this.songId)
      console.log('歌曲歌词',lyricResult);
      if(lyricResult.code==200){
        this.songLyric=lyricResult.lrc.lyric
        this.$bus.$emit('sendSongLyric',this.songLyric)
        this.$bus.$emit('sendSongUrl',this.songUrl)
      }
        
      }
      
    }
  }
}
</script>

<style scoped>
/* 重置el-table的样式 */
@import url("@/css/listDetailTable.css");
.table{
  padding-bottom: 110px;
}
</style>