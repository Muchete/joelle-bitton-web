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

function ditherFiles(filenames) {
  filenames.forEach(filename => {
    find.file(new RegExp(filename), "./dither-img", files => {
      files.forEach(file => {
        fs.readFile(file, (err, data) => {
          fs.writeFile(file, ditherjs.dither(data, options), () => {
            console.log("Dithered: " + filename)
          })
        })
      })
    })
  })
}

ditherFiles(["a.jpg", "b.jpg"])
