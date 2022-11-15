
export default {
  title: "Scorp",
  description: "Just playing around.",

  lastUpdated: true,
  cleanUrls: 'without-subfolders',

  head: [
    ['link', { rel: 'icon', href: '/public/favicon.ico' }],
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
      { text: '笔记', link: '/notes/deploy/docker', activeMatch: '/notes/' }
    ],

    sidebar: {
      "/notes/": sidebarNotes(),
      "/guide/": [{
        text: 'Guide',
        collapsible: true,
        items: [
          { text: 'Getting Started', link: '/guide/getting-started' },
        ]
      }]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/scorpdi/judi' }
    ]
  },
};

function sidebarNotes() {
  return [
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
