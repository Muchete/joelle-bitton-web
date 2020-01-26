import React from "react"
import { RichText } from "prismic-reactjs"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ArrowHome from "../components/arrowHome"
import { linkResolver } from "../utils/linkResolver"

export const query = graphql`
  query blog_postQuery($uid: String) {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
    prismic {
      allBlogposts(uid: $uid) {
        edges {
          node {
            blog_post_title
            post_text
            body {
              ... on PRISMIC_BlogpostBodyText {
                type
                label
                primary {
                  text
                }
              }
              ... on PRISMIC_BlogpostBodyImage {
                type
                label
                fields {
                  image
                  imageSharp {
                    childImageSharp {
                      fluid {
                        ...GatsbyImageSharpFluid
                      }
                    }
                  }
                }
              }
            }
            _meta {
              firstPublicationDate
            }
          }
        }
      }
    }
  }
`

export default ({ data }) => {
  const post = data.prismic.allBlogposts.edges

  if (!post) return null

  return (
    <Layout>
      {post.map(({ node: p }) => {
        return (
          <>
            <SEO title={RichText.asText(p.blog_post_title)} site={data.site} />
            <section className="header hproject hblog" key={p._meta.id}>
              <h1>{RichText.asText(p.blog_post_title)}</h1>
              <Link className="header__homeLink" to="/">
                <ArrowHome />
              </Link>
            </section>
            <section className="proj">
              <div className="proj__description">
                {p.body.map((slice, index) => {
                  switch (slice.type) {
                    case "text":
                      return (
                        <div key={index} className="homepage-slice-wrapper">
                          <RichText
                            className="rt"
                            render={slice.primary.text}
                            linkResolver={linkResolver}
                          />
                        </div>
                      )

                    case "image":
                      return (
                        <div className="blog-img">
                          {slice.fields.map(f => {
                            return (
                              <div className="blog-img__image">
                                <Img
                                  fluid={f.imageSharp.childImageSharp.fluid}
                                  alt={f.image.alt}
                                />
                              </div>
                            )
                          })}
                        </div>
                      )

                    default:
                      return null
                  }
                })}
              </div>
            </section>
          </>
        )
      })}
    </Layout>
  )
}
