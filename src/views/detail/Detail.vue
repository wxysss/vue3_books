<template>
  <div>
    <nav-bar>
      <template v-slot:default>商品详情{{ id }}</template>
    </nav-bar>
    <van-image style="margin-top:50px;" width="100%" lazy-load :src="detail.cover_url" />

    <van-card style="text-align:left;" :num="detail.stock" :price="(detail.price)+'.00'" :desc="detail.description" :title="detail.title">
      <template #tags>
        <van-tag plain type="danger">新书</van-tag>
        <van-tag plain type="danger">推荐</van-tag>
      </template>
      <template #footer>
        <van-button size="warning" @click="handleAddCart">加入购物车</van-button>
        <van-button size="danger" @click="goToCart">立即购买</van-button>
      </template>
    </van-card>
    <van-tabs v-model:active="active">
      <van-tab title="概述">
        <div class="content" v-html="detail.details">
        </div>
      </van-tab>
      <van-tab title="热评">内容 2</van-tab>
      <van-tab title="相关图书">
        <goods-list :goods="like_goods"></goods-list>
      </van-tab>

    </van-tabs>
  </div>
</template>
<script>
import { ref, onMounted, reactive, toRefs } from 'vue'
import GoodsList from 'components/content/goods/GoodsList.vue'
import { getDetail } from 'network/details'
import NavBar from 'components/common/navbar/NavBar.vue';
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { addCart } from 'network/Cart'
import { Toast } from 'vant'
export default {
  name: 'Detail',
  setup () {
    let active = ref(1)
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    let id = ref(0)
    let book = reactive({
      detail: {},
      like_goods: {}
    })
    onMounted(() => {
      id.value = route.query.id
      getDetail(id.value).then(res => {
        // console.log('res', res);
        book.detail = res.goods;
        book.like_goods = res.like_goods;
      })
    })
    // 添加购物车
    const handleAddCart = () => {
      addCart({ goods_id: book.detail.id, num: 1 }).then(res => {
        if (res.status == '204' || res.status == '201') {
          Toast.success('添加成功')
          // 设置store中的cartCount
          store.dispatch('updateCart')
        }
      })

    }
    // 立即购买
    const goToCart = () => {
      addCart({ goods_id: book.detail.id, num: 1 }).then(res => {
        if (res.status == '204' || res.status == '201') {
          Toast.success('添加成功,显示购物车')
          // 设置store中的cartCount
          store.dispatch('updateCart')
          router.push({ path: '/shopcart' })
        }
      })
    }

    return {
      id,
      ...toRefs(book),
      active,
      GoodsList,
      handleAddCart,
      goToCart
    }
  },
  components: {
    NavBar
  }
};
</script>
<style  lang="scss">
.content {
  padding: 10px;
}
</style>