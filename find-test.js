var find = require("find")
var DitherJS = require("ditherjs/server")
var fs = require("fs")

let options = {
  step: 2, // The step for the pixel quantization n = 1,2,3...
  palette: [
    [0, 0, 0],
    [255, 255, 255],
  ], // an array of colors as rgb arrays
  algorithm: "atkinson", // one of ["ordered", "diffusion", "atkinson"]
}

let ditherjs = new DitherJS(options)

let images = find.fileSync(
  new RegExp("17e7322b-de7e-4cee-9270-129f12b01854_tynesidestairs"),
  "./public/static/"
)
images.map(file => {
  console.log(file)

  let buffer = fs.readFileSync(file)
  fs.writeFileSync(file, ditherjs.dither(buffer, options), () => {})
})
