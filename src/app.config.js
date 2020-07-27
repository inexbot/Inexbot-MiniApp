export default {
  pages: ["pages/index/index"],
  subPackages: [
    {
      root: "pages/subpage/about",
      name: "纳博特",
      pages: ["index"],
    },
    {
      root: "pages/subpage/news",
      name: "新闻",
      pages: ["index", "context"],
    },
    {
      root: "pages/subpage/document",
      name: "手册",
      pages: ["index"],
    },
    {
      root: "pages/subpage/littleclass",
      name: "小课堂",
      pages: ["index"],
    },
    {
      root: "pages/subpage/SearchContent",
      name: "搜索内容",
      pages: ["index"],
    }
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#6190E8",
    navigationBarTitleText: "纳博特开放平台",
    navigationBarTextStyle: "white",
  },
};
