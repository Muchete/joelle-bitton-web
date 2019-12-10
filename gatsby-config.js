module.exports = {
  siteMetadata: {
    title: `Joëlle Bitton`,
    description: `Showing the work of Joëlle Bitton`,
    colors: {
      Red: `#F37291`,
      Violet: `#A48EE7`,
      Turquoise: `#9EEADD`,
      Yellow: `#FBE36A`,
    },
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        // icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-prismic-graphql`,
      options: {
        repositoryName: "joelle-bitton",
        path: "/preview",
        previews: true,
        pages: [
          {
            type: "Project",
            match: "/projects/:uid",
            path: "/project-preview",
            component: require.resolve("./src/templates/project.js"),
          },
          {
            type: "Bio",
            match: "/bio/",
            path: "/bio-preview",
            component: require.resolve("./src/templates/bio.js"),
          },
        ],
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
