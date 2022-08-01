<template>
  <div class="create-order">
    <nav-bar class="nav-bar">
      <template v-slot:default>订单预览</template>
    </nav-bar>
    <div class="address-wrap">
      <div class="name" @click="goTo">
        <span style="font-weight:bold;">{{address.name}}</span>
        &nbsp;
        <span>{{address.phone}}</span>
      </div>
      <div class="address">
        {{address.province}}&nbsp;{{address.city}}&nbsp;{{address.county}}&nbsp;{{address.address}}
      </div>
      <van-icon class="arrow" name="arrow" />
    </div>
    <div class="good">
      <div class="good-item" v-for="(item) in cartList" :key="item.id">
        <div class="good-img"><img v-lazy="item.goods.cover_url" alt=""></div>
        <div class="good-desc">
          <div class="good-title">
            <span>{{item.goods.title}}</span>
            <span>x{{item.num}}</span>
          </div>
          <div class="good-btn">
            <div class="price">￥{{(item.goods.price).toFixed(2)}}</div>
          </div>
        </div>
      </div>
    </div>
    <van-submit-bar class="submit-all" :price="total*100" button-text="生成订单" @submit="handleCreateOrder">商品金额</van-submit-bar>
    <van-popup closeable v-model:show="showPay" close-on-click-overlay="false" position="bottom" :style="{ height: '30%' }" @close="close">
      <div :style="{width:'90%',margin: '0 auto',padding:'50px 0'}">
        <van-button :style="{marginBottom:'10px'}" color="#1989fa" block>支付宝支付</van-button>
        <van-button color="#4fc08d" block>微信支付</van-button>
      </div>
    </van-popup>
  </div>
</template>
  <script>
import NavBar from 'components/common/navbar/NavBar.vue';
import { reactive, onMounted, toRefs, computed } from "vue";
import { getOrderPreview, createOrder, payOrder, payOrderStatus } from "network/order";
import { Toast } from "vant";
import { useStore } from 'vuex'
import {
  useRoute, useRouter
} from "vue-router";
export default {
  setup () {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()
    const state = reactive({
      // 购物车列表
      cartList: [],
      // 地址信息
      address: {},
      showPay: false
    })
    const init = () => {
      Toast.loading({ message: '加载中...', forbidClick: true })
      getOrderPreview().then(res => {
        // 获取地址信息
        let address = res.address.filter(n => n.is_default == '1')
        if (address.length == 0) {
          state.address = {
            address: '还没有设置默认地址,请选择或添加地址信息'
          }
        } else {
          state.address = address[0]
        }
        // 获取购物车信息
        state.cartList = res.carts;
        Toast.clear();
      })
    }


    onMounted(() => {
      init()
    })
    const goTo = () => {
      router.push({ path: '/address' })
    }
    const handleCreateOrder = () => {
      const params = {
        address_id: state.address.id
      }
      createOrder(params).then(res => {
        console.log(res);
        Toast('创建订单成功')
        store.dispatch('updateCart')
        state.showPay = true
      })
    }
    const close = () => { }
    const total = computed(() => {
      let sum = 0
      state.cartList.forEach(item => {
        sum += parseInt(item.num) * parseFloat(item.goods.price)
      })
      return sum
    })
    return {
      ...toRefs(state),
      goTo,
      handleCreateOrder,
      close,
      total
    }
  },
  components: {
    NavBar
  }
};
    </script>
 <style scoped lang="scss">
.create-order {
  background: #f9f9f9;
  .address-wrap {
    text-align: left;
    margin-bottom: 20px;
    background: #fff;
    position: relative;
    margin-top: 44px;
    font-size: 14px;
    padding: 15px;
    color: #222333;
    .name,
    .address {
      margin: 10px 0;
    }
    .arrow {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 20px;
    }
    &::before {
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      height: 2px;
      background: repeating-linear-gradient(
        -45deg,
        var(--van-warning-color) 0,
        var(--van-warning-color) 20%,
        transparent 0,
        transparent 25%,
        var(--van-primary-color) 0,
        var(--van-primary-color) 45%,
        transparent 0,
        transparent 50%
      );
      background-size: 80px;
      content: " ";
    }
  }
  .good {
    margin-bottom: 120px;
  }
  .good-item {
    padding: 10px;
    background: #fff;
    display: flex;
    align-content: center;
    .good-img {
      img {
        width: 100px;
        height: auto;
      }
    }
    .good-desc {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
      padding: 20px;
      .good-title {
        display: flex;
        justify-content: space-between;
      }
      .good-btn {
        display: flex;
        justify-content: space-between;
        .price {
          font-size: 16px;
          color: red;
          line-height: 28px;
        }
        .van-icon-delete {
          font-size: 20px;
          margin-top: 4px;
        }
      }
    }
  }
  .pay-wrap {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;
    padding: 10px 0;
    padding-bottom: 50px;
    border-top: 1px solid #e9e9e9;
    > div {
      display: flex;
      justify-content: space-between;
      padding: 0 5%;
      margin: 10px 0;
      font-size: 14px;
      span:nth-child(2) {
        color: red;
        font-size: 18px;
      }
    }
    .pay-btn {
      position: fixed;
      bottom: 7px;
      right: 0;
      left: 0;
      width: 90%;
      margin: 0 auto;
    }
  }
}

.submit-all {
  margin-bottom: 50px;
  z-index: 9 !important;
}
</style>