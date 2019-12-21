import React from "react"
import { RichText } from "prismic-reactjs"
import { Link, graphql } from "gatsby"
import { linkResolver } from "../utils/linkResolver"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Projectshowcase from "../components/projectshowcase"

export const query = graphql`
  query home {
    site {
      siteMetadata {
        title
        description
        author
        colors {
          Red
          Turquoise
          Violet
          Yellow
        }
      }
    }
    prismic {
      allProjects(sortBy: meta_firstPublicationDate_DESC) {
        edges {
          node {
            _meta {
              tags
              uid
              type
            }
            cover_image
            cover_imageSharp {
              childImageSharp {
                fluid {
                  srcSet
                  src
                  base64
                  aspectRatio
                }
              }
            }
            cover_color
            project_title
          }
        }
      }
      allHomes(last: 1) {
        edges {
          node {
            page_title
            introduction
          }
        }
      }
      allBios(last: 1) {
        edges {
          node {
            title
            _meta {
              uid
              type
            }
          }
        }
      }
    }
  }
`
export default ({ data }) => {
  const home = data.prismic.allHomes.edges
  const bio = data.prismic.allBios.edges
  const projects = data.prismic.allProjects.edges
  const colors = data.site.siteMetadata.colors

  return (
    <Layout>
      <SEO title="Home" site={data.site} />
      <section className="header home">
        {home.map(({ node: page }) => {
          return <h1>{RichText.asText(page.page_title)}</h1>
        })}
      </section>
      <section className="info">
        {home.map(({ node: page }) => {
          return (
            <RichText
              render={page.introduction}
              linkResolver={linkResolver}
              Component="div"
              className="introduction"
            />
          )
        })}

        {bio.map(({ node: n }) => {
          return (
            <Link to={linkResolver(n._meta)} className="bio__pagelink">
              {RichText.asText(n.title)}
            </Link>
          )
        })}
      </section>
      <Projectshowcase data={projects} colors={colors} />
    </Layout>
  )
}
