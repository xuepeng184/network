<template>
  <div class="singer">
    <!-- 语种 -->
    <div class="box">
      <div class="box_left">语种：</div>
      <div class="box_right">
        <ul>
          <div v-for="item in area" :key="item.name" @click="changeArea(item)">
            <li :class="{'active':item.area==activeArea}">{{ item.name }}</li>
          </div>
        </ul>
      </div>
    </div>
    <!-- 分类 -->
    <div class="box">
      <div class="box_left">分类：</div>
      <div class="box_right">
        <ul>
          <div v-for="typeItem in type" :key="typeItem.name" @click="changeType(typeItem)">
            <li :class="{active:typeItem.type==activeType}">{{ typeItem.name }}</li>
          </div>
        </ul>
      </div>
    </div>
    <!-- 筛选 -->
    <div class="box filter_box">
      <div class="box_left filter_left">筛选：</div>
      <div class="box_right filter_right">
        <ul>
          <div v-for="(filterItem,index) in filter" :key="filterItem.name" @click="changeFilter(filterItem,index)">
            <li :class="{active:index==activeFilterIndex}">{{ filterItem.name }}</li>
          </div>
        </ul>
      </div>
    </div>
    <div class="main">
      <div class="main_item" v-for="item in singer" :key="item.id">
        <img v-lazy="item.img1v1Url" alt="">
        <p>{{item.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { reqGetArea, reqGetType, reqGetFilter,reqGetSinger } from "@/api/singer.js";
export default {
  name: "Singer",
  data() {
    return {
      //语种
      area: [],
      //歌手种类
      type: [],
      //筛选
      filter: [],
      //选中的语种
      activeArea:-1,
      //选中的分类
      activeType:-1,
      //筛选
      activeFilter:'-1',
      activeFilterIndex:0,
      //歌手
      singer:[]
    };
  },
  mounted() {
    sessionStorage.setItem("navActive", this.$route.path);
    //获取语种分类
    reqGetArea().then((res) => {
      console.log("语种分类", res);
      this.area = res.data;
    });
    //获取歌手种类分类
    reqGetType().then((res) => {
      console.log("歌手种类分类", res);
      this.type = res.data;
    });
    //获取筛选
    reqGetFilter().then((res) => {
      console.log("筛选", res);
      this.filter = res.data;
    });
    //获取歌手
    this.GetSinger()
  },
  methods: {
    //改变语种的回调
    changeArea(item){
      this.activeArea=item.area
      this.GetSinger()
    },
    //改变分类的回调
    changeType(item){
      this.activeType=item.type
      this.GetSinger()
    },
    //改变筛选
    changeFilter(item,index){
      if(item.name=='热门'){
        this.activeFilter=-1
      }else if(item.name=="#"){
        this.activeFilter=0
      }else{
        this.activeFilter=item.name
      }
      this.activeFilterIndex=index
      this.GetSinger()
    },
    //根据信息获得歌手
    async GetSinger(){
      let result=await  reqGetSinger(this.activeArea,this.activeType,this.activeFilter)
      console.log('歌手',result);
      this.singer=result.artists
    }
  },
};
</script>

<style lang="less" scoped>
.singer {
  position: relative;
  width: 96%;
  top: 30px;
  left: 50px;

  .box {
    display: flex;
    margin-bottom: 15px;
    width: 100%;
    .box_left {
      font-size: 12px;
      opacity: 0.8;
    }
    .box_right {
      ul {
        display: flex;
        margin: 0;
        padding-left: 10px;
        flex-wrap: wrap;
        div {
          border-right: 1px solid #f2f2f2;
          cursor: pointer;
        }
        li {
          list-style-type: none;
          font-size: 12px;
          width: 50px;
          text-align: center;
          margin: 0 12.5px;
        }
        li.active {
          background-color: #fdeded;
          color: #ec4141;
          border-radius: 20px;
        }
      }
    }
    .filter_left {
      white-space: nowrap;
    }
    .filter_right {
      div {
        margin-bottom: 10px ;
      }
    }
  }
  .main{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-bottom: 110px;
    .main_item{
      width: 168px;
      height: 200px;
      margin: 10px 0;
      cursor: pointer;
      img{
        width: 100%;
        border-radius: 10px;
      }
      p{
        font-size: 14px;
        margin: 0;
      }
    }
  }
}
</style>