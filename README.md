# books
vue3_图书demo
# 已注册的账号密码
账号(邮箱):abc@hello444.com
密码:111111
<!-- 编辑地址时用的vant ui提供的地址数据:代码如下 -->
  <!-- if (type == 'edit') {
        getAddressDetail(addressId).then(res => {
          // 使用vant ui提供的地址数据做的回显
          const addreddDetail = res
          let _areaCode = ''
          const province = (areaList.province_list)
          Object.entries(areaList.county_list).forEach(([id, text]) => {
            // 先找出当前对应的区
            if (text == addreddDetail.county) {
              Object.entries(areaList.province_list).forEach(([id1, text1]) => {
                // 对比省份
                if (text1 == addreddDetail.province) {
                  //得到城市数据
                  const cityItem = Object.entries(areaList.city_list).filter(([cityId, city]) => {
                    return cityId.substr(0, 4) == id.substr(0, 4)
                  }
                  )
                  //避免重名
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
      } -->