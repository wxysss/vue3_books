<template>
  <div class="backTop" @click="backTop"></div>
</template>
  <script>
export default {
  setup (props, { emit }) {
    return {
      backTop: () => {
        emit('bTop')
      }
    }
  }
};
    </script>
 <style scoped>
.backTop {
  width: 40px;
  height: 40px;
  position: fixed;
  bottom: 80px;
  right: 30px;
  background: #fcfcfc url("~assets/image/up.png") no-repeat center center;
  z-index: 20px;
  box-shadow: 5px 5px 5px #888;
  border-radius: 50%;
}
</style>
