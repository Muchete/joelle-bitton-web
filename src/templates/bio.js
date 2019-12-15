import React from "react"
import { RichText } from "prismic-reactjs"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import CV from "../components/cv"
import { linkResolver } from "../utils/linkResolver"

export const query = graphql`
  query Bio {
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
      <Link to="/">BACK TO HOME</Link>
      {bio_data.map(({ node: bio }) => {
        return (
          <>
            <section className="bio info">
              <h1>{RichText.asText(bio.title)}</h1>
              <div className="bio-description">
                <RichText render={bio.about_text} linkResolver={linkResolver} />
              </div>
              <div className="bio-links">
                {bio.links.map(({ link: l }) => {
                  return <RichText render={l} linkResolver={linkResolver} />
                })}
              </div>
            </section>
            <CV data={bio.cv} title={RichText.asText(bio.cv_title)} />
            <section className="bio-images images">
              {bio.images.map(({ imageSharp: i }) => {
                return (
                  <div className="bio-image image">
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
