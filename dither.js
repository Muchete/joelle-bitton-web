var DitherJS = require("ditherjs/server")
var fs = require("fs")
var filename = "jb.jpg"

var options = {
  step: 2, // The step for the pixel quantization n = 1,2,3...
  palette: [
    [0, 0, 0],
    [255, 255, 255],
  ], // an array of colors as rgb arrays
  algorithm: "atkinson", // one of ["ordered", "diffusion", "atkinson"]
}

var ditherjs = new DitherJS(options)

// Get a buffer that can be loaded into a canvas
var buffer = fs.readFileSync("./test-images/" + filename)

fs.writeFile(
  "test-images/dithered-" + filename,
  ditherjs.dither(buffer, options),
  () => {}
)
