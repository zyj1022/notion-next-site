const SITE = {
  title: 'CODEFFE-前端技术周刊',
  author: 'ZhiKing',
  email: 'zyj10222@126.com',
  link: 'https://codeffe.vercel.app',
  description: '记录每周发现的前端及周边新鲜货。',
  lang: 'zh-CN',
  appearance: 'auto', // ['light', 'dark', 'auto'],
  font: 'sans-serif', // ['sans-serif', 'serif']
  lightBackground: '#ffffff', // use hex value, don't forget '#' e.g #fffefc
  darkBackground: '#111827', // use hex value, don't forget '#'
  path: '', // leave this empty unless you want to deploy Nobelium in a folder
  since: 2021, // if leave this empty, current year will be used.
  postsPerPage: 9,
  sortByDate: true,
  showAbout: true, // WIP
  showArchive: true, // WIP
  autoCollapsedNavBar: false, // the automatically collapsed navigation bar
  socialLink: 'https://twitter.com/zyj1022',
  seo: {
    keywords: ['Blog', 'Website', 'Notion'],
    googleSiteVerification: '' // Remove the value or replace it with your own google site verification code
  },
  notionSecret: process.env.NOTION_SECRET,
  notionPageId: process.env.NOTION_PAGE_ID,
  notionAccessToken: process.env.NOTION_ACCESS_TOKEN,
  analytics: {
    provider: '', // Currently we support Google Analytics and Ackee, please fill with 'ga' or 'ackee', leave it empty to disable it.
    ackeeConfig: {
      tracker: '', // e.g 'https://ackee.craigary.net/tracker.js'
      dataAckeeServer: '', // e.g https://ackee.craigary.net , don't end with a slash
      domainId: '' // e.g '0e2257a8-54d4-4847-91a1-0311ea48cc7b'
    },
    gaConfig: {
      measurementId: '' // e.g: G-XXXXXXXXXX
    },
    baiduHM: '6fff4d4b9862cef6ecdd42f3c3b8a393'
  },
  comment: {
    // support provider: gitalk, utterances, cusdis
    provider: 'cusdis', // leave it empty if you don't need any comment plugin
    gitalkConfig: {
      repo: 'https://gitlab.com/codeffe/nobelium', // The repository of store comments
      owner: 'ZHI',
      admin: ['ZHI'],
      clientID: '62d10f8a1aa88a00825e',
      clientSecret: '5ee3203160cb08999fa238f8a12aeb14b915356e',
      distractionFreeMode: false
    },
    utterancesConfig: {
      repo: ''
    },
    cusdisConfig: {
      appId: '35bf5048-d6d4-4e58-ba4d-4212c2422b22', // data-app-id
      host: 'https://cusdis.com', // data-host, change this if you're using self-hosted version
      scriptSrc: 'https://cusdis.com/js/cusdis.es.js' // change this if you're using self-hosted version
    }
  },
  isProd: process.env.VERCEL_ENV === 'production' // distinguish between development and production environment (ref: https://vercel.com/docs/environment-variables#system-environment-variables)
}
module.exports = SITE
