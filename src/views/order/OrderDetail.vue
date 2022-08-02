<template>
  <div class="order-detail-box">
    <nav-bar class="nav-bar">
      <template v-slot:default>订单详情</template>
    </nav-bar>
    <div class="order-status">
      <div class="status-item">
        <label>订单状态</label>
        <span>{{statusString}}</span>
      </div>
      <div class="status-item">
        <label>订单编号</label>
        <span>{{detail.order_no}}</span>
      </div>
      <div class="status-item">
        <label>下单时间</label>
        <span>{{detail.created_at}}</span>
      </div>
      <!-- v-if="detail.status == 1" -->
      <van-button @click="showPayFn" style="margin:20px auto; " color="#42b983" block>去支付</van-button>
      <!-- v-if="detail.status == 3" -->
      <van-button block @click="handleConfirmOrder">确认订单</van-button>
    </div>
    <div class="order-price">
      <div class="price-item">
        <label>商品金额</label>
        <span style="color:red">￥{{total.toFixed(2)}}</span>
      </div>
      <div class="price-item">
        <label>配送方式</label>
        <span>普通快递</span>
      </div>
    </div>
    <van-card v-for="item in detail.orderDetails.data" :key="item.id" :num="item.num" :price="(item.price.toFixed(2))" style="margin:10px;" :desc="item.goods.description" :title="item.goods.title" :thumb="item.goods.cover_url" />
    <!-- <van-card num="2" price="2.00" style="margin:10px;" desc="全场包邮" title="《细说PHP》" thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg" /> -->
    <div style="width:100%;height:50px;">

    </div>
    <van-popup v-model:show="showPay" position="bottom" :style="{height:'40%'}">
      <div style="{width:'90%',margin:'0 auto',padding:'50px 0'}">
        <van-grid :border="false" :column-num="2">
          <van-grid-item>
            支付宝二维码<br>
            <van-image style="marginTop:10px;" width="150" height="150" :src="aliyun" />
          </van-grid-item>
          <van-grid-item>
            微信二维码<br>
            <van-image style="marginTop:10px;" width="150" height="150" :src="wechat" />
          </van-grid-item>
          <!-- 123654 -->
        </van-grid>
      </div>
    </van-popup>
  </div>
</template>
  <script>
import NavBar from 'components/common/navbar/NavBar.vue';
import {
  reactive, onMounted, computed,
  toRefs
} from "vue";
import { getOrderDetail, confirmOrder, payOrder, payOrderStatus, viewExpress } from "network/order";
import { Dialog, Toast } from "vant";
import { useRoute, useRouter } from "vue-router";
export default {
  setup () {
    const route = useRoute()
    const router = useRouter()
    const state = reactive({
      orderNo: '', //订单ID
      detail: {
        orderDetails: {
          data: []
        },
        status: 0
      },
      showPay: false,
      aliyun: '',
      wechat: ''
    })
    const init = () => {
      const { id } = route.query
      state.orderNo = id
      getOrderDetail(id).then(res => {
        console.log('获取详情', res);
        state.detail = res
      })


    }

    onMounted(() => {
      Toast({ message: '加载中...', forbidClick: true })
      init()
      Toast.clear()
    })
    const statusString = computed(() => {
      // 订单状态: 1下单 2支付 3发货 4收货 5过期
      let status = [' ', '已下单', '已支付', '已发货', '确认收货', '已过期']
      return status[state.detail.status]
    })
    const total = computed(() => {
      let sum = 0
      state.detail.orderDetails.data.forEach(item => {
        sum += parseInt(item.num) * parseFloat(item.price)
      })
      return sum
    })
    const showPayFn = () => {
      state.showPay = true
      payOrder(state.orderNo, { type: 'aliyun' }).then(res => {
        console.log('二维码', res);
        state.aliyun = res.qr_code_url
        state.wechat = res.qr_code_url
      })
      // 轮询查看
      const timer = setInterval(() => {
        payOrderStatus(state.orderNo).then(res => {
          console.log('test');
          if (res == 2) {
            clearInterval(timer)
            router.push({ path: '/orderdetail', query: { id: state.orderNo } })
          }

        })
      }, 2000);
    }
    const handleConfirmOrder = () => {
      Dialog.confirm({
        title: '是否确认订单?'
      }).then(() => {
        confirmOrder(state.orderNo).then(res => {
          console.log(res);
          Toast('确认成功')
          init()
        })
      }).catch(() => {

      })
    }
    const close = () => {
      Dialog.close()
    }

    return {
      ...toRefs(state),
      statusString,
      total,
      showPayFn,
      handleConfirmOrder,
      close
    }
  },
  components: {
    NavBar
  }
};
    </script>
 <style scoped lang="scss">
.order-detail-box {
  // background: lightgreen;
  height: 100vh;
  text-align: left;
  padding-top: 80px;
  font-size: 14px;
  .order-status {
    padding: 10px;
    .status-item {
      margin: 10px;
      display: flex;
      justify-content: space-between;
      label {
        font-weight: bold;
      }
    }
  }
  .order-price {
    padding: 10px;
    .price-item {
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
      label {
        font-weight: bold;
      }
    }
  }
}
</style>