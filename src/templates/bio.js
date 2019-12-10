import React from "react"
import { RichText } from "prismic-reactjs"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
// import { linkResolver } from "../utils/linkResolver"

import Layout from "../components/layout"
import CV from "../components/cv"

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
          <div>
            <h1>{RichText.asText(bio.title)}</h1>
            <div className="bio-description">
              {bio.about_text.map(el => {
                return <p>{el.text}</p>
              })}
            </div>
            <div className="links">
              {bio.links.map(({ link: l }) => {
                return (
                  <div className="link">
                    <a href={l[0].spans[0].data.url}>{l[0].text}</a>
                  </div>
                )
              })}
            </div>
            <div className="cv">
              <h3>{RichText.asText(bio.cv_title)}</h3>
            </div>
            <CV data={bio.cv} />
            <div className="bio-images images">
              {bio.images.map(({ imageSharp: i }) => {
                return (
                  <div className="image">
                    <Img fluid={i.childImageSharp.fluid} />
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </Layout>
  )
}
