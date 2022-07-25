<template>
  <div>
    <nav-bar>
      <template v-slot:default>个人中心</template>
    </nav-bar>
  </div>
</template>
<script>
import { reactive } from 'vue'
import NavBar from 'components/common/navbar/NavBar.vue';
export default {
  name: 'Profile',
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