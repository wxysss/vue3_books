<template>
  <div id="box">
    <nav-bar class="nav-bar">
      <template v-slot:default>个人中心</template>
    </nav-bar>
    <div class="user-box">
      <div class="user-info">
        <div class="info">
          <img :src="user.avatar_url" alt="">
          <div class="user-desc">
            <span>昵称: {{user.name}}</span>
            <span>登录名: {{user.email}}</span>
            <span class="name">个性签名: 红红火火恍恍惚惚</span>
          </div>
        </div>
      </div>
      <ul class="user-list">
        <li class="van-hairline--bottom" @click="
        goTo('/collect')">
          <span>我的收藏</span>
          <van-icon name="arrow" />

        </li>
        <li class="van-hairline--bottom" @click="
        goTo('/order')">
          <span>我的订单</span>
          <van-icon name="arrow" />
        </li>
        <li class="van-hairline--bottom" @click="
        goTo('/account')">
          <span>账号管理</span>
          <van-icon name="arrow" />
        </li>
        <li class="van-hairline--bottom" @click="
        goTo('/address')">
          <span>地址管理</span>
          <van-icon name="arrow" />
        </li>
        <li class="van-hairline--bottom" @click="
        goTo('/aboutus')">
          <span>关于我们</span>
          <van-icon name="arrow" />
        </li>
      </ul>
    </div>
    <div style="margin:15px;">
      <van-button @click="to_logout" round block color="#44BA80">退出登录</van-button>
    </div>
  </div>
</template>
<script>
// import { reactive } from 'vue'
import NavBar from 'components/common/navbar/NavBar.vue';
import { logout, getUser } from "network/user";
import { Toast } from "vant";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { onMounted, reactive, toRefs } from 'vue';

export default {
  name: 'Profile',
  setup () {
    const router = useRouter();
    const store = useStore();
    const state = reactive({
      user: {}
    })
    onMounted(() => {
      getUser().then(res => {
        console.log('个人信息详情', res);
        state.user = res
      })
    })
    const to_logout = () => {
      logout().then(res => {
        if (res.status == '204') {
          Toast.success('退出成功')
          // 清除token
          window.localStorage.setItem('token', '')
          // 清除token以后设置登录状态为false
          store.commit('setIsLogin', false)
          setTimeout(() => {
            router.push({ path: '/login' })
          }, 500);
        }
      })
    }
    // 跳转方法
    const goTo = (path, query) => {
      router.push({ path, query: query || {} })
    }
    return {
      to_logout,
      ...toRefs(state),
      goTo
    }
  },
  components: {
    NavBar
  }
};
</script>
<style scoped lang="scss">
#box {
  background: #fcfcfc;
  height: 100vh;
}
.user-box {
  // margin-top: 65px;
  .user-header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    height: 44px;
    line-height: 44px;
    padding: 0 16px;
    color: #293525;
    background: #fff;
    border-bottom: 1px solid #dcdcdc;
    .user-name {
      font-size: 14px;
    }
  }
  .user-info {
    width: 94%;
    margin: 10px;
    height: 115px;
    background: linear-gradient(90deg, #31c7a7, #a1c7c7);
    box-shadow: 0 2px 5px #269090;
    border-radius: 6px;
    margin-top: 50px;
    text-align: left;
    .info {
      position: relative;
      display: flex;
      width: 100%;
      height: 100%;
      padding: 25px 20px;
      box-sizing: border-box;
      img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        margin-top: 4px;
      }
      .user-desc {
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        line-height: 20px;
        font-size: 14px;
        color: #fff;
        span {
          color: #fff;
          font-size: 14px;
          padding: 2px 0;
        }
      }
      .account-setting {
        position: absolute;
        top: 10px;
        right: 20px;
        font-size: 13px;
        color: #fff;
        .van-icon-setting-o {
          font-size: 16px;
          vertical-align: middle;
          margin-right: 4px;
        }
      }
    }
  }
  .user-list {
    padding: 0 8px;
    box-sizing: border-box;
    margin-top: 40px;
    li {
      padding-left: 5px;
      padding-right: 5px;
      height: 40px;
      line-height: 40px;
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      .van-icon-arrow {
        margin-top: 13px;
      }
      margin: 20px 0 !important;
      background: #fff;
      border-radius: 3px;
    }
  }
}
</style>