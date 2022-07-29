<template>
  <div>
    <nav-bar>
      <template v-slot:default>商品分类</template>
    </nav-bar>
    <div id="mainbox">
      <div class="ordertab">
        <van-tabs v-model:active="active" @click="tabClick">
          <van-tab title="销量排序"></van-tab>
          <van-tab title="价格排序"></van-tab>
          <van-tab title="评论排序"></van-tab>
        </van-tabs>
      </div>
      <van-sidebar class="leftmenu" v-model="activeKey">
        <van-collapse v-model="activeName" accordion>
          <van-collapse-item v-for="item in categories" :key="item.id" :title="item.name" :name="item.name">
            <van-sidebar-item v-for="sub in item.children" :key="sub.id" :title="sub.name" @click="getGoods(sub.id)" />
          </van-collapse-item>
        </van-collapse>
      </van-sidebar>
      <div class="goodslist">
        <div class="content">
          <van-card v-for="item in showGoods" :key="item.id" @click="itemClick(item.id)" :num="item.comments_count" :tag="item.comments_count>=0?'流行':'标签'" :price="(item.price).toFixed(2)" :desc="item.updated_at" :title="item.title" :thumb="item.cover_url" :lazy-load='true' />
        </div>
      </div>
    </div>
    <back-top v-show="isShowBackTop" @bTop="bTop"></back-top>
  </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar.vue';
import BackTop from 'components/common/backtop/BackTop.vue'
import {
  ref, reactive, onMounted, computed, watchEffect, nextTick

} from 'vue'
import { useRouter } from 'vue-router'
import { getCategory, getCategoryGoods } from "../../network/category";
import BScroll from 'better-scroll'
export default {
  name: 'Category',
  setup () {
    const router = useRouter()
    let activeKey = ref(0);
    let active = ref(1);
    let categories = ref([])
    let activeName = ref('1');
    let isShowBackTop = ref(false)
    // 当前排序条件
    let currentOrder = ref('sales')
    // 当前的分类ID
    let currentCid = ref(0)
    // 数据模型
    const goods = reactive({
      sales: { page: 1, list: [] },
      price: { page: 1, list: [] },
      comments_count: { page: 1, list: [] }
    })
    const showGoods = computed(() => {
      return goods[currentOrder.value].list
    })
    const init = () => {
      getCategoryGoods('sales', currentCid.value).then(res => {
        goods.sales.list = res.goods.data
      })
      getCategoryGoods('price', currentCid.value).then(res => {
        goods.price.list = res.goods.data
      })
      getCategoryGoods('comments_count', currentCid.value).then(res => {
        goods.comments_count.list = res.goods.data
      })
      // console.log(res);
    }
    let bscroll = reactive({})
    onMounted(() => {
      getCategory().then(res => {
        categories.value = res.categories
      })
      init()
      // 创建BetterScroll对象
      bscroll = new BScroll(document
        .querySelector('.goodslist'), {
        probeType: 3, //0,1,2,3 3表示只要在滚动就触发scroll事件
        click: true, //是否允许点击
        pullUpLoad: true //是否可以上拉加载更多,默认是false 
      })
      //  触发滚动事件
      bscroll.on('scroll', (position) => {
        // console.log(-position.y);
        // console.log(banref.value.offsetHeight);
        isShowBackTop.value = (-position.y) > 300
      })
      // 上拉加载数据，触发pulling
      bscroll.on('pullingUp', () => {
        console.log('上拉加载更多...');
        // // console.log(
        // //   document.querySelector('.content').clientHeight
        // // );
        const page = goods[currentOrder.value].page + 1
        getCategoryGoods(currentOrder.value, currentCid.value).then(res => {
          goods[currentOrder.value].list.push(...res.goods.data)
          goods[currentOrder.value].page += 1
          // 重新计算高度
          // nextTick(() => {
          //   // 重新计算高度
          //   bscroll && bscroll.refresh()
          // })
        })
        // // console.log('type',currentType.value,'页面', page);
        // getHomeGoods(currentType.value, page).then(
        //   res => {
        //     goods[currentType.value].list.push(...res.goods.data)
        //     goods[currentType.value].page += 1
        //   }
        // )
        // // 完成上拉，等数据请求完成，要展示数据
        bscroll.finishPullUp()
        // 重新计算高度
        nextTick(() => {
          // 重新计算高度
          bscroll && bscroll.refresh()
        })
      })
    })
    // 排序选项卡
    const tabClick = (index) => {
      let orders = ['sales', 'price', 'comments_count']
      currentOrder.value = orders[index]
      getCategoryGoods(currentOrder.value, currentCid.value).then(res => {
        goods[currentOrder.value].list = res.goods.data
        // 重新计算高度
        nextTick(() => {
          // 重新计算高度
          bscroll && bscroll.refresh()
        })
      })
      // console.log('序号', currentOrder.value);
      // console.log('过分类get商品', currentCid.value);

    }
    // 通过分类get商品
    const getGoods = (cid) => {
      currentCid.value = cid
      init();
      // console.log('序号', currentOrder.value);
      // console.log('过分类get商品', currentCid.value);
    }
    // 监听 任何一个变量有变化
    watchEffect(() => {
      nextTick(() => {
        // 重新计算高度
        bscroll && bscroll.refresh()
      })
    })
    const bTop = () => {
      bscroll.scrollTo(0, 0, 300)
    }
    const itemClick = (id) => {
      router.push({ path: '/detail', query: { id } })
    }
    return { activeKey, active, categories, activeName, tabClick, currentOrder, getGoods, goods, showGoods, bscroll, isShowBackTop, bTop, itemClick };
  },
  components: {
    NavBar,
    BackTop
  }
};
</script>
<style scoped lang="scss">
#mainbox {
  margin-top: 45px;
  display: flex;
  .ordertab {
    flex: 1;
    float: right;
    // background: red;
    height: 50px;
    z-index: 9;
    position: fixed;
    top: 45px;
    right: 0;
    left: 130px;
  }
  .leftmenu {
    position: fixed;
    top: 95px;
    left: 0;
    width: 130px;
  }
  .goodslist {
    flex: 1;
    // background: yellow;
    position: absolute;
    top: 100px;
    left: 130px;
    right: 0;
    height: 100vh;
    padding: 10px;
    text-align: left !important;
    .content {
      padding-top: 100px;
    }
  }
}
.van-card_thumb {
  width: 68px !important;
}
</style>