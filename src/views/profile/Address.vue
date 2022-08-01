<template>
  <div class="address-box">
    <nav-bar class="nav-bar">
      <template v-slot:default>
        地址管理
      </template>
    </nav-bar>
    <div v-show="list.length==0" style="display:flex;justify-content:center;align-items:center;margin-top:200px;">
      还没有地址信息，去添加吧!
    </div>
    <div class="address-item">
      <van-address-list v-model="chosenAddressId" :list="list" default-tag-text="默认" @add="onAdd" @edit="onEdit" @select="select" />
    </div>
  </div>
</template>
  <script>
import { onMounted, reactive, toRefs } from 'vue';
import NavBar from 'components/common/navbar/NavBar.vue';
import { getAddressList } from '../../network/address'
import { useRoute, useRouter } from 'vue-router';
export default {
  setup () {
    const router = useRouter()
    const route = useRoute()
    const state = reactive({
      chosenAddressId: '1',
      list: []
    })
    onMounted(() => {
      getAddressList().then(res => {
        if (res.data.length == 0) {
          state.list = []
          return
        }
        state.list = res.data.map(item => {
          return {
            id: item.id,
            name: item.name,
            tel: item.phone,
            address: `${item.province}${item.city}${item.county}${item.address}`,
            isDefault: !!item.is_default
          }
        })
        console.log('列表', res.data);
      })
    })
    const onAdd = () => {
      router.push({ path: '/addressedit', query: { type: 'add' } })
    }
    const onEdit = (item) => {
      router.push({ path: '/addressedit', query: { type: 'edit', addressId: item.id } })
    }
    const select = (item) => {
      router.push({ path: '/createorder', query: { addressId: item.id } })
    }
    return {
      ...toRefs(state),
      onAdd,
      onEdit,
      select
    }
  },
  components: {
    NavBar
  }
};
    </script>
 <style scoped lang="scss">
.address-box {
  // height: 300px;
  height: 100%;
  .van-radio {
    display: none;
  }
  .address-item {
    height: 100%;
    margin-top: 45px;
    // background: pink;
    overflow: scroll;
    .van-button {
      background: var(--color-tint);
      border-color: var(--color-tint);
    }
  }
}
.van-address-list {
  height: 90vh;
  overflow: scroll;
  padding-bottom: 90px;
}
:deep .van-address-list__bottom {
  bottom: 50px !important;
}
:deep .van-button--danger {
  background: var(--color-tint) !important;
  border-color: var(--color-tint) !important;
}
</style>