import React, { useState, useEffect } from "react";
import { Image, Text, View } from "@tarojs/components";
import "./index.less";
import { requestNews } from "../../../request/api";
import Taro from "@tarojs/taro";
import { AtCard, AtActivityIndicator } from "taro-ui";

function News(props) {
  const [newsList, setNewsList] = useState(
    <AtActivityIndicator
      isOpened
      content="加载中"
      mode="center"
    ></AtActivityIndicator>
  );
  // 新闻
  const clickNews = (id) => {
    Taro.navigateTo({
      url: `/pages/subpage/news/context?id=${id}`,
    });
  };
  useEffect(() => {
    Taro.showShareMenu({ withShareTicket: true });
  }, []);
  useEffect(() => {
    async function fechData() {
      let NewsRes = await requestNews(1, 50);
      let newslist = NewsRes.data.data.list;
      let nl = [];
      newslist.forEach((value, index, array) => {
        // 得到value.title(string),value.litpic(url-string)
        let timeStamp = value.sortrank;
        let date = new Date(timeStamp * 1000);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let dd = `${year}-${month}-${day}`;
        let con = (
          <View style={{ marginBottom: "10px" }} key={index + 1}>
            {/* <AtCard
              title={value.title}
              extra={dd}
              onClick={clickNews.bind(this, value.id)}
            >
              <Image src={value.litpic} />
            </AtCard> */}

            <View onClick={clickNews.bind(this, value.id)} style={{display:flex}}>
              <Image class="news-img" src={value.litpic} style={{width: 120,height: 120,borderRadius: 10,}}/>
              <View class="news-title">{value.title} <span class="news-date">{dd}</span>
              <p>简介</p>
              </View>
            </View>
          </View>
        );
        nl.push(con);
      });
      setNewsList(nl);
    }
    fechData();
  }, []);
  return <View className="news">{newsList}</View>;
}
export default News;
