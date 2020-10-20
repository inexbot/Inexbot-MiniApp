import React, { useState, useEffect } from "react";
import Taro, { getCurrentInstance } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtList, AtListItem } from "taro-ui";
import { requestFAQList } from "../../../request/api";

function FAQList() {
  const [FAQList, setFAQList] = useState([]);

  const renderFAQList = () => {
    let type = getCurrentInstance().router.params.type;
    async function fetchData() {
      let res = await requestFAQList(type);
      let _list = res.data.data.list;
      console.log(_list);
      let _l = [];
      _list.forEach((value) => {
        _l.push(
          <AtListItem
            title={value.title}
            key={value.Id}
            arrow="right"
            onClick={handleClickList.bind(this, value.Id)}
          />
        );
      });
      setFAQList(_l);
    }
    fetchData();
  };
  const handleClickList = (id) => {
    Taro.navigateTo({ url: `/pages/subpage/faq/content?id=${id}` });
  };
  useEffect(() => {
    renderFAQList();
  }, []);
  return (
    <View>
      <AtList>{FAQList}</AtList>
    </View>
  );
}
export default FAQList;
