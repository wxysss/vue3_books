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
      searchResult: [],
      addressInfo: {},
      type: 'add',
      addressId: '',
      title: ''
    })
    onMounted(() => {
      const { type, addressId } = route.query
      state.type = type
      state.addressId = addressId
      if (type == 'edit') {
        getAddressDetail(addressId).then(res => {
          // 使用vant ui提供的地址数据做的回显
          const addreddDetail = res
          let _areaCode = ''
          const province = (areaList.province_list)
          Object.entries(areaList.county_list).forEach(([id, text]) => {
            // 先找出当前对应的区
            if (text == addreddDetail.county) {
              Object.entries(areaList.province_list).forEach(([id1, text1]) => {
                // 对比省份,避免重名
                if (text1 == addreddDetail.province) {
                  //得到城市数据
                  const cityItem = Object.entries(areaList.city_list).filter(([cityId, city]) => {
                    return cityId.substr(0, 4) == id.substr(0, 4)
                  }
                  )
                  //省、市相同避免重名
                  if (cityItem[0][1] == addreddDetail.city) {
                    _areaCode = id
                  }
                }
              })
            }
          })
          state.addressInfo = {
            name: res.name,
            tel: res.phone,
            province: res.province,
            city: res.city,
            county: res.county,
            areaCode: _areaCode,
            addressDetail: res.address,
            is_default: !!res.is_default
          }
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
      if (state.type == 'edit') {
        // 修改数据
        EditAddress(state.addressId, params)
      } else if (state.type == 'add') {
        // 调用接口添加数据
        addAddress(params)
      }

      Toast('保存成功')
      setTimeout(() => {
        router.back()
      }, 1000);
    }
    const onDelete = () => {
      DeleteAddress(state.addressId).then(res => {
        Toast('删除成功')
        setTimeout(() => {
          router.back()
        }, 1000);
      })
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