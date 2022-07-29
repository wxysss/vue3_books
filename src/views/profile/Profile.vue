<template>
  <div>
    <nav-bar>
      <template v-slot:default>个人中心</template>
    </nav-bar>
    <div style="margin:15px;margin-top:100px;">
      <van-button @click="to_logout" round block color="#44BA80">退出登录</van-button>
    </div>
  </div>
</template>
<script>
// import { reactive } from 'vue'
import NavBar from 'components/common/navbar/NavBar.vue';
import { logout } from "../../network/user";
import { Toast } from "vant";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  name: 'Profile',
  setup () {
    const router = useRouter();
    const store = useStore();
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
    return {
      to_logout
    }
  },
  components: {
    NavBar
  }
};
</script>
<style scoped lang="scss">
</style>