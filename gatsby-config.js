module.exports = {
  siteMetadata: {
    title: `Joëlle Bitton`,
    author: `Joëlle Bitton`,
    description: `Works of Joëlle Bitton`,
    colors: {
      Red: `#F37291`,
      Violet: `#A48EE7`,
      Turquoise: `#9EEADD`,
      Yellow: `#FBE36A`,
    },
  },
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-transition-link`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    // {
    //   resolve: `gatsby-plugin-manifest`,
    //   options: {
    //     name: `Joëlle Bitton`,
    //     short_name: `J. Bitton`,
    //     start_url: `/`,
    //     background_color: `#663399`,
    //     theme_color: `#663399`,
    //     display: `minimal-ui`,
    //     // icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
    //   },
    // },
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
