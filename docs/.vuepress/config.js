module.exports = {
  base:'/docs/',
  title: 'Scorp',
  description: '个人文档、笔记归纳记录',
  themeConfig: {
    sidebar: 'auto',
    nav: [
      { text: '笔记', link: '/note/' },
      { text: 'Github', link: 'https://github.com/scorpdi/judi' },
    ],
    sidebar:{
      '/guide/':[
        '/guide/',
        '/guide/one'
      ],
      '/note/':[
        {
          title: "计算机网络相关",
          collapsable: false,
          path:'/note/network',
          children: [
            '/note/network/UDP&TCP',
            '/note/network/http&https'
          ],
        },
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
            '/note/nodejs/sequelize',
            // '/note/deploy/docker'
          ],
        }
      ],
    }
  },
  plugins: ['@vuepress/back-to-top']
}