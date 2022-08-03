<template>
  <div class="order-list">
    <nav-bar class="nav-bar">
      <template v-slot:default>订单列表</template>
    </nav-bar>
    <van-tabs ref="tabs" @click="onChangeTab" class="order-tab">
      <van-tab title="全部"></van-tab>
      <van-tab title="待付款"></van-tab>
      <van-tab title="已支付"></van-tab>
      <van-tab title="已发货"></van-tab>
      <van-tab title="交易完成"></van-tab>
      <van-tab title="过期"></van-tab>
    </van-tabs>
    <div class="content">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh" class="order-list-refresh">
        <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" offset="10">
          <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
          <div @click="goTo(item.id)" class="order-item-box" v-for="item in list" :key="item.id">
            <div class="order-item-header">
              <span style="line-height:30px;">订单号:{{item.order_no}} <br> 创建时间:{{item.created_at}}</span>
            </div>
            <van-card v-for="sub in item.orderDetails.data" :key="sub.id" :num="sub.num" :price="(sub.price).toFixed
            (2)" :desc="sub.goods.description" :title="sub.goods.title" :thumb="sub.goods.cover_url" />
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>
  <script>
import NavBar from 'components/common/navbar/NavBar.vue';
import { useRoute, useRouter } from 'vue-router'
import { ref, reactive, toRefs, onMounted } from 'vue';
import { getOrderList } from "network/order";
export default {
  setup () {
    // List 组件通过 loading 和 finished 两个变量控制加载状态，当组件滚动到底部时，会触发 load 事件并将 loading 设置成 true。此时可以发起异步操作并更新数据，数据更新完毕后，将 loading 设置成 false 即可。若数据已全部加载完毕，则直接将 finished 设置成 true 即可。
    const router = useRouter()
    const route = useRoute()
    let tabs = ref(null)
    const state = reactive({
      loading: false,
      finished: false,
      refreshing: false,
      list: [],
      page: 1,
      totalPage: 0,
      status: 0

    })
    onMounted(() => {
      onRefresh();//初始值
    })
    const loadData = () => {
      getOrderList({ page: state.page, status: state.status, include: 'orderDetails.goods' }).then(res => {

        state.list = res.data.concat(res.data)
        state.loading = false
        state.totalPage = res.meta.pagination.total_pages
        if (state.page >= state.totalPage) {
          state.finished = true
        }

      })
    }
    const onLoad = () => {
      if (!!state.refreshing &&
        state.page < state.totalPage) {
        state.page = state.page + 1
      }
      if (state.refreshing) {
        state.list = []
        state.refreshing = false
      }
      loadData()
    }
    const onRefresh = () => {
      // 是否处于加载状态, 加载过程中不触发load事件
      state.refreshing = true
      // 清空列表数据
      state.finished = false
      // 重新加载数据
      // 将loading设置为true,表示处于加载状态
      state.loading = true
      state.page = 1
      onLoad();
    }
    // tab 切换
    const onChangeTab = (name) => {
      state.status = name
      onRefresh()
    }
    // 转到订单详情页
    const goTo = (id) => {
      router.push({ path: '/orderdetail', query: { id } })
    }
    return {
      ...toRefs(state),
      onload,
      onRefresh,
      tabs,
      onChangeTab,
      goTo
    }
  },
  components: {
    NavBar
  }
};
    </script>
 <style scoped lang="scss">
.order-list {
}
.order-tab {
  margin-top: 45px;
}
:deep .van-tab--grow {
  padding: 0 10px;
}
.content {
  padding: 10px;
  box-sizing: border-box;
  .order-item-box {
    margin-bottom: 50px;
    .order-item-header {
      text-align: left;
    }
  }
}
:deep .van-card__content {
  text-align: left;
  padding: 10px;
  box-sizing: border-box;
}
:deep .van-card__price {
  color: red;
}
</style>