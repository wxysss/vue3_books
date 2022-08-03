<template>
  <div id="home">
    <nav-bar>
      <!-- <template v-slot:left></template> -->
      <template v-slot:default>首页</template>
    </nav-bar>
    <tab-control @tabClick="tabClick" :titles="['畅销', '新书', '精选']" v-show="isTabFixed"></tab-control>
    <div class="wrapper">
      <div class="content">
        <div ref="banref">
          <home-swiper :banners="banners"></home-swiper>
          <!-- <div class="banners">
            <img src="../../assets/image/004.jpg" alt="">
          </div> -->
          <recommend-view :recommends='recommends'></recommend-view>
        </div>

        <tab-control @tabClick="tabClick" :titles="['畅销', '新书', '精选']"></tab-control>
        <goods-list :goods="showGoods"></goods-list>
      </div>
      <back-top v-show="isShowBackTop" @bTop="bTop"></back-top>
    </div>
  </div>
</template>
<script>
import { ref, reactive, onMounted, computed, watchEffect, nextTick } from 'vue'
import HomeSwiper from './ChildComps/HomeSwiper.vue'
import NavBar from 'components/common/navbar/NavBar.vue';
import RecommendView from "../home/ChildComps/RecommendView.vue";
import TabControl from 'components/content/tabControl/TabControl.vue'
import BackTop from 'components/common/backtop/BackTop.vue'
import GoodsList from 'components/content/goods/GoodsList.vue';
import { getHomeAllData, getHomeGoods } from "network/home";
import BScroll from 'better-scroll'

export default {
  name: 'Home',
  setup () {
    let isTabFixed = ref(false)
    let isShowBackTop = ref(false)
    let banref = ref(null)
    // 临时变量
    // let temid = ref(0)
    const recommends = ref([])
    const demo = reactive({})

    // 商品列表数据模型
    const goods = reactive({
      sales: { page: 1, list: [] },
      new: { page: 1, list: [] },
      recommend: { page: 1, list: [] }
    })
    let currentType = ref('sales')
    const showGoods = computed(() => {
      return goods[currentType.value].list
    })
    let bscroll = reactive({})
    let banners = ref([])
    onMounted(() => {
      getHomeAllData().then(res => {
        recommends.value = res.goods.data
        banners.value = res.slides
      })
      getHomeGoods('sales').then(res => {
        goods.sales.list = res.goods.data
      })
      getHomeGoods('recommend').then(res => {
        goods.recommend.list = res.goods.data
      })
      getHomeGoods('new').then(res => {
        goods.new.list = res.goods.data
      })
      // 创建BetterScroll对象
      bscroll = new BScroll(document
        .querySelector('.wrapper'), {
        probeType: 3, //0,1,2,3 3表示只要在滚动就触发scroll事件
        click: true, //是否允许点击
        pullUpLoad: true //是否可以上拉加载更多,默认是false 
      })
      //  触发滚动事件
      bscroll.on('scroll', (position) => {
        isShowBackTop.value = isTabFixed.value = (-position.y) > banref.value.offsetHeight
      })
      // 上拉加载数据，触发pulling
      bscroll.on('pullingUp', () => {
        const page = goods[currentType.value].page + 1
        getHomeGoods(currentType.value, page).then(
          res => {
            goods[currentType.value].list.push(...res.goods.data)
            goods[currentType.value].page += 1
          }
        )
        // 完成上拉，等数据请求完成，要展示数据
        bscroll.finishPullUp()
        // 重新计算高度
        bscroll.refresh()
      })

    })
    const tabClick = (index) => {
      // temid.value = index
      let types = ['sales', 'new', 'recommend']
      currentType.value = types[index]
      nextTick(() => {
        // 重新计算高度
        bscroll && bscroll.refresh()
      })
    }
    // 监听 任何一个变量有变化
    watchEffect(() => {
      nextTick(() => {
        // 重新计算高度
        bscroll && bscroll.refresh()
      })
    })
    const bTop = () => {
      bscroll.scrollTo(0, 0, 500)
    }
    return { recommends, tabClick, goods, showGoods, isTabFixed, isShowBackTop, banref, bTop, banners }
  },
  components: {
    HomeSwiper,
    NavBar,
    RecommendView,
    TabControl,
    GoodsList,
    BackTop
  }

};
</script>
<style scoped lang="scss">
.banners img {
  width: 100%;
  height: auto;
  // margin-top: 45px;
}

#home {
  height: 100vh;
  position: relative;
}

.wrapper {
  position: absolute;
  top: 45px;
  bottom: 50px;
  left: 0;
  right: 0;
  overflow: hidden;
  // background: red;
}
</style>