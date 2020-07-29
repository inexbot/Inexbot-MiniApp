import React, { useEffect, useState } from "react";
import { searchList } from "../../../request/api";
import Taro, { getCurrentInstance } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { AtCard, AtDivider } from "taro-ui";

function SearchContent(props) {
  const [List, setList] = useState("");
  const [StrBtn, setStrBtn] = useState(-1);
  useEffect(() => {
    let searchValue = getCurrentInstance().router.params.search;
    async function fetchValue() {
      let documentSearch = await searchList(searchValue);
      let documentList = documentSearch.data.data;
      let dataList = [];
      // 判断搜索到的的内容是否为空
      if (documentList.sql.length === 0 || documentList.err_code === 1) {
        setList(
          <View>
            <AtDivider
              content="搜索到的内容为空"
              fontColor="#ff9900"
              lineColor="#ff9900"
            />
          </View>
        );
      } else {
        // 把搜索到的数据循环出来
        documentList.sql.map((value, index) => {
          dataList.push(
            <View key={index + 1} style={{ marginBottom: "10px" }}>
              <AtCard
                title={value.title}
                onClick={() => {
                  // 使用StrBtn来展示方案内容是否隐藏  判断StrBtn是否等于索引值如果相等的话隐藏方案内容 不相等的话展示放方案内容
                  if (StrBtn === index) {
                    setStrBtn(-1);
                  } else {
                    setStrBtn(index);
                  }
                }}
              >
                <View
                  key="1"
                  style={{
                    borderTop: "solid 1px #F0F0F0",
                    borderBottom: "solid 1px #F0F0F0",
                    padding: "8px 0 8px 0",
                  }}
                >
                  <Text style={{ display: "flex", fontSize: "16px" }}>
                    {value.question1 === null
                      ? "问题1 :暂无"
                      : value.question1 === ""
                      ? "问题1:暂无"
                      : StrBtn === index
                      ? "问题1：" + value.question1
                      : "问题1: " + value.question1}
                  </Text>
                  <Text style={{ display: "flex", color: "#999" }}>
                    {value.solution1 === null
                      ? "方案1:暂无"
                      : value.solution1 === ""
                      ? "方案1:暂无"
                      : StrBtn === index
                      ? "方案1: " + value.solution1
                      : "方案1: " + value.solution1.slice(0, 20) + "..."}
                  </Text>
                </View>
                <View
                  key="2"
                  style={{
                    borderBottom: "solid 1px #F0F0F0",
                    padding: "8px 0 8px 0",
                  }}
                >
                  <Text style={{ display: "flex", fontSize: "16px" }}>
                    {StrBtn === index
                      ? value.question2 === null
                        ? "问题2:暂无"
                        : value.question2 === ""
                        ? "问题2:暂无"
                        : "问题2: " + value.question2
                      : "问题2: " + value.question2}
                  </Text>
                  <Text style={{ display: "flex", color: "#999" }}>
                    {value.solution2 === null
                      ? "方案2:暂无"
                      : value.solution2 === ""
                      ? "方案2：暂无"
                      : StrBtn === index
                      ? "方案2: " + value.solution2
                      : "方案2: " + value.solution2.slice(0, 20) + "..."}
                  </Text>
                </View>
                <View
                  key="3"
                  style={{
                    borderBottom: "solid 1px #F0F0F0",
                    padding: "8px 0 8px 0",
                  }}
                >
                  <Text style={{ display: "flex", fontSize: "16px" }}>
                    {StrBtn === index
                      ? value.question3 === null
                        ? "问题3:暂无"
                        : value.question3 === ""
                        ? "问题3:暂无"
                        : "问题3: " + value.question3
                      : "问题3: " + value.question3}
                  </Text>
                  <Text style={{ display: "flex", color: "#999" }}>
                    {value.solution3 === null
                      ? "方案3:暂无"
                      : value.solution3 === ""
                      ? "方案3：暂无"
                      : StrBtn === index
                      ? "方案3: " + value.solution3
                      : "方案3: " + value.solution3.slice(0, 20) + "..."}
                  </Text>
                </View>
                <View
                  key="4"
                  style={{
                    borderBottom: "solid 1px #F0F0F0",
                    padding: "8px 0 8px 0",
                  }}
                >
                  <Text style={{ display: "flex", fontSize: "16px" }}>
                    {StrBtn === index
                      ? value.question4 === null
                        ? "问题4:暂无"
                        : value.question4 === ""
                        ? "问题4:暂无"
                        : "问题4: " + value.question4
                      : "问题4: " + value.question4}
                  </Text>
                  <Text style={{ display: "flex", color: "#999" }}>
                    {value.solution3 === null
                      ? "方案4:暂无"
                      : value.solution3 === ""
                      ? "暂无"
                      : StrBtn === index
                      ? "方案4: " + value.solution3
                      : "方案4: " + value.solution3.slice(0, 20) + "..."}
                  </Text>
                </View>
              </AtCard>
            </View>
          );
        });
        setList(dataList);
      }
    }
    fetchValue();
  }, []);

  return <View>{List}</View>;
}
export default SearchContent;
