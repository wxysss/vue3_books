<template>
  <div id="home">
    <nav-bar>
      <!-- <template v-slot:left></template> -->
      <template v-slot:default>首页</template>
    </nav-bar>
    <div class="wrapper">
      <div class="content">
        <div class="banners">
          <img src="../../assets/image/004.jpg" alt="">
        </div>
        <recommend-view :recommends='recommends'></recommend-view>
        <tab-control @tabClick="tabClick" :titles="['畅销', '新书', '精选']"></tab-control>
        <goods-list :goods="showGoods"></goods-list>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, reactive, onMounted, computed } from 'vue'
import NavBar from 'components/common/navbar/NavBar.vue';
import RecommendView from "../home/ChildComps/RecommendView.vue";
import TabControl from 'components/content/tabControl/TabControl.vue'
import GoodsList from 'components/content/goods/GoodsList.vue';
import { getHomeAllData, getHomeGoods } from "../../network/home";
export default {
  name: 'Home',
  setup () {
    // 临时变量
    // let temid = ref(0)
    const recommends = ref([])
    const demo = reactive({})

    // 商品列表数据模型
    const goods = reactive({
      sales: { page: 0, list: [] },
      new: { page: 0, list: [] },
      recommend: { page: 0, list: [] }
    })
    let currentType = ref('sales')
    const showGoods = computed(() => {
      return goods[currentType.value].list
    })
    onMounted(() => {
      getHomeAllData().then(res => {
        // console.log(res);
        recommends.value = res.goods.data
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
    })
    const tabClick = (index) => {
      // temid.value = index
      let types = ['sales', 'new', 'recommend']
      currentType.value = types[index]
    }
    return { recommends, tabClick, goods, showGoods }
  },
  components: {
    NavBar,
    RecommendView,
    TabControl,
    GoodsList
  }

};
</script>
<style scoped lang="scss">
.banners img {
  width: 100%;
  height: auto;
  margin-top: 45px;
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
  background: red;
}
</style>