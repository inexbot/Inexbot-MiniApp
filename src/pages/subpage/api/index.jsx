import React, { useEffect } from "react";
import { WebView } from "@tarojs/components";
// import "./index.less";
import Taro from "@tarojs/taro";

function ApiContext(props) {
  useEffect(() => {
    Taro.showShareMenu({
      withShareTicket: true,
      menus: ["shareAppMessage", "shareTimeline"],
    });
  }, []);
  return <WebView src={`https://open.inexbot.com/`} />;
}
export default ApiContext;
