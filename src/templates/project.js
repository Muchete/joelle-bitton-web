import React from "react"
import { RichText } from "prismic-reactjs"
import { Link } from "gatsby"
// import { linkResolver } from "../utils/linkResolver"

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
            infoCreditsTitle
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
                return <p>{el.text}</p>
              })}
              <div>
                <h3>{RichText.asText(p.infoCreditsTitle)}</h3>
                {p.info_credits.map(el => {
                  return (
                    <div>
                      <p>{RichText.asText(el.leftColumn)}</p>
                      <p>{RichText.asText(el.rightColumn)}</p>
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
