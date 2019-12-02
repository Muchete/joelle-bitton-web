import React from "react"
import { RichText } from "prismic-reactjs"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"

export const query = graphql`
  query ProjectQuery($uid: String) {
    prismic {
      allProjects(uid: $uid) {
        edges {
          node {
            _meta {
              id
            }
            cover_image
            project_title
            project_text
            info_credits_title
            info_credits {
              leftColumn
              rightColumn
            }
            images {
              project_image
            }
          }
        }
      }
    }
  }
`

export default ({ data }) => {
  const project = data.prismic.allProjects.edges

  if (!project) return null

  return (
    <Layout>
      <Link to="/">BACK TO HOME</Link>
      {project.map(({ node: p }) => {
        return (
          <div className="project" key={p._meta.id}>
            <h1>{RichText.asText(p.project_title)}</h1>
            <div className="project-description">
              {p.project_text.map(el => {
                if (el.type === "paragraph") {
                  return <p>{el.text}</p>
                } else if (el.type === "embed") {
                  return (
                    <div dangerouslySetInnerHTML={{ __html: el.oembed.html }} />
                  )
                } else {
                  return null
                }
              })}
              <div>
                <h3>{RichText.asText(p.info_credits_title)}</h3>
                {p.info_credits.map(el => {
                  return (
                    <div>
                      <p className="leftColumn">
                        {RichText.asText(el.leftColumn)}
                      </p>
                      <p className="rightColumn">
                        {RichText.asText(el.rightColumn)}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="gallery">
              {p.images.map(img => {
                return (
                  <img
                    src={img.project_image.url}
                    alt={img.project_image.alt}
                  />
                )
              })}
            </div>
          </div>
        )
      })}
    </Layout>
  )
}
