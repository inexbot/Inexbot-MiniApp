import React, { useState, useEffect } from "react";
import { RichText, Text, View } from "@tarojs/components";
import { getCurrentInstance } from "@tarojs/taro";
import { requestFAQContent } from "../../../request/api";
import "./content.less";

function Card(props) {
  return (
    <View>
      <View className="subtit">{props.title}</View>
      <RichText className="subtit_con" nodes={props.children}/>
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
      let _solution1 = con.solution1.replace(/[\n\r]/g,"<br>")
      _l.push(
        <Card title={con.question1} key="1">
          {_solution1}
        </Card>
      );
      if (con.question2 != null && con.question2 != "") {
      let _solution2 = con.solution2.replace(/[\n\r]/g,"<br>")
        _l.push(
          <Card title={con.question2} key="2">
            {_solution2}
          </Card>
        );
      }
      if (con.question3 != null && con.question3 != "") {
      let _solution3 = con.solution3replace(/[\n\r]/g,"<br>")
        _l.push(
          <Card title={con.question3} key="3">
            {_solution3}
          </Card>
        );
      }
      if (con.question4 != null && con.question4 != "") {
      let _solution4 = con.solution4.replace(/[\n\r]/g,"<br>")
        _l.push(
          <Card title={con.question4} key="4">
            {_solution4}
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
    <View style={{padding:"0 16px"}}>
      <View className="title" key="title" style={{fontSize: 20}}>
        <Text>{title}</Text>
      </View>
      {contentCard}
    </View>
  );
}
export default FAQContent;
