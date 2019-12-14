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
  const result = await graphql(`
    query allDitherImages {
      prismic {
        allProjects {
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
  `)

  receivedNames(result.data.prismic.allProjects.edges)

  function receivedNames(data) {
    let imageList = []

    data.map(({ node: project }) => {
      imageList.push(project.cover_imageSharp.name)
    })

    ditherFiles(imageList)
  }

  function ditherFiles(filenames) {
    filenames.map(filename => {
      let filepaths = find.fileSync(new RegExp(filename), "./public/static/")
      filepaths.map(file => {
        let buffer = fs.readFileSync(file)
        fs.writeFileSync(file, ditherjs.dither(buffer, options))
      })
    })

    reporter.info(`Dithered cover images!`)
  }
}
