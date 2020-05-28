var DitherJS = require("ditherjs/server")
var fs = require("fs")
var find = require("find")
var btoa = require("btoa")
let imageList = []
let projectData = []
let blogData = []

let options = {
  step: 3, // The step for the pixel quantization n = 1,2,3...
  palette: [
    [0, 0, 0],
    [255, 255, 255],
  ], // an array of colors as rgb arrays
  algorithm: "atkinson", // one of ["ordered", "diffusion", "atkinson"]
}

let ditherjs = new DitherJS(options)

exports.createPages = async ({ actions, graphql, reporter }) => {
  const initialQuery = await graphql(`
    query total {
      prismic {
        allProjects(sortBy: meta_firstPublicationDate_DESC) {
          totalCount
        }
        allBlogposts(sortBy: meta_firstPublicationDate_DESC) {
          totalCount
        }
      }
    }
  `)

  let totalProjects = initialQuery.data.prismic.allProjects.totalCount
  let totalBlogposts = initialQuery.data.prismic.allBlogposts.totalCount

  //get all Projects
  while (projectData.length < totalProjects) {
    const cursor = btoa("arrayconnection:" + (projectData.length - 1))

    const p = await graphql(`
      query projectSet {
        prismic {
          allProjects(
            sortBy: meta_firstPublicationDate_DESC
            after: "${cursor}"
          ) {
            totalCount
            edges {
              node {
                _meta {
                  tags
                  uid
                  type
                }
                cover_image
                cover_imageSharp {
                  name
                  childImageSharp {
                    fluid(
                      sizes: "(max-width: 376px) 100vw, (max-width: 600px) 50vw, (max-width: 1100px) 67vw, (max-width: 1400px) 67vw, (min-width: 1400px) 904px"
                    ) {
                      aspectRatio
                      base64
                      sizes
                      src
                      srcWebp
                      srcSet
                      srcSetWebp
                    }
                  }
                }
                cover_color
                project_title
              }
            }
          }
        }
      }
    `)

    projectData.push(...p.data.prismic.allProjects.edges)
  }
  reporter.info("projectData length:" + projectData.length)

  //get all Blog Posts
  while (blogData.length < totalBlogposts) {
    const cursor = btoa("arrayconnection:" + (blogData.length - 1))

    const bp = await graphql(`
      query blogSet {
        prismic {
          allBlogposts(
            sortBy: meta_firstPublicationDate_DESC
            after: "${cursor}"
          ) {
            edges {
              node {
                blog_post_title
                body {
                  ... on PRISMIC_BlogpostBodyText {
                    type
                    label
                    primary {
                      text
                    }
                  }
                  ... on PRISMIC_BlogpostBodyImage {
                    type
                    label
                    fields {
                      imageSharp {
                        id
                      }
                      image
                    }
                  }
                }
                _meta {
                  firstPublicationDate
                  uid
                  id
                  type
                }
              }
            }
          }
        }
      }
    `)

    blogData.push(...bp.data.prismic.allBlogposts.edges)
  }
  reporter.info("blogData length:" + blogData.length)

  actions.createPage({
    path: "/",
    component: require.resolve("./src/templates/home.js"),
    context: { projectData: projectData, blogData: blogData },
  })
}
