import React, { useState, useEffect } from "react";
import { Text, View, WebView } from "@tarojs/components";
import "./index.less";
import Taro, { getCurrentInstance } from "@tarojs/taro";

function Context(props) {
  const [context, setContext] = useState(<Text>加载中</Text>);
  useEffect(() => {
    Taro.showShareMenu({
      withShareTicket: true,
      menus: ["shareAppMessage", "shareTimeline"],
    });
  }, []);
  useEffect(() => {
    let id = getCurrentInstance().router.params.id;
    let context = (
      <WebView src={`https://www.inexbot.com/news/company/${id}.html`} />
    );
    setContext(context);
  }, []);
  return <View>{context}</View>;
}
export default Context;
