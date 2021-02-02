import React, { Component } from "react"
import { Link } from "gatsby"
import { RichText, Date } from "prismic-reactjs"
import Img from "gatsby-image"
import BlogOverview from "../components/blogOverview"

import { linkResolver } from "../utils/linkResolver"
let tagList = []
const extraTagList = ["News", "Blog"]
let extraTags = {}
const showEmptyExtra = true
let projects
let posts

class Projectshowcase extends Component {
  constructor(props) {
    super(props)
    this.state = { currentFilter: "Main Works" }

    extraTagList.forEach(tag => {
      extraTags[tag] = { exists: showEmptyExtra }
    })

    this.props.data.forEach(({ node: p }) => {
      p._meta.tags.forEach(tag => {
        if (tagList.indexOf(tag) === -1 && extraTagList.indexOf(tag) === -1) {
          tagList.push(tag)
        } else if (extraTagList.indexOf(tag) > -1) {
          extraTags[tag].exists = true
        }
      })
    })

    const order = this.props.order
    tagList.sort((a, b) => {
      if (order.indexOf(a) === -1) return 1
      if (order.indexOf(b) === -1) return -1
      return order.indexOf(a) - order.indexOf(b)
    })

    posts = this.props.posts
    if (posts.length) extraTags["Blog"].exists = true
  }

  setFilter(newFilter) {
    this.setState({ currentFilter: newFilter })
  }

  convertDate(date) {
    date = Date(date)
    return date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
  }

  componentDidMount() {
    let url = new URL(window.location.href)
    let urlTag = url.searchParams.get("tag")
    if (urlTag) this.setFilter(urlTag)
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

    let ProjectsList = ({ projects }) => {
      if (projects.length <= 0) {
        return null
      } else {
        return (
          <div className="projects">
            {projects.map(({ node: project }) => {
              return (
                <div className="project" key={project._meta.uid}>
                  <Link
                    className="project__link"
                    to={linkResolver(project._meta)}
                  >
                    <div className="project__image">
                      {project.cover_imageSharp ? (
                        <div
                          className="project__image-background"
                          style={{
                            backgroundColor: this.props.colors[
                              project.cover_color
                            ],
                          }}
                        >
                          <Img
                            fluid={
                              project.cover_imageSharp.childImageSharp.fluid
                            }
                            alt={project.cover_image.alt}
                          />
                        </div>
                      ) : (
                          <div className="project__image-placeholder"></div>
                        )}
                      <span className="project__title">
                        {RichText.asText(project.project_title)}
                        {project._meta.tags.indexOf("News") !== -1 &&
                          <>
                            <br />
                            {this.convertDate(project.project_date)}
                          </>
                        }
                      </span>
                    </div>
                  </Link>
                </div>
              )
            })}
          </div>
        )
      }
    }

    return (
      <section className="showcase">
        <div className="filter">
          {tagList.map(tag => {
            return (
              <button
                className={this.activeHandler(tag)}
                onClick={() => this.setFilter(tag)}
                key={tag + "-button"}
              >
                {tag}
              </button>
            )
          })}
          <div className="extra">
            {extraTagList.map(tag => {
              if (extraTags[tag].exists) {
                return (
                  <button
                    className={this.activeHandler(tag)}
                    onClick={() => this.setFilter(tag)}
                    key={tag + "-button"}
                  >
                    {tag}
                  </button>
                )
              } else return null
            })}
          </div>
        </div>
        {this.state.currentFilter !== "Blog" ? (
          <ProjectsList projects={projects} />
        ) : (
            <BlogOverview posts={posts} />
          )}
      </section>
    )
  }
}

export default Projectshowcase
