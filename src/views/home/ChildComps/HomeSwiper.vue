<template>
  <van-swipe v-if="banners.length" class="my-swipe" :autoplay="3000" indicator-color="white">
    <van-swipe-item v-for="item in banners" :key="
    item.id">
      <img :src="item.img_url
    " alt="">
    </van-swipe-item>

  </van-swipe>
</template>
  <script>
export default {
  props: {
    banners: Array,
    default () {
      return []
    }
  },
  setup () {
  }
};
    </script>
 <style scoped lang="scss">
img {
  width: 100%;
  height: auto;
}
</style>
    