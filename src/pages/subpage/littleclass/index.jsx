import React, { useState, useEffect } from "react";
import { Image, Text, View } from "@tarojs/components";
import "./index.less";
import { requestVideo } from "../../../request/api";
import Taro from "@tarojs/taro";

function LittleClass(props) {
  const [videoList, setVideoList] = useState(<Text>加载中</Text>);
  const clickVideo = (num) => {
    console.log(num);
    Taro.navigateToMiniProgram({
      appId: "wx7564fd5313d24844",
      path: `pages/video/video?page=${num}&avid=80574679`,
    });
  };
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
            className="index-video-context"
            onClick={clickVideo.bind(this, value.sort)}
            key={kk}
          >
            <Text>{value.name}</Text>
            <Image src="https://forinexbotweb.oss-cn-shanghai.aliyuncs.com/uploads/20200601/%E5%B0%8F%E8%AF%BE%E5%A0%82-1.png" />
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
