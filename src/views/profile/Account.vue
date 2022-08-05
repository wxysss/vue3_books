<template>
  <div>
    <nav-bar class="nav-bar">
      <template v-slot:default>账号管理</template>
    </nav-bar>
    <div class="content">
      <van-cell-group>
        <van-cell title="头像" class="avatar"><img :src="list.avatar_url" alt=""></van-cell>
        <van-cell title="邮箱" :value="list.email" />
        <van-cell title="姓名" :value="list.name" />
      </van-cell-group>
      <van-button round block type="success" @click="changePwd">修改密码</van-button>
    </div>
    <van-popup v-model:show="show">
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field v-model="old_password" type="password" name="old_password" label="旧密码" placeholder="旧密码" :rules="[{ required: true, message: '请填写旧密码' }]" />
          <van-field v-model="password" type="password" name="password" label="密码" placeholder="密码" :rules="[{ required: true, message: '请填写密码' }]" />
          <van-field v-model="password_confirmation" type="password" name="password_confirmation" label="确认密码" placeholder="确认密码" :rules="[{ required: true, message: '请填写确认密码' }]" />
        </van-cell-group>
        <div style="margin: 16px;">
          <van-button round block type="primary" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </van-popup>
  </div>
</template>
  <script>
import NavBar from 'components/common/navbar/NavBar.vue';
import { getUser, changePassword } from '../../network/user'
import { reactive, onMounted, toRefs } from "vue";
import { useRouter } from "vue-router";
import { Toast } from 'vant';
export default {
  setup () {
    const router = useRouter()
    const state = reactive({
      list: '',
      show: false,
      old_password: '',
      password: '',
      password_confirmation: ''
    })
    onMounted(() => {
      getUser().then(res => {
        state.list = res
      })
    })
    const changePwd = () => {
      state.show = true;
    }
    const onSubmit = (values) => {
      const params = {
        old_password: state.old_password,
        password: state.password,
        password_confirmation: state.password_confirmation
      }
      changePassword(params).then(res => {
        console.log('test', res);
        if (res.status == 204) {
          Toast('修改成功,请重新登录')
          setTimeout(() => {
            router.push({ path: '/login' })
          }, 1000);
        } else {
          Toast(res.message)
        }
      }).catch(err => {
        console.log('err', err);
      })


    };

    return {
      ...toRefs(state),
      changePwd,
      onSubmit
    }
  },
  components: {
    NavBar
  }
};
    </script>
 <style scoped lang="scss">
.content {
  margin-top: 50px;
  text-align: left;
  .avatar {
    display: flex;
    justify-content: space-between;
    width: 100%;
    img {
      width: 40px;
    }
    :deep .van-cell__title,
    .van-cell__value {
      align-self: center;
    }
  }
  :deep .van-button {
    width: 80%;
    margin: 0 auto;
    margin-top: 15px;
  }
  :deep .van-cell-group {
    margin-bottom: 50px;
  }
  :deep .van-button--success {
    background: var(--color-tint);
    border: var(--van-button-border-width) solid var(--color-tint);
  }
}
:deep .van-popup {
  width: 80%;
}
</style>