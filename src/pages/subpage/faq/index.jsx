import React, { useState, useEffect } from "react";
import Taro from "@tarojs/taro";
import { View,Image } from "@tarojs/components";
import { AtList, AtListItem } from "taro-ui";
import { requestFAQTypeList } from "../../../request/api";

function FAQIndex() {
  const [typeList, setTypeList] = useState([]);
  useEffect(() => {
    renderTypeList();
  }, []);
  const renderTypeList = () => {
    async function fetchData() {
      let typeRes = await requestFAQTypeList();
      let _typeList = typeRes.data.data.list;
      let _l = [];
      _typeList.forEach((value) => {
        _l.push(
          <AtListItem
            title={value.type}
            onClick={handleClickList.bind(this, value.id)}
            arrow="right"
            key={value.id}
            thumb="https://forinexbotweb.oss-cn-shanghai.aliyuncs.com/other/inexbot-MiniApp/FAQ-icon.png"
          />
        );
      });
      setTypeList(_l);
    }
    fetchData();
  };
  const handleClickList = (typeid) => {
    Taro.navigateTo({
      url: `/pages/subpage/faq/list?type=${typeid}`,
    });
  };
  return (
    <View>
      <AtList>
        {typeList}
        </AtList>
    </View>
  );
}
export default FAQIndex;
