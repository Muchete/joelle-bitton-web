var DitherJS = require("ditherjs/server")
var fs = require("fs")
var find = require("find")

let options = {
  step: 3, // The step for the pixel quantization n = 1,2,3...
  palette: [
    [0, 0, 0],
    [255, 255, 255],
  ], // an array of colors as rgb arrays
  algorithm: "atkinson", // one of ["ordered", "diffusion", "atkinson"]
}

let ditherjs = new DitherJS(options)

exports.onPostBuild = async ({ graphql, reporter }) => {
  await graphql(`
    query allDitherImages {
      prismic {
        p0: allProjects(sortBy: meta_firstPublicationDate_DESC) {
          totalCount
          edges {
            node {
              cover_image
              cover_imageSharp {
                name
              }
            }
          }
        }
        p1: allProjects(
          sortBy: meta_firstPublicationDate_DESC
          after: "YXJyYXljb25uZWN0aW9uOjE5"
        ) {
          edges {
            node {
              cover_image
              cover_imageSharp {
                name
              }
            }
          }
        }
        p2: allProjects(
          sortBy: meta_firstPublicationDate_DESC
          after: "YXJyYXljb25uZWN0aW9uOjM5"
        ) {
          edges {
            node {
              cover_image
              cover_imageSharp {
                name
              }
            }
          }
        }
        p3: allProjects(
          sortBy: meta_firstPublicationDate_DESC
          after: "YXJyYXljb25uZWN0aW9uOjU5"
        ) {
          edges {
            node {
              cover_image
              cover_imageSharp {
                name
              }
            }
          }
        }
        p4: allProjects(
          sortBy: meta_firstPublicationDate_DESC
          after: "YXJyYXljb25uZWN0aW9uOjc5"
        ) {
          edges {
            node {
              cover_image
              cover_imageSharp {
                name
              }
            }
          }
        }
      }
    }
  `).then(res => {
    reporter.info("Starting Dithering...")

    const collectEntries = (data, letter, amount) => {
      let proj = []
      let totalCount = data[letter + "0"].totalCount

      for (let i = 0; i < amount; i++) {
        const key = letter + i
        proj.push(...data[key].edges)

        if (proj.length === totalCount) break
      }

      return proj
    }

    const receivedNames = data => {
      let imageList = []

      data.map(({ node: project }) => {
        if (project.cover_imageSharp) {
          imageList.push(project.cover_imageSharp.name)
        }
      })

      ditherFiles(imageList)
    }

    const ditherFiles = filenames => {
      filenames.map(filename => {
        let filepaths = find.fileSync(new RegExp(filename), "./public/static/")
        filepaths.map(file => {
          let buffer = fs.readFileSync(file)
          fs.writeFileSync(file, ditherjs.dither(buffer, options))
        })
      })

      reporter.info(`Successfully dithered cover images!`)
    }

    let projects = collectEntries(res.data.prismic, "p", 5)

    try {
      receivedNames(projects)
    } catch (error) {
      reporter.error("Dithering Failed!")
      reporter.error(error)
    }
  })
}
