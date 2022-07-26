<template>
  <div class="nav-bar">
    <div class="left" @click="goback">
      <slot name="left">
        <img src="~assets/image/left_arrow.png" alt="">
      </slot>
    </div>
    <div class="center">
      <slot></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>
  <script>
import {
  useRouter
} from 'vue-router'
import { reactive } from 'vue'
import NavBar from '@/components/common/navbar/NavBar.vue';
export default {
  name: 'NavBar',
  setup () {
    const router = useRouter();
    const goback = () => {
      router.go(-1)
    }

    const data = reactive({
    })
    return { goback }
  },
  components: {
    NavBar
  }
};
</script>
 <style scoped lang="scss">
.nav-bar {
  display: flex;
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
  height: 45px;
  line-height: 45px;
  text-align: center;
  box-shadow: 0 2px rgba(100, 100, 100, 0.1);
}

.left,
.right {
  width: 60px;
}

.left img {
  width: 45px;
  padding: 12px;
}

.center {
  //  background: red;
  flex: 1;
}
</style>