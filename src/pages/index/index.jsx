import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Swiper,
  SwiperItem,
  ScrollView,
  Image,
  Input,
  Button,
} from "@tarojs/components";
import { AtActivityIndicator, AtGrid, AtListItem, AtList } from "taro-ui";
import "./index.less";
import { requestNews, requestVideo, requestDocument } from "../../request/api";
import Taro from "@tarojs/taro";

export default function Index(props) {
  const [searchBarValue, setSearchBarValue] = useState("");
  const [inputTipsDisplay, setInputTipsDisplay] = useState("none");
  const [news1, setNews1] = useState(
    <AtActivityIndicator isOpened mode="center">
      正在加载新闻
    </AtActivityIndicator>
  );
  const [news2, setNews2] = useState(
    <AtActivityIndicator isOpened mode="center">
      正在加载新闻
    </AtActivityIndicator>
  );
  const [news3, setNews3] = useState(
    <AtActivityIndicator isOpened mode="center">
      正在加载新闻
    </AtActivityIndicator>
  );
  const [videoList, setVideoList] = useState(
    <AtActivityIndicator isOpened mode="center">
      正在加载视频列表
    </AtActivityIndicator>
  );
  const [documentList, setDocumentList] = useState(
    <AtActivityIndicator isOpened mode="center">
      正在加载手册列表
    </AtActivityIndicator>
  );
  // 点击搜索
  const IptSearch = () => {
    Taro.navigateTo({
      url: `/pages/subpage/SearchContent/index?search=${searchBarValue}`,
    });
  };

  useEffect(() => {
    Taro.showShareMenu({
      withShareTicket: true,
      menus: ["shareAppMessage", "shareTimeline"],
    });
  }, []);
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
          url: "/pages/subpage/technical/index",
        });
        break;
      case 4:
        Taro.navigateTo({
          url: "/pages/subpage/api/index",
        });
        break;
      case 5:
        Taro.navigateTo({
          url: "/pages/subpage/faq/index",
        });
        break;
      case 6:
        Taro.navigateTo({
          url: "/pages/subpage/about/index",
        });
        break;
      default:
        break;
    }
    return;
  };
  const clickClassMore = () => {
    Taro.navigateTo({
      url: "/pages/subpage/littleclass/index",
    });
  };
  const clickDocumentMore = () => {
    Taro.navigateTo({
      url: "/pages/subpage/document/index",
    });
  };
  const clickSwiper = (id) => {
    Taro.navigateTo({
      url: `/pages/subpage/news/context?id=${id}`,
    });
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
    Taro.navigateToMiniProgram({
      appId: "wx7564fd5313d24844",
      path: `pages/video/video?page=${num}&avid=80574679`,
    });
  };
  const focusInput = () => {
    setInputTipsDisplay("block");
  };
  const blurInput = () => {
    setInputTipsDisplay("none");
  };
  // 新闻
  useEffect(() => {
    async function fechData() {
      // 这边，所有查询都用的异步的方法
      let NewsRes = await requestNews(1, 3);
      let newslist = NewsRes.data.data.list;
      newslist.forEach((value, index, array) => {
        // 得到value.title(string),value.litpic(url-string)
        let newsli = (
          <View
            className="index-news"
            style={{
              background: `url("${value.litpic}") no-repeat 0 `,
              backgroundSize: `cover`,
            }}
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
            <Image
              className="video-img"
              src="https://forinexbotweb.oss-cn-shanghai.aliyuncs.com/uploads/20200601/%E5%B0%8F%E8%AF%BE%E5%A0%82-1.png"
            />
            <Text
              className="video-tit"
              style={{
                maxWidth: "40%",
                overflow: "hidden",
                textOverflow: " ellipsis",
                whiteSpace: "nowrapd",
              }}
            >
              {value.name}
            </Text>
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
            thumb="https://forinexbotweb.oss-cn-shanghai.aliyuncs.com/other/inexbot-MiniApp/%E6%96%87%E6%A1%A3-icon.png"
            arrow="right"
          />
        );
        kk++;
      });
      let list = <AtList>{listitem}</AtList>;
      setDocumentList(list);
    }
    fechData();
  }, []);
  const scrollVideo = (value) => {};
  return (
    <View className="index">
      <View
        style={{
          position: "relative",
          height: "32px",
          display: "flex",
          margin: 6,
        }}
      >
        <Input
          className="nbt-search"
          style={{ height: 32, fontSize: 13 }}
          placeholder="问题搜索"
          onInput={(e) => {
            setSearchBarValue(e.target.value);
          }}
          onFocus={focusInput}
          onBlur={blurInput}
        ></Input>
        <Button
          className="nbt-search-btn"
          type="primary"
          style={{ height: 32, background: "#38a8fc", fontSize: 12 }}
          onClick={IptSearch}
        >
          <Image
            style={{ width: 22, height: 22, paddingTop: 4 }}
            src="https://forinexbotweb.oss-cn-shanghai.aliyuncs.com/other/inexbot-MiniApp/search.png"
            alt=""
          />
        </Button>
      </View>
      <View
        style={{
          width: "90%",
          padding: "20px 2%",
          borderRadius: 10,
          // border: "1px solid #dadada",
          background: "rgba(255,255,255,0.95)",
          boxShadow: "0 2px 6px rgba(10,10,10,0.3)",
          zIndex: 999,
          display: inputTipsDisplay,
          position: "absolute",
          left: "2%",
        }}
      >
        <Text
          style={{
            color: "#999999",
            lineHeight: 1.5,
          }}
        >
          请输入要搜索的问题或错误信息，如“FF0C”、“开机图”、“通讯异常”等
        </Text>
      </View>
      <Swiper
        className="index-swiper"
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
        hasBorder={false}
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
              "https://forinexbotweb.oss-cn-shanghai.aliyuncs.com/other/inexbot-MiniApp/%E6%8A%80%E6%9C%AF%E5%8F%82%E6%95%B0.png",
            value: "技术参数",
          },
          {
            image:
              "https://forinexbotweb.oss-cn-shanghai.aliyuncs.com/other/inexbot-MiniApp/API.png",
            value: "API",
          },
          {
            image:
              "https://forinexbotweb.oss-cn-shanghai.aliyuncs.com/other/inexbot-MiniApp/FAQ.png",
            value: "常见问题",
          },
          {
            image:
              "https://forinexbotweb.oss-cn-shanghai.aliyuncs.com/other/inexbot-MiniApp/%E7%BA%B3%E5%8D%9A%E7%89%B9.png",
            value: "纳博特",
          },
        ]}
        onClick={clickButton}
        // style={{ marginTop: 10 }}
      />
      <View className="nbt-tit">
        纳博特小课堂
        <Image
          className="more-img"
          src="https://forinexbotweb.oss-cn-shanghai.aliyuncs.com/other/inexbot-MiniApp/more.png"
          onClick={clickClassMore}
        />
      </View>
      <ScrollView
        scrollX={true}
        scrollWithAnimation
        onScroll={scrollVideo}
        className="index-videos"
      >
        {videoList}
      </ScrollView>
      <View className="nbt-tit">
        使用手册
        <Image
          className="more-img"
          style={{ left: "68%" }}
          src="https://forinexbotweb.oss-cn-shanghai.aliyuncs.com/other/inexbot-MiniApp/more.png"
          onClick={clickDocumentMore}
        />
      </View>
      <View className="index-document">{documentList}</View>
    </View>
  );
}
