<template>
  <div class="songList">
    <!-- 最上方的精品歌单区域 -->
    <div class="top" v-show="isShow">
      <div class="top_img">
        <img v-lazy="fineList.coverImgUrl"/>
      </div>
      <div class="top_right">
        <!-- 皇冠的那部分 -->
        <div class="crown">
          <div>
            <img src="@/assets/crown.png" alt="" />
            精品歌单
          </div>
        </div>
        <div class="top_right_bottom">
          <p>{{fineList.name}}</p>
        </div>
      </div>
    </div>
    <!-- 歌单的导航区域 -->
    <div class="nav">
      <div class="nav_left">
        <span>{{ cat }}</span>
        <span>></span>
      </div>
      <div class="nav_right">
        <ul>
          <li
            :class="{ active: activeIndex - 1 == index }"
            v-for="(item, index) in tags"
            :key="item.id"
            @click="changeActive(item.name, item.position)"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
    </div>
    <!-- 歌单展示区域 -->
    <div class="main">
      <div class="recommend_item" v-for="item in playList" :key="item.id" @click="goPlayList(item.id)">
        <img v-lazy="item.coverImgUrl" alt="" />
        <p>{{ item.name }}</p>
        <span>{{ item.playCount }}</span>
      </div>
    </div>
    <!-- 分页器区域 -->
    <div class="pagination">
      <el-pagination
        @current-change="currenChange"
        layout="prev, pager, next"
        :total="100"
        ref="pagination"
        :current-page="page"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { reqGetCategoryHot, reqGetList, reqGetFineList } from "@/api/songList";
export default {
  name: "SongList",
  data() {
    return {
      //热门歌单分类列表
      tags: [],
      //选中的热门歌单分类
      cat: "华语",
      //选中的分类的index
      activeIndex: 0,
      //每页获取多少歌单
      limit: 80,
      //偏移量
      offset: 0,
      //当前第几页
      page: 1,
      //展示的歌单
      playList: [],
      //顶部精品歌单
      fineList:{},
      //是否展示顶部精品歌单
      isShow:true
    };
  },
  mounted() {
    sessionStorage.setItem('navActive',this.$route.path)
    this.GetCategoryHot();
    this.getList();
    this.GetFineList()
  },
  methods: {
    //获取热门歌单分类
    async GetCategoryHot() {
      let result = await reqGetCategoryHot();
      console.log("热门歌单分类", result);
      if (result.code == 200) {
        this.tags = result.tags;
        this.cat = this.tags[0].name;
        this.activeIndex = this.tags[0].position;
      }
    },
    //改变选中的分类
    changeActive(name, position) {
      this.cat = name;
      this.activeIndex = position;
      this.offset=0;
      this.page=1;
      this.getList();
      this.GetFineList()
    },
    //获取歌单的方法
    async getList() {
      let result = await reqGetList(this.limit, this.cat, this.offset);
      console.log("歌单数据", result);
      if (result.code == 200) {
        this.playList = result.playlists;
        this.playList.map((item) => {
          item.playCount = this.NumberToCommon(item.playCount);
        });
      }
    },
    //页面改变的回调
    currenChange(val) {
      this.page = val;
      this.offset = (this.page - 1) * this.limit;
      //将滚动条切换到顶部
      window.scrollTo(0, 0);
      this.getList();
      this.GetFineList()
    },
    //将数字格式化的函数
    NumberToCommon(num) {
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
    //获得顶部精品歌单展示的数据
    async GetFineList(){
      let result=await reqGetFineList(this.limit,this.cat)
      console.log('顶部精品歌单',result);
      if(result.code==200){
        if(this.cat!=='综艺'){
          this.fineList=result.playlists[0]
        }else{
          this.isShow=false
        }
      }
    },
    goPlayList(id) {
      sessionStorage.setItem('listId',id)
      this.$router.push({
        path:'/playlistdetail'
      });
    },
  },
};
</script>

<style lang="less" scoped>
.songList {
  position: relative;
  top: 30px;
  left: 50px;
  padding-bottom: 110px;
  .top {
    width: 1120px;
    height: 170px;
    background-color: pink;
    border-radius: 10px;
    display: flex;
    background-image: linear-gradient(to right, #243949 0%, #517fa4 100%);
    .top_img {
      width: 150px;
      height: 150px;
      margin-left: 15px;
      margin-top: 10px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
      }
    }
    .top_right {
      flex: 1;
      .crown {
        height: 50%;
        // background-color: blue;
        position: relative;
        div {
          position: absolute;
          top: 35px;
          left: 10px;
          box-sizing: border-box;
          width: 100px;
          height: 30px;
          font-size: 13px;
          color: #e7aa5a;
          border-radius: 25px;
          border: 1px solid;
          line-height: 30px;
          padding-left: 10px;
          img {
            width: 20px;
            height: 20px;
            vertical-align: text-bottom;
          }
        }
      }
      .top_right_bottom {
        height: 50%;
        // background-color: green;
        p {
          color: #fff;
          margin-left: 10px;
          margin-top: 0;
        }
      }
    }
  }
  .nav {
    width: 1120px;
    height: 60px;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    .nav_left {
      box-sizing: border-box;
      height: 30px;
      width: 100px;
      line-height: 30px;
      text-align: center;
      border: 1px solid #e2e2e2;
      border-radius: 15px;
      display: flex;
      justify-content: center;
      margin-left: 20px;
      margin-top: 15px;
      span:nth-of-type(1) {
        display: block;
        font-size: 13px;
      }
      span:nth-of-type(2) {
        font-size: 20px;
        margin-left: 5px;
        opacity: 0.5;
        line-height: 28px;
      }
    }
    .nav_right {
      ul {
        display: flex;
        margin-top: 25px;
        li {
          list-style: none;
          font-size: 12px;
          padding: 0 10px;
          cursor: pointer;
          margin-right: 5px;
          border-radius: 10px;
        }
        li.active {
          background-color: #fdeded;
          color: #ec4141;
        }
      }
    }
  }
  .main {
    width: 1120px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .recommend_item {
      margin-top: 10px;
      width: 207px;
      height: 260px;
      position: relative;
      // background-color: pink;
      img {
        width: 100%;
        height: 207px;
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
        top: 3px;
        right: 8px;
        color: #fff;
      }
    }
  }
  .pagination {
    text-align: center;
  }
}
</style>