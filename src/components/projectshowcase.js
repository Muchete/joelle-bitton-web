import React, { Component } from "react"
import { Link } from "gatsby"
import { RichText } from "prismic-reactjs"

import { linkResolver } from "../utils/linkResolver"
import Image from "../components/image"
let tagList = []

class Projectshowcase extends Component {
  constructor(props) {
    super(props)
    this.state = { currentFilter: "Main Works" }
    // this.state = { currentFilter: "Interaction Design" }

    this.props.data.forEach(({ node: p }) => {
      p._meta.tags.forEach(tag => {
        if (tagList.indexOf(tag) === -1) tagList.push(tag)
      })
    })
  }

  render() {
    let projects = this.props.data

    if (this.state.currentFilter) {
      projects = projects.filter(({ node: project }) => {
        return project._meta.tags.indexOf(this.state.currentFilter) !== -1
      })
    }

    return (
      <div className="projects">
        <div className="tags">
          {tagList.map(tag => {
            return (
              <button onClick={() => this.setState({ currentFilter: tag })}>
                {tag}
              </button>
            )
          })}
        </div>
        {projects.map(({ node: project }) => {
          return (
            <div className="project" key={project._meta.id}>
              <Link to={linkResolver(project._meta)}>
                <div>
                  <div style={{ maxWidth: `300px` }}>
                    <Image data={project} colors={this.props.colors} />
                  </div>
                  <span>{RichText.asText(project.project_title)}</span>
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    )
  }
}

export default Projectshowcase
