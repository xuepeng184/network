<template>
  <div class="detailComment">
    <div class="head">
      <p>最新评论</p>
    </div>
    <div class="main">
      <div class="item" v-for="item in comments" :key="item.commentId">
        <div class="img">
          <img :src="item.user.avatarUrl" alt="" />
        </div>
        <div class="text">
          <p><span>{{item.user.nickname}}：</span>{{item.content}}</p>
          <p class="time">{{item.time}}</p>
        </div>
        <div class="option">
          <div class="dianzan">
            <i class="iconfont">&#xe600;</i><span>{{item.likedCount}}</span>
          </div>
          <div class="fenxaing">
            <i class="iconfont">&#xe602;</i>
          </div>
          <div class="pinglun">
            <i class="iconfont">&#xe8b4;</i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import {reqGetListComment} from '@/api/playListDetail'
export default {
  name: "DeatailComment",
  data() {
    return {
      listId:0,
      //评论
      comments:[],

    }
  },
  mounted(){
    sessionStorage.setItem('listActive',this.$route.path)
    this.listId=sessionStorage.getItem('listId')
    this.getListComment()
  },
  methods:{
    //获取歌单评论
    async getListComment(){
      let result=await reqGetListComment(this.listId)
      console.log('歌单评论',result);
      if(result.code==200){
        this.comments=result.comments
        this.$bus.$emit('sendComment',result.total)
        this.comments.map((item)=>{
          item.time=moment(item.time).format('YYYY年MM月DD日 hh:mm')
        })
      }
    }
  }
};
</script>

<style scoped lang="less">
.detailComment {
  box-sizing: border-box;
  width: 1206px;
  padding-left: 49px;
  padding-bottom: 110px;
  .head {
    p {
      font-weight: 600;
      font-size: 15px;
    }
  }
  .main {
    .item {
      width: 1105px;
      height: 75px;
      // background-color: pink;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #f2f2f2;
      .img {
        width: 37px;
        line-height: 75px;
        img {
          display: inline-block;
          width: 100%;
          border-radius: 50%;
          margin-top: 18px;
        }
      }
      .text {
        margin-left: -60px;
        p {
          font-size: 12px;
          margin: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 780px;
          span {
            color: #0b58b0;
            font-size: 12px;
          }
        }
        p:nth-of-type(1) {
          line-height: 30px;
          margin-top: 10px;
        }
        p:nth-of-type(2){
          color: #9f9f9f;
        }
      }
      .option{
        display: flex;
        align-items: center;
        .dianzan{
          width: 40px;
        }
        div{
          color: #9f9f9f;
          height: 20px;
          padding: 0 20px;
          border-right: 1px solid #f2f2f2;
          cursor: pointer;
          i{
            font-size: 16px;
          }
          span{
            margin-left: 5px;
            color: #9f9f9f;
          }
        }
      }
    }
  }
}
</style>