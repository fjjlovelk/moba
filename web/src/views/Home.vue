<template>
  <div>
    <!-- 轮播图 swiper start -->
    <swiper :options="swiperOptions">
      <swiper-slide>
        <img src="../assets/images/swiper1.jpeg" class="w-100" />
      </swiper-slide>
      <swiper-slide>
        <img src="../assets/images/swiper2.jpeg" class="w-100" />
      </swiper-slide>
      <swiper-slide>
        <img src="../assets/images/swiper3.jpeg" class="w-100" />
      </swiper-slide>
      <div class="swiper-pagination px-3 pb-2" slot="pagination"></div>
    </swiper>
    <!-- 轮播图 swiper end -->

    <!-- 导航菜单 nav-icons start -->
    <div class="nav-icons mt-3 pt-4 text-black-2 bg-white text-center">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-4" v-for="n in 10" :key="n">
          <i class="sprite sprite-news"></i>
          <div class="pt-2">爆料站</div>
        </div>
      </div>
      <div class="bg-gray-4 py-2 fs-sm">
        <i class="sprite sprite-arrow mr-1"></i>
        <span>收起</span>
      </div>
    </div>
    <!-- 导航菜单 nav-icons end -->

    <!-- 卡片区域 card start -->
    <my-card icon="menu" title="新闻资讯">
      <div class="nav jc-between pt-3">
        <div class="nav-item active">
          <div class="nav-link">热门</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">新闻</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">新闻</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">新闻</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">新闻</div>
        </div>
      </div>
      <swiper>
        <swiper-slide v-for="n in 5" :key="n">
          <div class="pt-3" v-for="n in 5" :key="n">
            <span>[活动]</span>
            <span>|</span>
            <span>5月13日全服不停机更新公告</span>
            <span>5/12</span>
          </div>
        </swiper-slide>
      </swiper>
    </my-card>
    <!-- 卡片区域 card end -->
    <my-card icon="menu" title="英雄列表"></my-card>
    <my-card icon="menu" title="精彩视频"></my-card>
    <my-card icon="menu" title="图文攻略"></my-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      swiperOptions: {
        loop: true,
        autoplay: {
          delay: 2000
        },
        pagination: {
          el: '.swiper-pagination'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_variable';

.swiper-pagination /deep/ {
  text-align: right;
  .swiper-pagination-bullet {
    opacity: 1;
    background-color: map-get($colors, 'white');
    border-radius: 2px;
    &.swiper-pagination-bullet-active {
      background-color: map-get($colors, 'blue-1');
    }
  }
}

.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%;
    border-right: 1px solid $border-color;
    &:nth-child(4n) {
      border-right: none;
    }
  }
}
</style>