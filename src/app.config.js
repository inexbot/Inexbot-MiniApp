export default {
  pages: ["pages/index/index"],
  subPackages: [
    /* {
      root: "pages/subpage/about",
      name: "纳博特",
      pages:["index"]
    },
    {
      root: "pages/subpage/news",
      name: "新闻",
      pages:["index"]
    }, */
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
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
};
