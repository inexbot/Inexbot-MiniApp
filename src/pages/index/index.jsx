import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Swiper,
  SwiperItem,
  ScrollView,
  Image,
  Input,
  Button
} from "@tarojs/components";
import { AtActivityIndicator, AtGrid, AtListItem, AtList, AtSearchBar,AtButton , AtIcon} from "taro-ui";
import "./index.less";
import { requestNews, requestVideo, requestDocument, searchList, } from "../../request/api";
import Taro from "@tarojs/taro";

export default function Index(props) {
  const [ searchBarValue, setSearchBarValue] = useState("");
  const [ SearchData, setSearchData ] = useState('')
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
    console.log(SearchData)
    Taro.navigateTo({
      url: '/pages/subpage/SearchContent/index',
    });
    Taro.setStorage({
      key:'List',
      data:SearchData
    })
  }

  useEffect(()=>{
    async function searct(){
      let documentSearch = searchList(searchBarValue);
      let documentList = (await documentSearch).data.data
      setSearchData(documentList)
    }
    searct()
  },[searchBarValue])

  useEffect(() => {
    Taro.showShareMenu({ withShareTicket: true });
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
            style={{ background: `url("${value.litpic}") no-repeat 0 `,backgroundSize:`cover` }}
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
  const scrollVideo = (value) => {
    // console.log(value);
  };
  return (
    <View className="index">
      <View style={{ position:'relative',height:'32px',display:'flex',margin: 6, }}>
        {/* <AtSearchBar
          showActionButton
          value={searchBarValue}
          onChange={changeSearchBar}
          onActionClick={ IptSearch }
          placeholder='问题搜索'
        /> */}
        <Input className="nbt-search" style={{ height:32,fontSize:13}} placeholder='问题搜索' onInput={( e )=>{  setSearchBarValue(e.target.value); }}
        > 
        </Input>
        {/* <AtButton type='primary' size='small'  style={{ height:'20px',marginTop:'90px' }}>搜一下</AtButton> */}
        <Button className="nbt-search-btn" type='primary' style={{ height:32,background:"#38a8fc",fontSize:12 }} onClick={ IptSearch } >
          <Image style={{width:22,height:22,paddingTop:4}} src="https://forinexbotweb.oss-cn-shanghai.aliyuncs.com/other/inexbot-MiniApp/search.png" alt=""/>
        </Button>
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
        style={{ marginTop: 20 }}
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
