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
          <van-card num="2" tag="标签" price="2.00" desc="描述信息" title="商品标题" thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg" origin-price="10.00" />
          <van-card num="2" tag="标签" price="2.00" desc="描述信息" title="商品标题" thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg" origin-price="10.00" />

        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar.vue';
import {
  ref, reactive, onMounted
} from 'vue'
import { getCategory } from "../../network/Category";
export default {
  name: 'Category',
  setup () {
    let activeKey = ref(0);
    let active = ref(1);
    let categories = ref([])
    let activeName = ref('1');
    // 当前排序条件
    let currentOrder = ref('sales')
    // 当前的分类ID
    let currentCid = ref(0)
    onMounted(() => {
      getCategory().then(res => {
        categories.value = res.categories
      })
    })
    // 排序选项卡
    const tabClick = (index) => {
      let orders = ['sales', 'price', 'comments_count']
      currentOrder.value = orders[index]
      console.log('序号', currentOrder.value);
      console.log('过分类get商品', currentCid.value);

    }
    // 通过分类get商品
    const getGoods = (cid) => {
      currentCid.value = cid
      console.log('序号', currentOrder.value);
      console.log('过分类get商品', currentCid.value);
    }
    return { activeKey, active, categories, activeName, tabClick, currentOrder, getGoods };
  },
  components: {
    NavBar
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
  }
}
</style>