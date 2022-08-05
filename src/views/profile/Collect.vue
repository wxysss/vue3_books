<template>
  <div>
    <nav-bar class="nav-bar">
      <template v-slot:default>我的收藏</template>
    </nav-bar>

  </div>
</template>
  <script>
import NavBar from 'components/common/navbar/NavBar.vue';
export default {
  setup () {
  },
  components: {
    NavBar
  }
};
    </script>
 <style scoped lang="scss">
</style>