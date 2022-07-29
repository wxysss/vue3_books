<template>
  <div>
    <nav-bar class="nav-bar">
      <template v-slot:default>购物车{{$store.state.cartCount}}</template>
    </nav-bar>
    <div class="cart-box">
      <!-- <div class="cart-body">
        <van-checkbox-group ref="checkboxGroup">
          <van-swipe-cell :right-width="50">
            <div class="good-item">
              <van-checkbox name="" />
              <div class="good-img"><img src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" alt=""></div>
              <div class="good-desc">
                <div class="good-title">
                  <span>细说PHP</span>
                  <span>x100</span>
                </div>
                <div class="good-btn">
                  <div class="price"><small>￥</small>999.00</div>
                  <van-stepper integer :min="1" :max="10" :model-value="5" name="10" async-change />
                </div>
              </div>
            </div>
            <template #right>
              <van-button square icon="delete" type="danger" class="delete-button" />
            </template>
          </van-swipe-cell>
        </van-checkbox-group>
      </div> -->
      <van-submit-bar class="submit-all" :price="9999" button-text="结算" @submit="onSubmit">
        <van-checkbox v-model="checked">全选</van-checkbox>
      </van-submit-bar>
      <div class="empty" v-if="!list.length">
        <img style="width:100px;" src="empty-cart" srcset="../../assets/image/default.png" alt="空购物车">
        <div class="title" style="margin-top:15px;">购物车空空如也</div>
        <van-button style="margin-top:15px;" round color="#42b983" block>前往选购</van-button>
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
      list: []
    })
    return {
      ...toRefs(state)
    }
  },
  components: {
    NavBar
  }
};
</script>
<style scoped lang="scss">
.cart-box {
  .cart-body {
    margin: 60px 0 100px 0;
    padding-left: 10px;
    display: flex;
  }
  .submit-all {
    position: absolute;
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