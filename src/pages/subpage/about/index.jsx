import React, { useEffect } from "react";
import { WebView } from "@tarojs/components";
import Taro from "@tarojs/taro";

function About() {
  useEffect(() => {
    Taro.showShareMenu({ withShareTicket: true });
  }, []);
  return <WebView src={`https://www.inexbot.com/inexbot.html`} />;
}
export default About;
