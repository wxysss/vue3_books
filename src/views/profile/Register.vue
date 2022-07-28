<template>
  <div>
    <nav-bar>
      <template v-slot:default>新用户注册</template>
    </nav-bar>
    <div style="margin-top:50px;">
      <div style="text-align:center;padding-top:50px;">
        <van-image width="10rem" height="5rem" :src="require('../../../public/logo.jpg')" />
      </div>
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field v-model="name" name="用户名" label="用户名" placeholder="用户名" :rules="[{ required: true, message: '请填写用户名' }]" />
          <van-field v-model="password" type="password" name="密码" label="密码" placeholder="密码" :rules="[{ required: true, message: '请填写密码' }]" />
          <van-field v-model="password_confirmation" type="password" name="确认密码" label="确认密码" placeholder="密码" :rules="[{ required: true, message: '两次密码需要一致' }]" />
          <van-field v-model="email" name="电子邮箱" label="电子邮箱" placeholder="电子邮箱" :rules="[{ required: true, message: '请输入正确的电子邮箱格式' }]" />
        </van-cell-group>
        <div style="margin: 16px;">
          <van-button round block color="#44b883" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>

    </div>

  </div>
</template>
  <script>
import NavBar from 'components/common/navbar/NavBar.vue';
import { ref, reactive, toRefs } from "vue";
import { register } from "network/user";
import { Notify } from 'vant';
export default {
  setup () {
    const userinfo = reactive({
      name: '',
      password: '',
      password_confirmation: '',
      email: ''
    })
    const onSubmit = () => {
      // 先验证再提交到服务器
      if (userinfo.password != userinfo.password_confirmation) {
        Notify('两次密码不一致');
      } else {
        register(userinfo).then(res => {
          console.log(res);
        })
      }
    }
    return {
      ...toRefs(userinfo),
      onSubmit
    }
  },
  components: {
    NavBar
  }
};
    </script>
 <style scoped lang="scss">
</style>