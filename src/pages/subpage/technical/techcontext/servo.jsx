import React from "react";
import Taro from "@tarojs/taro";
import { AtListItem, AtList } from "taro-ui";
import { View } from "@tarojs/components";
import { useEffect } from "react";

export default function Technical_Servo(params) {
  useEffect(() => {
    Taro.showShareMenu({
      withShareTicket: true,
      menus: ["shareAppMessage", "shareTimeline"],
    });
  }, []);
  return (
    <View>
      <AtList>
        <AtListItem title="清能德创R系列" />
        <AtListItem title="清能德创RC系列" />
        <AtListItem title="清能德创A8" />
        <AtListItem title="清能德创CS系列" />
        <AtListItem title="清能德创RA系列" />
        <AtListItem title="久同" />
        <AtListItem title="久同_6" />
        <AtListItem title="大族" />
        <AtListItem title="松下MADLN05BE" />
        <AtListItem title="松下MADLN15BE" />
        <AtListItem title="松下MADLN25BE" />
        <AtListItem title="松下MADLN55BE" />
        <AtListItem title="松下MEDLN83BE" />
        <AtListItem title="松下MCDHT3520BA1" />
        <AtListItem title="松下MDDHT3530BA1" />
        <AtListItem title="松下MADHT1507BA1" />
        <AtListItem title="松下MADHT1505BA1" />
        <AtListItem title="新时达AS260_1" />
        <AtListItem title="新时达AS260_3" />
        <AtListItem title="新时达AS260_4" />
        <AtListItem title="图科i3DW" />
        <AtListItem title="图科i3DS" />
        <AtListItem title="航天赛能ASD6_3" />
        <AtListItem title="航天赛能ASD6_4" />
        <AtListItem title="禾川X3E" />
        <AtListItem title="禾川A2" />
        <AtListItem title="埃斯顿" />
        <AtListItem title="欧瑞双轴" />
        <AtListItem title="高创CDHD" />
        <AtListItem title="高创DDHD" />
        <AtListItem title="东元JSDG2" />
        <AtListItem title="东元JSDG2S" />
        <AtListItem title="迈信EP3" />
        <AtListItem title="迈信EP3E_6" />
        <AtListItem title="众为兴QXE" />
        <AtListItem title="台达ASDA_A2" />
        <AtListItem title="儒镜" />
        <AtListItem title="研控" />
        <AtListItem title="英威腾DA200" />
        <AtListItem title="恩普" />
        <AtListItem title="信捷DS5" />
        <AtListItem title="尔智" />
        <AtListItem title="开璇" />
        <AtListItem title="三洋" />
        <AtListItem title="电姆" />
        <AtListItem title="摩通" />
        <AtListItem title="三相" />
        <AtListItem title="祯正WA" />
        <AtListItem title="泰科" />
        <AtListItem title="东菱" />
        <AtListItem title="汇川_4" />
        <AtListItem title="汇川_IS620" />
        <AtListItem title="零差云控" />
        <AtListItem title="微秒" />
        <AtListItem title="新川" />
        <AtListItem title="德欧" />
        <AtListItem title="正弦" />
        <AtListItem title="华成" />
        <AtListItem title="赛孚德_625" />
      </AtList>
    </View>
  );
}
