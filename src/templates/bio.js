import React from "react"
import { RichText } from "prismic-reactjs"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import CV from "../components/cv"
import SEO from "../components/seo"
import { linkResolver } from "../utils/linkResolver"

export const query = graphql`
  query bio {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
    prismic {
      allBios {
        edges {
          node {
            title
            about_text
            cv_title
            _linkType
            cv {
              category
              text
              year
            }
            images {
              image
              imageSharp {
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
            links {
              link
            }
          }
        }
      }
    }
  }
`

export default ({ data }) => {
  const bio_data = data.prismic.allBios.edges

  if (!bio_data) return null

  return (
    <Layout>
      {bio_data.map(({ node: bio }) => {
        return (
          <>
            <SEO title={RichText.asText(bio.title)} site={data.site} />
            <section className="bio__info">
              <Link to="/">BACK TO HOME</Link>
              <h1>{RichText.asText(bio.title)}</h1>
              <div className="bio__description">
                <RichText render={bio.about_text} linkResolver={linkResolver} />
              </div>
              <div className="bio__links">
                {bio.links.map(({ link: l }) => {
                  return <RichText render={l} linkResolver={linkResolver} />
                })}
              </div>
            </section>
            <CV data={bio.cv} title={RichText.asText(bio.cv_title)} />
            <section className="bio__images">
              {bio.images.map(({ imageSharp: i }) => {
                return (
                  <div className="bio__image">
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
