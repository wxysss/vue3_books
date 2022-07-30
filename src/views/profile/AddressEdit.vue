<template>
  <div class="address-edit-box">
    <nav-bar class="nav-bar">
      <template v-slot:default>
        新增地址
      </template>
    </nav-bar>
    <van-address-edit class="edit" :area-list="areaList" :address-info="addressInfo" show-delete="false" show-set-default show-search-result :search-result="searchResult" :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave" @delete="onDelete" />
  </div>
</template>
  <script>
import { onMounted, reactive, toRefs, computed } from 'vue';
import NavBar from 'components/common/navbar/NavBar.vue';
import { Toast } from 'vant'
import { useRoute, useRouter } from 'vue-router';
import { addAddress, EditAddress, DeleteAddress, getAddressList } from '../../network/address'
// import { tdList } from '../../utils/address'
import { areaList } from '@vant/area-data';
export default {
  setup () {
    const router = useRouter()
    const route = useRoute()
    const state = reactive({
      // areaList: {
      //   province_list: {},
      //   city_list: {},
      //   county_list: {}
      // },
      searchResult: [],
      addressInfo: {}
    })
    onMounted(() => {
      console.log(
        '0000',
        areaList
      );
    })
    const onSave = (content) => {
      console.log(content);
      const params = {
        name: content.name,
        phone: content.tel,
        province: content.province,
        city: content.city,
        county: content.county,
        address: content.addressDetail,
        is_default: content.isDefault ? 1 : 0
      }
      // 调用接口添加数据
      addAddress(params)
      Toast('保存成功')
      setTimeout(() => {
        router.back()
      }, 1000);
    }
    const onDelete = () => {

    }
    const onChangeDetail = (val) => {
      if (val) {
        searchResult.value = [
          {
            name: '黄龙万科中心',
            address: '杭州市西湖区',
          },
        ];
      } else {
        searchResult.value = [];
      }
    };
    return {
      ...toRefs(state),
      onSave,
      onDelete,
      onChangeDetail,
      areaList
    };
  },
  components: {
    NavBar
  }
};
    </script>
 <style scoped lang="scss">
.edit {
  .van-field__body {
    textarea {
      height: 26px !important;
    }
  }
}
.address-edit-box {
  margin-top: 44px;
  .van-address-edit {
  }
}
.van-address-list__bottom {
  background: var(--color-tint);
}
:deep .van-button--danger {
  background: var(--color-tint) !important;
  border-color: var(--color-tint) !important;
}
</style>