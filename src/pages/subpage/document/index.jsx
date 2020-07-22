import React, { useState, useEffect } from "react";
import { View, Text } from "@tarojs/components";
import { AtListItem, AtList } from "taro-ui";
import "./index.less";
import { requestDocument } from "../../../request/api";
import Taro from "@tarojs/taro";

function Document() {
  const [documentList, setDocumentList] = useState(<Text>加载中</Text>);
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
          />
        );
        kk++;
      });
      let list = <AtList>{listitem}</AtList>;
      setDocumentList(list);
    }
    fechData();
  }, []);

  return <View>{documentList}</View>;
}
export default Document;
