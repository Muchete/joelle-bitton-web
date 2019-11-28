import React, { Component } from "react"
// import Img from "gatsby-image"

class Image extends Component {
  render() {
    return (
      <div>
        {/* <Img fluid={} /> */}
        <img
          alt={this.props.data.cover_image.alt}
          src={this.props.data.cover_image.url}
        ></img>
      </div>
    )
  }
}

export default Image
