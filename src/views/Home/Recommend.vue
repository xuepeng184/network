<template>
  <div class="recommend">
    <!-- 上面的轮播图区域 -->
    <div class="carousel">
      <el-carousel :interval="5000" type="card" height="200px" arrow="never">
        <el-carousel-item
          v-for="(item) in bannerList"
          :key="item.targetId"
        >
          <img :src="item.imageUrl" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 推荐歌单区域 -->
    <div class="recommend_song">
      <MyRecommend></MyRecommend>
    </div>
  </div>
</template>

<script>
import { reqGetBanner } from "@/api/home";
import MyRecommend from '@/components/MyRecommend';
export default {
  name: "Recommend",
  components:{
    MyRecommend,
  },
  data() {
    return {
      bannerList: [],
    };
  },
  mounted() {
    this.getBannerList();
  },
  methods: {
    async getBannerList() {
      let result = await reqGetBanner();
      console.log("首页轮播图", result);
      if (result.code == 200) {
        this.bannerList = result.banners;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.carousel {
  position: relative;
  left: 25px;
  top: 10px;
  width: 1200px;
  box-sizing: border-box;
}
.el-carousel__item img {
  width: 100%;
  height: 100%;
  border-radius: 25px;
}
.el-carousel__item--card {
  width: 545px;
  margin-left: 25px;
}
.recommend_song{
  position: relative;
  left: 30px;
}
</style>