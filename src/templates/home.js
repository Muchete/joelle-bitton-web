import React from "react"
import { RichText } from "prismic-reactjs"
import { Link, graphql } from "gatsby"
import { linkResolver } from "../utils/linkResolver"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Projectshowcase from "../components/projectshowcase"

let order = []

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
      allHomes(last: 1) {
        edges {
          node {
            page_title
            introduction
            tag_order {
              tag_name
            }
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
export default ({ data, pageContext }) => {
  const colors = data.site.siteMetadata.colors
  const home = data.prismic.allHomes.edges
  const bio = data.prismic.allBios.edges
  const projects = pageContext.projectData
  const posts = pageContext.blogData

  home.forEach(site => {
    site.node.tag_order.forEach(tag => {
      order.push(tag.tag_name[0].text)
    })
  })

  return (
    <Layout>
      <SEO title="Home" site={data.site} />
      <section className="header home">
        {home.map(({ node: page }) => {
          return <h1 className="home">{RichText.asText(page.page_title)}</h1>
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

        <div className="pagelink">
          {bio.map(({ node: n }) => {
            return (
              <Link to={linkResolver(n._meta)} className="bio__pagelink">
                {RichText.asText(n.title)}
              </Link>
            )
          })}
        </div>
      </section>
      <Projectshowcase
        data={projects}
        posts={posts}
        order={order}
        colors={colors}
      />
    </Layout>
  )
}
