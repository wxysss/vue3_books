<template>
  <div class="home">
    {{ banner }}
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { getHomeAllData } from "../network/home.js";
// @ is an alias to /src
// import HelloWorld from 'components/HelloWorld.vue'

export default {
  name: 'HomeView',
  setup (props) {
    const banner = ref([])
    onMounted(() => {
      getHomeAllData().then(res => {
        banner.value = res.slides
      })
    })

    return { banner }
  },
  components: {
    // HelloWorld
  }
}
</script>