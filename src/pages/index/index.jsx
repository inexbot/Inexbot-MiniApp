import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Swiper,
  SwiperItem,
  ScrollView,
  Image,
} from "@tarojs/components";
import { AtButton, AtSearchBar, AtGrid, AtListItem, AtList } from "taro-ui";
import "./index.less";
import { requestNews, requestVideo, requestDocument } from "../../request/api";
import Taro from "@tarojs/taro";

export default function Index(props) {
  const [searchBarValue, setSearchBarValue] = useState("");
  const [news1, setNews1] = useState(<View className="index-news">新闻1</View>);
  const [news2, setNews2] = useState(<View className="index-news">新闻2</View>);
  const [news3, setNews3] = useState(<View className="index-news">新闻3</View>);
  const [videoList, setVideoList] = useState(
    <View className="index-video-list">小课堂视频</View>
  );
  const [documentList, setDocumentList] = useState(
    <View className="index-document-list">手册</View>
  );
  const changeSearchBar = (value) => {
    setSearchBarValue(value);
  };
  const clickButton = (item, index) => {
    switch (index) {
      case 0:
        Taro.navigateTo({
          url: "/pages/subpage/littleclass/index",
        });
        break;

      default:
        break;
    }
    return;
  };
  const clickSwiper = (aid) => {
    console.log(aid);
  };
  const clickDocument = (url) => {
    Taro.downloadFile({
      url: url,
      success: function (res) {
        var filePath = res.tempFilePath;
        Taro.openDocument({
          filePath: filePath,
          success: function (res) {
            console.log("打开文档成功");
          },
        });
      },
    });
  };
  const clickVideo = (num) => {
    console.log(num);
    Taro.navigateToMiniProgram({
      appId: "wx7564fd5313d24844",
      path: `pages/video/video?page=${num}&avid=80574679`,
    });
  };
  // 新闻
  useEffect(() => {
    async function fechData() {
      let NewsRes = await requestNews(1, 3);
      let newslist = NewsRes.data.data.list;
      newslist.forEach((value, index, array) => {
        // 得到value.title(string),value.litpic(url-string)
        let newsli = (
          <View
            className="index-news"
            style={{ background: `url("${value.litpic}")` }}
            onClick={clickSwiper.bind(this, value.id)}
          >
            <View className="news-tit">{value.title}</View>
          </View>
        );
        if (index === 0) {
          setNews1(newsli);
        } else if (index === 1) {
          setNews2(newsli);
        } else if (index === 2) {
          setNews3(newsli);
        }
      });
    }
    fechData();
  }, []);
  // 视频
  useEffect(() => {
    async function fechData() {
      let videoRes = await requestVideo(1, 4);
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
            <Image className="video-img" src="https://forinexbotweb.oss-cn-shanghai.aliyuncs.com/uploads/20200601/%E5%B0%8F%E8%AF%BE%E5%A0%82-1.png" />
            <Text className="video-tit">{value.name}</Text>
          </View>
        );
        listitem.push(newv);
        kk++;
      });
      setVideoList(listitem);
    }
    fechData();
  }, []);
  // 文档
  useEffect(() => {
    async function fechData() {
      let documentRes = await requestDocument(1, 4);
      let documentList = documentRes.data.data.list;
      let listitem = [];
      let kk = 0;
      documentList.forEach((value, index, array) => {
        // 得到value.aid,value.name,value.link,value.sort,value.version
        listitem.push(
          <AtListItem
            title={value.name}
            onClick={clickDocument.bind(this, value.link)}
            note={`版本${value.version}`}
            key={kk}
          >
            </AtListItem>
        );
        kk++;
      });
      let list = <AtList><Image className="news-img" src="https://forinexbotweb.oss-cn-shanghai.aliyuncs.com/other/inexbot-MiniApp/%E6%96%87%E6%A1%A3-icon.png" />{listitem}</AtList>;
      setDocumentList(list);
    }
    fechData();
  }, []);
  const scrollVideo = (value) =>{
    console.log(value)
  }
  return (
    <View className="index">
      <AtSearchBar
        showActionButton
        value={searchBarValue}
        onChange={changeSearchBar}
      />
      <Swiper
        className="test-h"
        indicatorColor="#999"
        indicatorActiveColor="#333"
        circular={true}
        indicatorDots
        autoplay
        interval={3000}
      >
        <SwiperItem>{news1}</SwiperItem>
        <SwiperItem>{news2}</SwiperItem>
        <SwiperItem>{news3}</SwiperItem>
      </Swiper>
      <AtGrid
        columnNum={4}
        data={[
          {
            image:
              "https://forinexbotweb.oss-cn-shanghai.aliyuncs.com/other/inexbot-MiniApp/%E5%B0%8F%E8%AF%BE%E5%A0%82.png",
            value: "小课堂",
          },
          {
            image:
              "https://forinexbotweb.oss-cn-shanghai.aliyuncs.com/other/inexbot-MiniApp/%E6%96%87%E6%A1%A3.png",
            value: "文档",
          },
          {
            image:
              "https://forinexbotweb.oss-cn-shanghai.aliyuncs.com/other/inexbot-MiniApp/%E6%96%B0%E9%97%BB.png",
            value: "新闻",
          },
          {
            image:
              "https://forinexbotweb.oss-cn-shanghai.aliyuncs.com/other/inexbot-MiniApp/%E7%BA%B3%E5%8D%9A%E7%89%B9.png",
            value: "纳博特",
          },
        ]}
        onClick={clickButton}
        style={{marginTop: 20}}
      />
      <View className="nbt-tit">纳博特小课堂
      <Image className="more-img" src="https://forinexbotweb.oss-cn-shanghai.aliyuncs.com/other/inexbot-MiniApp/more.png" />
      </View>
      <ScrollView scrollX={true} scrollWithAnimation onScroll={scrollVideo} className="index-videos">{videoList}</ScrollView>
      <View className="nbt-tit">使用手册
      <Image className="more-img" style={{left: "68%"}} src="https://forinexbotweb.oss-cn-shanghai.aliyuncs.com/other/inexbot-MiniApp/more.png" />
      </View>
      <View className="index-document">{documentList}</View>
    </View>
  );
}
