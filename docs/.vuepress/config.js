module.exports = {
  title: 'Z_di',
  description: '描述描述',
  themeConfig: {
    sidebar: 'auto',
    nav: [
      { text: '笔记', link: '/note/' },
      { text: 'Github', link: 'https://github.com/scorpdi/judi' },
    ],
    sidebar:{
      '/guide/':[
        {
          title: "one",
          collapsable: false,
          path: "one",
          // children: [
          //   { title: "gitlab离线部署", path: "/gitlab" },
          // ],
        },
      ],
      '/note/':[
        {
          title: "部署",
          collapsable: false,
          path:'/note/deploy',
          children: [
            '/note/deploy/gitlab',
            '/note/deploy/docker'
          ],
        },
        {
          title: "JavaScript",
          collapsable: false,
          path:'/note/javascript',
          children: [
            '/note/javascript/test',
            // '/note/deploy/docker'
          ],
        },
        {
          title: "Node.js",
          collapsable: false,
          path:'/note/nodejs',
          children: [
            '/note/nodejs/test',
            // '/note/deploy/docker'
          ],
        }
      ],
    }
  }
}