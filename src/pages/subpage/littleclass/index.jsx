import React, { useState, useEffect } from "react";
import { Image, Text, View } from "@tarojs/components";
import { AtActivityIndicator } from "taro-ui";
import "./index.less";
import { requestVideo } from "../../../request/api";
import Taro from "@tarojs/taro";

function LittleClass(props) {
  const [videoList, setVideoList] = useState(
    <AtActivityIndicator
      isOpened
      content="加载中"
      mode="center"
    ></AtActivityIndicator>
  );
  const clickVideo = (num) => {
    Taro.navigateToMiniProgram({
      appId: "wx7564fd5313d24844",
      path: `pages/video/video?page=${num}&avid=80574679`,
    });
  };
  useEffect(() => {
    Taro.showShareMenu({
      withShareTicket: true,
      menus: ["shareAppMessage", "shareTimeline"],
    });
  }, []);
  // 获取视频
  useEffect(() => {
    async function fechData() {
      let videoRes = await requestVideo(1, 30);
      let videoList = videoRes.data.data.list;
      let listitem = [];
      let kk = 0;
      videoList.forEach((value, index, array) => {
        // 得到value.name,value.link,value.chap,value.sort,value.frameurl
        let newv = (
          <View
            className="littleclass-con"
            key={index}
            onClick={clickVideo.bind(this, value.sort)}
          >
            <Text className="littleclass-con-tit">课程：{value.name}</Text>
            <Image
              src="https://forinexbotweb.oss-cn-shanghai.aliyuncs.com/uploads/20200601/%E5%B0%8F%E8%AF%BE%E5%A0%82-1.png"
              className="littleclass-con-img"
            />
          </View>
        );
        listitem.push(newv);
        kk++;
      });
      setVideoList(listitem);
    }
    fechData();
  }, []);
  return <View className="littleclass">{videoList}</View>;
}
export default LittleClass;
