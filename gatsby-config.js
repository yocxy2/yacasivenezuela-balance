/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Ya Casi Venezuela (Balance)`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    `babel-plugin-styled-components`,
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        "icon": "src/images/favicon.png"
      }
    },
  ],
}
