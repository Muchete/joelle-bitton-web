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
                  fluid(
                    sizes: "(max-width: 600px) 100vw, (max-width: 1100px) 67vw, (max-width: 1400px) 50vw, (min-width: 1400px) 680px"
                  ) {
                    ...GatsbyImageSharpFluid
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

  function setInfo(text) {
    if (text && RichText.asText(text) !== "") {
      return RichText.asText(text)
    } else {
      return "Info & Credits"
    }
  }

  return (
    <Layout>
      {project.map(({ node: p }, i) => {
        return (
          <div key={"p" + i}>
            <SEO title={RichText.asText(p.project_title)} site={data.site} />
            <section className="header hproject" key={p._meta.id}>
              <h1>{RichText.asText(p.project_title)}</h1>
              <Link className="header__homeLink" to="/">
                <ArrowHome />
              </Link>
            </section>
            <section className="slider">
              <div className="slider__images">
                {p.images.map(({ project_imageSharp: i }, index) => {
                  if (i && i.childImageSharp) {
                    return (
                      <div
                        key={"simg" + index}
                        className="slider__image"
                        style={calcWidth(i.childImageSharp.fluid.aspectRatio)}
                      >
                        <Img fluid={i.childImageSharp.fluid} />
                      </div>
                    )
                  } else {
                    return null
                  }
                })}
              </div>
            </section>
            <section className="proj">
              <div className="proj__description">
                <RichText render={p.project_text} linkResolver={linkResolver} />
              </div>
              <h2 className="proj__infoTitle">
                {setInfo(p.info_credits_title)}
              </h2>
              <div className="proj__info">
                {p.info_credits.map((el, index) => {
                  return (
                    <div
                      className="proj__info__entry"
                      key={"info-entry" + index}
                    >
                      {el.leftColumn && el.rightColumn && (
                        <>
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
                        </>
                      )}
                    </div>
                  )
                })}
              </div>
            </section>
          </div>
        )
      })}
    </Layout>
  )
}
