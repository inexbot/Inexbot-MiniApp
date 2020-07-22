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
      case 1:
        Taro.navigateTo({
          url: "/pages/subpage/document/index",
        });
        break;
      case 2:
        Taro.navigateTo({
          url: "/pages/subpage/news/index",
        });
        break;
      case 3:
        Taro.navigateTo({
          url: "/pages/subpage/about/index",
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
    Taro.showLoading({
      title: "加载中，请稍后",
      icon: "loading",
      mask: true,
    });
    Taro.downloadFile({
      url: url,
      success: function (res) {
        var filePath = res.tempFilePath;
        Taro.openDocument({
          filePath: filePath,
          success: function (res) {
            Taro.hideLoading();
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
            style={{ backgroundImage: value.litpic }}
            onClick={clickSwiper.bind(this, value.id)}
          >
            {value.title}
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
            <Image src="https://forinexbotweb.oss-cn-shanghai.aliyuncs.com/uploads/20200601/%E5%B0%8F%E8%AF%BE%E5%A0%82-1.png" />
            <Text>{value.name}</Text>
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
          />
        );
        kk++;
      });
      let list = <AtList>{listitem}</AtList>;
      setDocumentList(list);
    }
    fechData();
  }, []);
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
              "https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png",
            value: "小课堂",
          },
          {
            image:
              "https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png",
            value: "文档",
          },
          {
            image:
              "https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png",
            value: "新闻",
          },
          {
            image:
              "https://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png",
            value: "纳博特",
          },
        ]}
        onClick={clickButton}
      />
      <ScrollView className="index-videos">{videoList}</ScrollView>
      <View className="index-document">{documentList}</View>
    </View>
  );
}
