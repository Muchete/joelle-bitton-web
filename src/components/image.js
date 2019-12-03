import React, { Component } from "react"
// import Img from "gatsby-image"

class ProjectImage extends Component {
  // constructor(props) {
  //   super(props)
  // }

  render() {
    return (
      <div
        style={{
          backgroundColor: this.props.colors[this.props.data.cover_color],
          lineHeight: 0,
        }}
      >
        {/* <Img fluid={} /> */}
        <img
          alt={this.props.data.cover_image.alt}
          src={this.props.data.cover_image.url}
          style={{
            opacity: 0.7,
            // mixBlendMode: "multiply",
            filter: "grayscale(100%)",
          }}
        ></img>
      </div>
    )
  }
}

export default ProjectImage
