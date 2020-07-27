import React, { useEffect, useState } from "react";
import Taro from "@tarojs/taro";
import { View, Text, List } from "@tarojs/components";
import { AtCard, AtList, AtListItem } from "taro-ui";

function SearchContent( props ){
  const [ List, setList ] = useState('')
  useEffect(()=>{
    Taro.getStorage({
      key:'List',
      success:function(res){
        // setList(res.data.sql)
        let dataList = []
        res.data.sql.map((value,index)=>{
            // console.log(value[index],value)
            dataList.push(
              <View key={index+1} style={{ marginBottom:'10px' }}>
                <AtCard
                title={value.title}
                >
                  <AtList>
                    <AtListItem title={ value.question1 } note={ value.solution1 } />
                    <AtListItem title={ value.question2 } note={ value.solution2 } />
                    <AtListItem title={ value.question3 } note={ value.solution3 } />
                    <AtListItem title={ value.question4 } note={ value.solution4 } />
                  </AtList>
                </AtCard>
              </View>
            )
        })
        setList(dataList)
      }
    })
    // console.log(List)

  },[])

  return(
    <View>
      {List}
    </View>
  )
}
export default SearchContent;

