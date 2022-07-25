<template>
  <div>
    <nav-bar>
      <template v-slot:default>商品详情{{ id }}</template>
    </nav-bar>
  </div>
</template>
<script>
import { ref } from 'vue'
import NavBar from 'components/common/navbar/NavBar.vue';
import { useRoute } from 'vue-router'
export default {
  name: 'Detail',
  setup () {
    const route = useRoute()
    let id = ref(0)
    id.value = route.query.id
    return {
      id
    }
  },
  components: {
    NavBar
  }
};
</script>
<style scoped lang="scss">
</style>