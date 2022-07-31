<template>
  <div class="address-edit-box">
    <nav-bar class="nav-bar">
      <template v-slot:default>
        {{title}}
      </template>
    </nav-bar>
    <van-address-edit class="edit" :area-list="areaList" :address-info="addressInfo" :show-delete="type=='edit'" show-set-default show-search-result :search-result="searchResult" :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave" @delete="onDelete" />
  </div>
</template>
  <script>
import { onMounted, reactive, toRefs, computed } from 'vue';
import NavBar from 'components/common/navbar/NavBar.vue';
import { Toast } from 'vant'
import { useRoute, useRouter } from 'vue-router';
import { addAddress, EditAddress, DeleteAddress, getAddressList, getAddressDetail } from '../../network/address'
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
      addressInfo: {},
      type: 'add',
      addressId: '',
      title: ''
    })
    onMounted(() => {
      console.log(
        '0000',
        areaList
      );
      const { type, addressId } = route.query
      state.type = type
      state.addressId = addressId
      if (type == 'edit') {
        getAddressDetail(addressId).then(res => {
          state.addressInfo = {
            name: res.name,
            tel: res.phone,
            province: res.province,
            city: res.city,
            county: res.county,
            addressDetail: res.address,
            is_default: !!res.is_default
          }
          const addreddDetail = res
          let _areaCode = ''
          const province = areaList.province_list
          Object.entries(areaList.county_list).forEach(([id, text]) => {
            // 先找出当前对应的去
            if (text == addreddDetail.county) {
              // const provinceIndex = province.findIndex((item => (item.id.substr(0, 2) == id.substr(0, 2))))
              console.log('provinceIndex', Object.entries(province).findIndex(n => n.id));
              // 找到区对应的几个市区
              const cityItem = Object.entries(areaList.city_list).filter(([cityId, city]) => cityId.substr(0, 4) == id.substr(0, 4))
              // 对比找到的省份和接口返回的省份是否相等，因为有一些会崇明
              // if (province[provinceIndex].text == addreddDetail.province && cityItem[1] == addreddDetail.city) {
              //   _areaCode = id
              // }
            }
          })


        })
      }
    })
    const title = computed(() => {
      return state.type == 'add' ? '新增地址' : '编辑地址'
    })
    const onSave = (content) => {
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
      areaList,
      title
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