import React from "react"
import { Link } from "gatsby"
import { linkResolver } from "../utils/linkResolver"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

export const query = graphql`
  {
    prismic {
      allProjects {
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
            <h1>{page.page_title[0].text}</h1>
            {page.introduction.map(el => {
              return <p>{el.text}</p>
            })}
          </div>
        )
      })}

      {bio.map(({ node: n }) => {
        return <Link to={linkResolver(n._meta)}>{n.title[0].text}</Link>
      })}

      {projects.map(({ node: project }) => {
        return (
          <Link to={linkResolver(project._meta)}>
            <div>
              <div style={{ maxWidth: `300px` }}>
                <Image data={project} />
              </div>
              <span>{project.project_title[0].text}</span>
            </div>
          </Link>
        )
      })}

      {/* <Link to="/page-2/">
        <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
          <Image />
        </div>
        <span>Crazy text</span>
      </Link> */}
    </Layout>
  )
}
