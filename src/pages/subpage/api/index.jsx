import React, { useEffect } from "react";
import { WebView } from "@tarojs/components";
// import "./index.less";
import Taro from "@tarojs/taro";

function ApiContext(props) {
  useEffect(() => {
    Taro.showShareMenu({ withShareTicket: true });
  }, []);
  return <WebView src={`https://www.inexbot.com/ebook/`} />;
}
export default ApiContext;
