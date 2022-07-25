<template>
  <div>
    <nav-bar>
      <template v-slot:default>商品分类</template>
    </nav-bar>
  </div>
</template>
<script>
import { reactive } from 'vue'
import NavBar from 'components/common/navbar/NavBar.vue';
export default {
  name: 'Category',
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