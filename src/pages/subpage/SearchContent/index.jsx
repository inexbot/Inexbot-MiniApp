import React, { useEffect, useState } from "react";
import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtCard, AtList, AtListItem, AtDivider } from "taro-ui";

function SearchContent( props ){
  const [ List, setList ] = useState('')
  const [ StrBtn, setStrBtn ] = useState(-1)
  useEffect(()=>{
    Taro.getStorage({
      key:'List',
      success:function(res){
        let dataList = []
        // 判断搜索到的的内容是否为空
        if(res.data.sql.length===0 || res.data.err_code === 1 ){
          setList(
            <View>
              <AtDivider content='搜索到的内容为空' fontColor='#ff9900' lineColor='#ff9900' />
            </View>
          )
        }else{
          // 把搜索到的数据循环出来
          res.data.sql.map((value,index)=>{
            dataList.push(
              <View key={index+1} style={{ marginBottom:'10px' }}>
                <AtCard
                  title={value.title}
                  onClick = {()=>{
                    // 使用StrBtn来展示方案内容是否隐藏  判断StrBtn是否等于索引值如果相等的话隐藏方案内容 不相等的话展示放方案内容
                    if( StrBtn === index ){
                      setStrBtn(-1)
                    }else{
                      setStrBtn(index)
                    }
                  }}
                >
                  {/* 使用三元运算符来显示方案的样式 */}
                  <AtList>
                    <AtListItem  key='1' title={ value.question1===null?'问题1:暂无':value.question1===''?'问题1:暂无':value.question1 }
                    note= {StrBtn === index? value.solution1===null?'方案1:暂无':value.solution1===''?'方案1:暂无': '方案1:'+value.solution1 :value.solution1===null?'方案1:暂无':value.solution1===''?'暂无': '方案1:'+value.solution1.slice(0,20)+'...' }/>
                    <AtListItem  key='2' title={ value.question2===null?'问题2:暂无':value.question2===''?'问题1:暂无': '问题2:'+value.question2 }
                     note= {StrBtn === index? value.solution2===null?'方案1:暂无':value.solution2===''?'方案1暂无': '方案1:'+value.solution2 :value.solution2===null?'方案1:暂无':value.solution2===''?'暂无': '方案1:'+value.solution2 .slice(0,20)+'...' }  />
                    <AtListItem  key='3' title={ value.question3===null?'问题3:暂无':value.question3===''?'问题1:暂无':'问题3:'+value.question3 }
                    note= {StrBtn === index? value.solution3===null?'方案1:暂无':value.solution3===''?'方案1暂无': '方案1:'+value.solution3 :value.solution3===null?'方案1:暂无':value.solution3===''?'暂无': '方案1:'+value.solution3.slice(0,20)+'...' } />
                    <AtListItem  key='4' title={  value.question4===null?'问题4:暂无':value.question4===''?'问题1:暂无':'问题4:'+ value.question4 }
                    note= {StrBtn === index? value.solution4===null?'方案1:暂无':value.solution4===''?'方案1暂无': '方案1:'+value.solution4 :value.solution4===null?'方案1:暂无':value.solution4===''?'暂无': '方案1:'+value.solution4.slice(0,20)+'...' } />
                  </AtList>
                </AtCard>
              </View>
            )
          })
          setList(dataList)
        }
      }
    })
  },[StrBtn])

  return(
    <View>
      {List}
    </View>
  )
}
export default SearchContent;
