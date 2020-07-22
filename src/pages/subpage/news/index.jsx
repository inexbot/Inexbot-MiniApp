import React, { useState, useEffect } from "react";
import { Image, Text, View } from "@tarojs/components";
import "./index.less";
import { requestNews } from "../../../request/api";
import Taro from "@tarojs/taro";
import { AtCard } from "taro-ui";

function News(props) {
  const [newsList, setNewsList] = useState(<Text>加载中</Text>);
  // 新闻
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
          <AtCard title={value.title} extra={dd}>
            <Image src={value.litpic} />
          </AtCard>
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
