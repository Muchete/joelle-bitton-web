let DitherJS = require("ditherjs/server")
let fs = require("fs")

function ditherThis() {
  let filename = "jb.jpg"

  let options = {
    step: 6, // The step for the pixel quantization n = 1,2,3...
    palette: [
      [0, 0, 0],
      [255, 255, 255],
    ], // an array of colors as rgb arrays
    algorithm: "atkinson", // one of ["ordered", "diffusion", "atkinson"]
  }

  let ditherjs = new DitherJS(options)

  // Get a buffer that can be loaded into a canvas
  let buffer = fs.readFileSync("./test-images/" + filename)

  fs.writeFile(
    "test-images/dithered-" + filename,
    ditherjs.dither(buffer, options),
    () => {}
  )
}

ditherThis()
