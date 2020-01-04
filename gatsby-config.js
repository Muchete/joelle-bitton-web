module.exports = {
  siteMetadata: {
    title: `Joëlle Bitton`,
    author: `Joëlle Bitton`,
    description: `Works of Joëlle Bitton`,
    colors: {
      Red: `#F37291`,
      Violet: `#A48EE7`,
      Turquoise: `#9EEADD`,
      Yellow: `#FBE36A`
    }
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
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
            component: require.resolve("./src/templates/project.js")
          },
          {
            type: "Bio",
            match: "/bio/",
            path: "/bio-preview",
            component: require.resolve("./src/templates/bio.js")
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/layouts/index.js`)
      }
    }
  ]
};
