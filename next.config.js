/** @type {import('next').NextConfig} */
module.exports = {
  webpack5: true,
  images: {
    domains: [
      'gravatar.com',
      'images.unsplash.com',
      'www.notion.so',
      's3-us-west-3.amazonaws.com',
      's3-us-west-2.amazonaws.com',
      's3-us-west-1.amazonaws.com'
    ]
  },
  eslint: {
    dirs: ['components', 'layouts', 'lib', 'pages']
  },
}
