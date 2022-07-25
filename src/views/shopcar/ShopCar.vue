<template>
  <div>
    <nav-bar>
      <template v-slot:default>购物车</template>
    </nav-bar>
  </div>
</template>
<script>
import { reactive } from 'vue'
import NavBar from 'components/common/navbar/NavBar.vue';
export default {
  name: 'ShopCar',
  setup () {
    const data = reactive({
    })
  },
  components: {
    NavBar
  }
};
</script>
<style scoped lang="scss">
</style>