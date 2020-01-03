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
    let classnames = "filter__item"
    if (this.state.currentFilter === tag) classnames += " filter__item--active"
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
        <div className="filter">
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
        <div className="projects">
          {projects.map(({ node: project }) => {
            return (
              <div className="project" key={project._meta.id}>
                <Link
                  className="project__link"
                  to={linkResolver(project._meta)}
                >
                  <div className="project__image">
                    <div
                      className="project__image-background"
                      style={{
                        backgroundColor: this.props.colors[project.cover_color],
                      }}
                    >
                      <Img
                        fluid={project.cover_imageSharp.childImageSharp.fluid}
                        alt={project.cover_image.alt}
                      />
                    </div>
                    <span className="project__title">
                      {RichText.asText(project.project_title)}
                    </span>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
      </section>
    )
  }
}

export default Projectshowcase
