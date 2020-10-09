import React, { useState, useEffect } from "react";
import { View, Text } from "@tarojs/components";
import {
  AtListItem,
  AtList,
  AtActivityIndicator,
  AtTabs,
  AtTabsPane,
} from "taro-ui";
import "./index.less";
import { requestDocument, requestOtherDocument } from "../../../request/api";
import Taro from "@tarojs/taro";

function Document() {
  const [documentList, setDocumentList] = useState(
    <AtActivityIndicator
      isOpened
      content="加载中"
      mode="center"
    ></AtActivityIndicator>
  );
  const [otherDocumentList, setOtherDocumentList] = useState(
    <AtActivityIndicator
      isOpened
      content="加载中"
      mode="center"
    ></AtActivityIndicator>
  );
  const [currentTab, setCurrentTab] = useState(0);
  const tabList = [
    {
      title: "操作手册",
    },
    {
      title: "其它文档",
    },
  ];

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
    Taro.showShareMenu({
      withShareTicket: true,
      menus: ["shareAppMessage", "shareTimeline"],
    });
  }, []);
  const renderDocumentList = () => {
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
  };
  const renderOtherDocumentList = () => {
    async function fechData() {
      let documentRes = await requestOtherDocument(1, 50);
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
      setOtherDocumentList(list);
    }
    fechData();
  };
  // 文档
  useEffect(() => {
    renderDocumentList();
    renderOtherDocumentList();
  }, []);
  const clickTab = (value) => {
    setCurrentTab(value);
  };
  return (
    <View>
      <AtTabs current={currentTab} tabList={tabList} onClick={clickTab}>
        <AtTabsPane current={currentTab} index={0}>
          <View className="document">{documentList}</View>
        </AtTabsPane>
        <AtTabsPane current={currentTab} index={1}>
          <View className="otherDocument">{otherDocumentList}</View>
        </AtTabsPane>
      </AtTabs>
    </View>
  );
}
export default Document;
