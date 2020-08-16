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
      White: `#FFF`,
    },
  },
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-prismic-graphql`,
      options: {
        repositoryName: "joelle-bitton",
        // path: "/preview",
        previews: false,
        pages: [
          {
            type: "Project",
            match: "/projects/:uid",
            path: "/project-preview",
            component: require.resolve("./src/templates/project.js"),
          },
          {
            type: "Blogpost",
            match: "/blog/:uid",
            path: "/blog-preview",
            component: require.resolve("./src/templates/blog.js"),
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
  ],
}
