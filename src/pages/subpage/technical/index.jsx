import React, { useState, useEffect } from "react";
import { View, Text } from "@tarojs/components";
import { AtListItem, AtList, AtActivityIndicator } from "taro-ui";
import "./index.less";
import { requestDocument } from "../../../request/api";
import Taro from "@tarojs/taro";

function Technical() {
  useEffect(() => {
    Taro.showShareMenu({
      withShareTicket: true,
      menus: ["shareAppMessage", "shareTimeline"],
    });
  }, []);
  const handleClickList = (value) => {
    Taro.navigateTo({
      url: `/pages/subpage/technical/techcontext/${value}`,
    });
  };
  return (
    <View className="technical">
      <AtList>
        <AtListItem
          title="支持伺服列表"
          arrow="right"
          note="支持的伺服从站型号列表"
          onClick={handleClickList.bind(this, "servo")}
        />
      </AtList>
    </View>
  );
}
export default Technical;
