import React from "react"
import { RichText } from "prismic-reactjs"
import { Link } from "gatsby"
import { linkResolver } from "../utils/linkResolver"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Projectshowcase from "../components/projectshowcase"

export const query = graphql`
  {
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

  return (
    <Layout>
      <SEO title="Home" />
      {home.map(({ node: page }) => {
        return (
          <div>
            <h1>{RichText.asText(page.page_title)}</h1>
            {page.introduction.map(el => {
              return <p>{el.text}</p>
            })}
          </div>
        )
      })}

      {bio.map(({ node: n }) => {
        return (
          <Link to={linkResolver(n._meta)}>{RichText.asText(n.title)}</Link>
        )
      })}

      <Projectshowcase data={projects} />
    </Layout>
  )
}
