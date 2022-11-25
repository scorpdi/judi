
export default {
  title: "Scorp",
  description: "Docs && notes",

  lastUpdated: true,
  cleanUrls: 'without-subfolders',

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#3c8772' }]
  ],

  markdown: {
    headers: {
      level: [0, 0]
    }
  },

  themeConfig: {

    siteTitle: 'Scorp Docs',

    nav: [
      { text: '笔记', link: '/notes/deploy/docker', activeMatch: '/notes/' },
      { text: 'TypeScript', link: '/study/typescript/ts-tutorial', activeMatch: '/study/' }
    ],

    sidebar: {
      "/notes/": sidebarNotes(),
      "/guide/": [{
        text: 'Guide',
        collapsible: true,
        items: [
          { text: '说明', link: '/guide/getting-started' },
        ]
      }],
      '/study/':[{
        text: 'TypeScript',
        collapsible: true,
        items: [
          { text: '介绍', link: '/study/typescript/ts-ts-tutorial' },
          { text: '安装', link:'/study/typescript/ts-install'},
          { text: '基础语法', link:'/study/typescript/ts-basic-syntax'},
          { text: '基础类型', link:'/study/typescript/ts-type'}
        ]
      }]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/scorpdi/judi' }
    ],



    footer: {
      message: '<a href="https://beian.miit.gov.cn/">浙ICP备2021033705号-2</a>'
    },

    // algolia: {
    //   appId: '8J64VVRP8K',
    //   apiKey: 'a18e2f4cc5665f6602c5631fd868adfd',
    //   indexName: 'vitepress'
    // },
  },
};

function sidebarNotes() {
  return [
    {
      text: "记录",
      collapsible: true,
      items: [
        { text: '思维导图', link: '/notes/index' }
      ]
    },
    {
      text: "javascript",
      collapsible: true,
      items: [
        { text: '设计模式', link: '/notes/javascript/design-mode' }
      ]
    },
    {
      text: "node",
      collapsible: true,
      items: [
        { text: 'sequelize', link: '/notes/nodejs/sequelize' }
      ]
    },
    {
      text: "计算机网络基础",
      collapsible: true,
      items: [
        { text: 'http&https', link: '/notes/network/http&https' },
        { text: 'UDP&TCP', link: '/notes/network/UDP&TCP' }
      ]
    },
    {
      text: "部署",
      collapsible: true,
      items: [
        { text: 'docker', link: '/notes/deploy/docker' },
        { text: 'gitlab', link: '/notes/deploy/gitlab' },
        { text: 'nodebb', link: '/notes/deploy/nodebb' },
      ]
    },
  ]
}
