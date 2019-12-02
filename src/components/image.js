import React, { Component } from "react"
// import Img from "gatsby-image"

class Image extends Component {
  constructor(props) {
    super(props)
  }

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
            opacity: 0.5,
          }}
        ></img>
      </div>
    )
  }
}

export default Image
