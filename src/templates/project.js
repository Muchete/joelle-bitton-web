import React from "react"
import { RichText } from "prismic-reactjs"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { linkResolver } from "../utils/linkResolver"

export const query = graphql`
  query projectQuery($uid: String) {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
    prismic {
      allProjects(uid: $uid) {
        edges {
          node {
            _meta {
              id
            }
            project_title
            project_text
            info_credits_title
            info_credits {
              leftColumn
              rightColumn
            }
            images {
              project_image
              project_imageSharp {
                childImageSharp {
                  fluid {
                    srcSet
                    src
                    base64
                    aspectRatio
                  }
                }
              }
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
      {project.map(({ node: p }) => {
        return (
          <>
            <SEO title={RichText.asText(p.project_title)} site={data.site} />
            <section className="project info" key={p._meta.id}>
              <Link to="/">BACK TO HOME</Link>
              <h1>{RichText.asText(p.project_title)}</h1>
              <div className="project-description">
                <RichText render={p.project_text} linkResolver={linkResolver} />
                <div className="project-description-info">
                  <h3>{RichText.asText(p.info_credits_title)}</h3>
                  {p.info_credits.map(el => {
                    return (
                      <>
                        <RichText
                          render={el.leftColumn}
                          linkResolver={linkResolver}
                          className="leftColumn"
                          Component="span"
                        />
                        <RichText
                          render={el.rightColumn}
                          linkResolver={linkResolver}
                          className="rightColumn"
                          Component="span"
                        />
                      </>
                    )
                  })}
                </div>
              </div>
            </section>

            <section className="proj-images images">
              {p.images.map(({ project_imageSharp: i }) => {
                return (
                  <div className="image">
                    <Img fluid={i.childImageSharp.fluid} />
                  </div>
                )
              })}
            </section>
          </>
        )
      })}
    </Layout>
  )
}
