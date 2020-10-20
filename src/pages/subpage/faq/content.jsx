import React, { useState, useEffect } from "react";
import { Text, View } from "@tarojs/components";
import { getCurrentInstance } from "@tarojs/taro";
import { requestFAQContent } from "../../../request/api";

function Card(props) {
  return (
    <View>
      <View>{props.title}</View>
      <View>{props.children}</View>
    </View>
  );
}

function FAQContent() {
  const [title, setTitle] = useState("标题");
  const [contentCard, setContentCard] = useState([]);
  const renderContent = () => {
    let faqId = getCurrentInstance().router.params.id;
    async function fetchData(params) {
      let res = await requestFAQContent(faqId);
      let _list = res.data.data.list;
      if (_list === [] || _list === null) {
        return;
      }
      let con = _list[0];
      setTitle(con.title);
      console.log(con);
      let _l = [];
      _l.push(
        <Card title={con.question1} key="1">
          {con.solution1}
        </Card>
      );
      if (con.question2 != null && con.question2 != "") {
        _l.push(
          <Card title={con.question2} key="2">
            {con.solution2}
          </Card>
        );
      }
      if (con.question3 != null && con.question3 != "") {
        _l.push(
          <Card title={con.question3} key="3">
            {con.solution3}
          </Card>
        );
      }
      if (con.question4 != null && con.question4 != "") {
        _l.push(
          <Card title={con.question4} key="4">
            {con.solution4}
          </Card>
        );
      }
      setContentCard(_l);
    }
    fetchData();
  };
  useEffect(() => {
    renderContent();
  }, []);
  return (
    <View>
      <View className="title" key="title">
        <Text>{title}</Text>
      </View>
      {contentCard}
    </View>
  );
}
export default FAQContent;
