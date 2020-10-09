import React from "react";
import Taro from "@tarojs/taro";
import { AtListItem, AtList } from "taro-ui";
import { View } from "@tarojs/components";
import { useEffect } from "react";

export default function Technical_Robot(params) {
  useEffect(() => {
    Taro.showShareMenu({
      withShareTicket: true,
      menus: ["shareAppMessage", "shareTimeline"],
    });
  }, []);
  return (
    <View>
      <AtList>
        <AtListItem title="六轴串联多关节" />
        <AtListItem title="四轴SCARA" />
        <AtListItem title="四轴连杆码垛" />
        <AtListItem title="四轴串联多关节" note="六轴去掉4/6轴" />
        <AtListItem title="单轴" note="1根轴" />
        <AtListItem title="五轴串联多关节" note="六轴去掉6轴" />
        <AtListItem title="UR" note="UR协作机器人" />
        <AtListItem title="二轴SCARA" note="4轴SCARA去掉3/4轴" />
        <AtListItem title="三轴SCARA" note="4轴SCARA去掉4轴" />
        <AtListItem title="三轴直角" />
        <AtListItem title="三轴异型机器人" note="1轴可以旋转的3轴直角机器人" />
        <AtListItem title="七轴串联多关节" />
        <AtListItem title="SCARA异型1" note="4轴SCARA1/3轴对换" />
        <AtListItem title="四轴码垛丝杆" note="2轴由丝杆带动的码垛机器人" />
      </AtList>
    </View>
  );
}
