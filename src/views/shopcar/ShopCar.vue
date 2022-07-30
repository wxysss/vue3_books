<template>
  <div>
    <nav-bar class="nav-bar">
      <template v-slot:default>购物车{{$store.state.cartCount}}</template>
    </nav-bar>
    <div class="cart-box">
      <div class="cart-body">
        <van-checkbox-group ref="checkboxGroup" @change="groupChange" v-model="result">
          <van-swipe-cell :right-width="50" v-for="item in list" :key="item.id">
            <div class="good-item">
              <van-checkbox :name="item.id" />
              <div class="good-img"><img :src="item.goods.cover_url" alt=""></div>
              <div class="good-desc">
                <div class="good-title">
                  <span>{{item.goods.title}}</span>
                  <span style="text-align:right;">x{{item.goods.stock}}</span>
                </div>
                <div class="good-btn">
                  <div class="price"><small>￥</small>{{item.goods.price+'.00'}}</div>
                  <van-stepper integer :min="1" :max="item.goods.stock" :model-value="item.num" :name="item.id" async-change @change="onChange" />
                </div>
              </div>
            </div>
            <template #right>
              <van-button square icon="delete" type="danger" class="delete-button" style="height:80px;" @click="deleteGood(item.id)" />
            </template>
          </van-swipe-cell>
        </van-checkbox-group>
      </div>
      <van-submit-bar class="submit-all" :price="total*100" button-text="结算" @submit="onSubmit">
        <van-checkbox v-model:checked="checkAll" @click="allCheck">全选</van-checkbox>
      </van-submit-bar>
      <div class="empty" v-if="!list.length">
        <img style="width:100px;" src="empty-cart" srcset="../../assets/image/default.png" alt="空购物车">
        <div class="title" style="margin-top:15px;">购物车空空如也</div>
        <van-button style="margin-top:15px;" round color="#42b983" block @click="goTo">前往选购</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, reactive, toRefs, onMounted, computed } from 'vue'
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { getCart, deleteCartItem, checkedCart, modifyCart } from "../../network/Cart";
import { Toast, Stepper } from 'vant';
import NavBar from 'components/common/navbar/NavBar.vue';

export default {
  name: 'ShopCart',
  setup () {
    const router = useRouter()
    const store = useStore()
    // 数据模型，状态
    const state = reactive({
      list: [],
      result: [], //id数组
      checkAll: true
    })
    // 复选框改变处理
    const groupChange = (result) => {
      if (result.length == state.list.length) {
        state.checkAll = true
      } else {
        state.checkAll = false
      }
      // state.result = result
      checkedCart({ cart_ids: result })
    }
    const allCheck = () => {
      if (!state.checkAll) {
        state.result = state.list.map(item => item.id)
        state.checkAll = true
      } else {
        state.result = [];
        state.checkAll = false
      }
    }
    // 前往购物
    const goTo = () => {
      router.push({ path: '/home' })
    }
    // 初始化购物车数据
    const init = () => {
      Toast.loading({
        message: '加载中...',
        forbidClick: true

      });
      getCart('include=goods').then((res) => {
        state.list = res.data
        state.result = res.data.filter(n => n.is_checked == 1).map(item => item.id)
        Toast.clear()
      })
    }
    onMounted(() => {
      init()
    })
    // 通过计算属性计算总价
    const total = computed(() => {
      let sum = 0
      state.list.filter(item => state.result.includes(item.id)).forEach(n => {
        sum += parseInt(n.num) * parseFloat(n.goods.price)
      })
      return sum

    })

    // 异步改变购物车数量
    const onChange = (value, detail) => {
      Toast.loading({
        message: '修改中...',
        forbidClick: true
      });
      modifyCart(detail.name, { num: value }).then((res) => {
        // 将在onMNounted中的list中的num也要改
        state.list.forEach(item => {
          if (item.id == detail.name) {
            item.num = value
          }
        })
        Toast.clear()

      })
    }
    // 删除商品
    const deleteGood = (id) => {
      deleteCartItem(id).then(res => {
        init() //重新初始化
        store.dispatch('updateCart') //改变vuex中的状态数量
      })
    }
    // 创建订单
    const onSubmit = () => {
      if (state.result.length == 0) {
        Toast.fail('请选择商品进行结算')
      } else {
        router.push({ path: '/createorder' })
      }

    }
    return {
      ...toRefs(state),
      goTo,
      onChange,
      groupChange,
      allCheck,
      deleteGood,
      total,
      onSubmit
    }
  },
  components: {
    NavBar
  }
};
</script>
<style scoped lang="scss">
.cart-box {
  font-size: 14px;
  .cart-body {
    margin: 60px 0 100px 0;
    padding-left: 10px;
    .good-item {
      display: flex;
      // justify-content: space-between;
      align-items: center;
      margin: 15px;
      .good-img {
        width: 80px;
        height: 80px;
        padding: 10px;
        box-sizing: border-box;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .good-title {
        display: flex;
        justify-content: space-between;
      }
      .good-btn {
        height: 50px;
        line-height: 50px;
        display: flex;
        justify-content: space-between;
        align-content: center;
        .price {
          color: red;
          font-size: 14px;
          text-align: left;
        }
      }
      .good-desc {
        flex: 1;
      }
    }
  }
  .submit-all {
    position: fixed;
    bottom: 52px;
    // height: 150px;
  }
  .empty {
    width: 50%;
    height: 100%;
    margin: 0 auto;
    position: fixed;
    top: 25%;
    left: 0;
    right: 0;
    margin: 0 auto;
  }
}
</style>