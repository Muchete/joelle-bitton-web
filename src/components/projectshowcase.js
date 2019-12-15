import React, { Component } from "react"
import { Link } from "gatsby"
import { RichText } from "prismic-reactjs"
import Img from "gatsby-image"

import { linkResolver } from "../utils/linkResolver"
let tagList = []
let projects

class Projectshowcase extends Component {
  constructor(props) {
    super(props)
    this.state = { currentFilter: "Main Works" }

    this.props.data.forEach(({ node: p }) => {
      p._meta.tags.forEach(tag => {
        if (tagList.indexOf(tag) === -1) tagList.push(tag)
      })
    })
  }

  setFilter(newFilter) {
    this.setState({ currentFilter: newFilter })
  }

  activeHandler(tag) {
    let classnames = "filter-button"
    if (this.state.currentFilter === tag) classnames += " active"
    return classnames
  }

  render() {
    if (this.state.currentFilter) {
      projects = this.props.data.filter(({ node: project }) => {
        return project._meta.tags.indexOf(this.state.currentFilter) !== -1
      })
    }
    // else {
    //   projects = this.props.data
    // }

    return (
      <section className="showcase">
        <div className="projects-categories filter-set">
          {tagList.map(tag => {
            return (
              <button
                className={this.activeHandler(tag)}
                onClick={() => this.setFilter(tag)}
              >
                {tag}
              </button>
            )
          })}
        </div>
        {projects.map(({ node: project }) => {
          return (
            <div
              className="project"
              key={project._meta.id}
              style={{ marginTop: "20px" }}
            >
              <Link className="project-link" to={linkResolver(project._meta)}>
                <div className="project-image">
                  <div
                    className="project-image-background"
                    style={{
                      backgroundColor: this.props.colors[project.cover_color],
                      lineHeight: 0,
                      width: "500px",
                    }}
                  >
                    <Img
                      fluid={project.cover_imageSharp.childImageSharp.fluid}
                      alt={project.cover_image.alt}
                      style={{
                        // mixBlendMode: "multiply",
                        opacity: 0.7,
                        filter: "grayscale(100%)",
                      }}
                    />
                  </div>
                  <span className="project-title">
                    {RichText.asText(project.project_title)}
                  </span>
                </div>
              </Link>
            </div>
          )
        })}
      </section>
    )
  }
}

export default Projectshowcase
