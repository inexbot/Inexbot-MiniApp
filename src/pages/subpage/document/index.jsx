import React, { useState, useEffect } from "react";
import { View, Text } from "@tarojs/components";
import { AtListItem, AtList, AtActivityIndicator } from "taro-ui";
import "./index.less";
import { requestDocument } from "../../../request/api";
import Taro from "@tarojs/taro";

function Document() {
  const [documentList, setDocumentList] = useState(
    <AtActivityIndicator
      isOpened
      content="加载中"
      mode="center"
    ></AtActivityIndicator>
  );
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
            console.log("打开文档成功");
          },
        });
      },
    });
  };
  useEffect(() => {
    Taro.showShareMenu({ withShareTicket: true });
  }, []);
  // 文档
  useEffect(() => {
    async function fechData() {
      let documentRes = await requestDocument(1, 50);
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

  return <View className="document">{documentList}</View>;
}
export default Document;
