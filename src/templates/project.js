import React from "react"
import { RichText } from "prismic-reactjs"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ArrowHome from "../components/arrowHome"
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

  // function calcPadding(aspectRatio) {
  //   return { "padding-top": 100 / aspectRatio + "%" }
  // }

  function calcWidth(aspectRatio) {
    return { width: 75 * aspectRatio + "%" }
  }

  return (
    <Layout>
      {project.map(({ node: p }) => {
        return (
          <>
            <SEO title={RichText.asText(p.project_title)} site={data.site} />
            <section className="header hproject" key={p._meta.id}>
              <h1>
                <Link className="header__homeLink" to="/">
                  <ArrowHome />
                </Link>
                {RichText.asText(p.project_title)}
              </h1>
            </section>
            <section className="slider">
              <div className="slider__images">
                {p.images.map(({ project_imageSharp: i }) => {
                  return (
                    <div
                      className="slider__image"
                      style={calcWidth(i.childImageSharp.fluid.aspectRatio)}
                    >
                      {/* <div
                      style={calcPadding(i.childImageSharp.fluid.aspectRatio)}
                    > */}
                      <Img fluid={i.childImageSharp.fluid} />
                      {/* </div> */}
                    </div>
                  )
                })}
              </div>
            </section>
            <section className="proj">
              <div className="proj__description">
                <RichText render={p.project_text} linkResolver={linkResolver} />
              </div>
              <h2 className="proj__infoTitle">
                {RichText.asText(p.info_credits_title)}
              </h2>
              <div className="proj__info">
                {p.info_credits.map(el => {
                  return (
                    <div className="proj__info__entry">
                      <RichText
                        render={el.leftColumn}
                        linkResolver={linkResolver}
                        className="--left"
                        Component="span"
                      />
                      <RichText
                        render={el.rightColumn}
                        linkResolver={linkResolver}
                        className="--right"
                        Component="span"
                      />
                    </div>
                  )
                })}
              </div>
            </section>
          </>
        )
      })}
    </Layout>
  )
}
