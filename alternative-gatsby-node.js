var DitherJS = require("ditherjs/server")
var fs = require("fs")
var find = require("find")
var btoa = require("btoa")
let imageList = []
let dataPosts = []

let options = {
  step: 3, // The step for the pixel quantization n = 1,2,3...
  palette: [
    [0, 0, 0],
    [255, 255, 255],
  ], // an array of colors as rgb arrays
  algorithm: "atkinson", // one of ["ordered", "diffusion", "atkinson"]
}

let ditherjs = new DitherJS(options)

exports.createPages = async ({ graphql, reporter }) => {
  const q1 = await graphql(`
    query total {
      prismic {
        allProjects(sortBy: meta_firstPublicationDate_DESC) {
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

  let totalPosts = q1.data.prismic.allProjects.totalCount
  dataPosts.push(...q1.data.prismic.allProjects.edges)

  while (dataPosts.length < totalPosts) {
    const cursor = btoa("arrayconnection:" + (dataPosts.length - 1))

    const q = await graphql(`
      query total {
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

    dataPosts.push(...q.data.prismic.allProjects.edges)
  }

  // dataPosts.forEach(({ node }) => {
  //   reporter.info(node._meta.uid)
  // })
}

exports.onPostBuild = async ({ reporter }) => {
  dataPosts.map(({ node: project }) => {
    if (project.cover_imageSharp) {
      imageList.push(project.cover_imageSharp.name)
    }
  })

  const ditherFiles = filenames =>
    new Promise(resolve => {
      let promiselist = []

      filenames.forEach(filename => {
        find.file(new RegExp(filename), "./dither-img", files => {
          files.forEach(file => {
            const p = new Promise(resolve => {
              fs.readFile(file, (err, data) => {
                fs.writeFile(file, ditherjs.dither(data, options), () => {
                  resolve(filename)
                })
              })
            })
            promiselist.push(p)
          })
        })
      })

      Promise.all(promiselist).then(xy => {
        resolve(xy)
      })
    })

  ditherFiles(imageList).then(answer => {
    reporter.info(answer)
  })
}
