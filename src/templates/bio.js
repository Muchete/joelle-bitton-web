import React from "react"
import { RichText } from "prismic-reactjs"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import CV from "../components/cv"
import ArrowHome from "../components/arrowHome"
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
                  fluid(
                    sizes: "(max-width: 600px) 100vw, (max-width: 1100px) 67vw, (max-width: 1400px) 50vw, (min-width: 1400px) 680px"
                  ) {
                    ...GatsbyImageSharpFluid
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
      {bio_data.map(({ node: bio }, i) => {
        return (
          <div key={"b" + i}>
            <SEO title={RichText.asText(bio.title)} site={data.site} />
            <section className="header hbio">
              <h1>{RichText.asText(bio.title)}</h1>
              <Link className="header__homeLink" to="/">
                <ArrowHome />
              </Link>
            </section>
            <section className="bio">
              <div className="bio__description">
                <RichText render={bio.about_text} linkResolver={linkResolver} />
              </div>
              <div className="bio__links pagelink">
                {bio.links.map(({ link: l }, index) => {
                  return (
                    <span className="bio__link" key={"bio-link" + index}>
                      <RichText render={l} linkResolver={linkResolver} />
                    </span>
                  )
                })}
              </div>
            </section>
            <section className="bio__images">
              {bio.images.map(({ imageSharp: isharp }, index) => {
                if (!isharp.childImageSharp) {
                  return null
                } else {
                  return (
                    <div className="bio__image" key={"bio-img" + index}>
                      <Img fluid={isharp.childImageSharp.fluid} />
                    </div>
                  )
                }
              })}
            </section>
            <CV data={bio.cv} title={RichText.asText(bio.cv_title)} />
          </div>
        )
      })}
    </Layout>
  )
}
