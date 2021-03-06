import Taro from "@tarojs/taro";

const url = "https://hd215.api.yesapi.cn/";
const app_key = "A9B8F37512C199D5FE1BDC229CD9E36C";

// 获取新闻列表
export function requestNews(page, perpage) {
  let where = '[["typeid", "=", "8"],["typeid","=","9"]]';
  let order = '["sortrank DESC"]';
  const res = Taro.request({
    url: url,
    method: "POST",
    header: { "Content-Type": "application/x-www-form-urlencoded" },
    data: {
      s: "App.SuperTable.FreeQuery",
      app_key: app_key,
      model_name: "dede_archives",
      where: where,
      logic: "or",
      order: order,
      page: page,
      perpage: perpage,
    },
  });
  return res;
}

// 获取新闻内容
export function requestNewsBody(aid) {
  let where = JSON.stringify([["aid", "=", aid]]);
  const res = Taro.request({
    url: url,
    method: "POST",
    header: { "Content-Type": "application/x-www-form-urlencoded" },
    data: {
      s: "App.SuperTable.FreeQuery",
      app_key: app_key,
      model_name: "dede_addonarticle",
      where: where,
      page: 1,
      perpage: 100,
    },
  });
  return res;
}

export function requestDocument(page, perpage) {
  let where = '[["typeid", "=", "58"]]';
  let order = '["sort ASC"]';
  const res = Taro.request({
    url: url,
    method: "POST",
    header: { "Content-Type": "application/x-www-form-urlencoded" },
    data: {
      s: "App.SuperTable.FreeQuery",
      app_key: app_key,
      model_name: "dede_allmanual",
      where: where,
      order: order,
      page: page,
      perpage: perpage,
    },
  });
  return res;
}
export function requestOtherDocument(params) {
  let where = '[["typeid", "=", "63"]]';
  let order = '["sort ASC"]';
  const res = Taro.request({
    url: url,
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    data: {
      s: "App.SuperTable.FreeQuery",
      app_key: app_key,
      model_name: "dede_allmanual",
      where: where,
      order: order,
      page: 1,
      perpage: 50,
    },
  });
  return res;
}
export function requestVideo(page, perpage) {
  let where = '[["typeid", "=", "60"]]';
  let order = '["sort ASC"]';
  const res = Taro.request({
    url: url,
    method: "POST",
    header: { "Content-Type": "application/x-www-form-urlencoded" },
    data: {
      s: "App.SuperTable.FreeQuery",
      app_key: app_key,
      model_name: "dede_teachclass",
      where: where,
      order: order,
      page: page,
      perpage: perpage,
    },
  });
  return res;
}

// 在数据库里搜索的请求
export function searchList(sContent) {
  let newContent = sContent.split("");
  let newContentLen = newContent.length;
  let queryContent = "%";
  for (let i = 0; i < newContentLen; i++) {
    queryContent += newContent[i];
    queryContent += "%";
  }
  const res = Taro.request({
    method: "POST",
    url: url,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    data: {
      s: "App.SuperTable.SqlQuery",
      database: "iu",
      app_key: app_key,
      model_name: "inexbot_faq",
      where: "inexbot_faq",
      sql: `select * from inexbot_faq 
      where title like '${queryContent}' 
      or Id like '${queryContent}' 
      or question1 like '${queryContent}' 
      or question2 like '${queryContent}' 
      or question3 like '${queryContent}' 
      or question4 like '${queryContent}' 
      or solution1 like '${queryContent}' 
      or solution2 like '${queryContent}' 
      or solution3 like '${queryContent}' 
      or solution4 like '${queryContent}' `,
    },
  });
  return res;
}

export function requestFAQTypeList() {
  let where = '[["id", ">", "0"]]';
  let order = '["id ASC"]';
  const res = Taro.request({
    url: url,
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    data: {
      s: "App.SuperTable.FreeQuery",
      app_key: app_key,
      model_name: "inexbot_faq_type",
      database: "iu",
      where: where,
      order: order,
      page: 1,
      perpage: 50,
    },
  });
  return res;
}
export function requestFAQList(typeid) {
  let where = `[["type", "=", ${typeid}]]`;
  let order = '["id ASC"]';
  const res = Taro.request({
    url: url,
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    data: {
      s: "App.SuperTable.FreeQuery",
      app_key: app_key,
      model_name: "inexbot_faq",
      database: "iu",
      where: where,
      order: order,
      page: 1,
      perpage: 300,
    },
  });
  return res;
}
export function requestFAQContent(id) {
  let where = `[["id", "=", ${id}]]`;
  let order = '["id ASC"]';
  const res = Taro.request({
    url: url,
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    data: {
      s: "App.SuperTable.FreeQuery",
      app_key: app_key,
      model_name: "inexbot_faq",
      database: "iu",
      where: where,
      order: order,
      page: 1,
      perpage: 50,
    },
  });
  return res;
}
