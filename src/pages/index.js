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
      p0: allProjects(sortBy: meta_firstPublicationDate_DESC) {
        totalCount
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
                fluid(
                  sizes: "(max-width: 376px) 100vw, (max-width: 600px) 50vw, (max-width: 1100px) 67vw, (max-width: 1400px) 67vw, (min-width: 1400px) 904px"
                ) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            cover_color
            project_title
          }
        }
      }
      p1: allProjects(
        sortBy: meta_firstPublicationDate_DESC
        after: "YXJyYXljb25uZWN0aW9uOjE5"
      ) {
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
                fluid(
                  sizes: "(max-width: 376px) 100vw, (max-width: 600px) 50vw, (max-width: 1100px) 67vw, (max-width: 1400px) 67vw, (min-width: 1400px) 904px"
                ) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            cover_color
            project_title
          }
        }
      }
      p2: allProjects(
        sortBy: meta_firstPublicationDate_DESC
        after: "YXJyYXljb25uZWN0aW9uOjM5"
      ) {
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
                fluid(
                  sizes: "(max-width: 376px) 100vw, (max-width: 600px) 50vw, (max-width: 1100px) 67vw, (max-width: 1400px) 67vw, (min-width: 1400px) 904px"
                ) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            cover_color
            project_title
          }
        }
      }
      p3: allProjects(
        sortBy: meta_firstPublicationDate_DESC
        after: "YXJyYXljb25uZWN0aW9uOjU5"
      ) {
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
                fluid(
                  sizes: "(max-width: 376px) 100vw, (max-width: 600px) 50vw, (max-width: 1100px) 67vw, (max-width: 1400px) 67vw, (min-width: 1400px) 904px"
                ) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            cover_color
            project_title
          }
        }
      }
      p4: allProjects(
        sortBy: meta_firstPublicationDate_DESC
        after: "YXJyYXljb25uZWN0aW9uOjc5"
      ) {
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
                fluid(
                  sizes: "(max-width: 376px) 100vw, (max-width: 600px) 50vw, (max-width: 1100px) 67vw, (max-width: 1400px) 67vw, (min-width: 1400px) 904px"
                ) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            cover_color
            project_title
          }
        }
      }
      b0: allBlogposts(sortBy: meta_firstPublicationDate_DESC) {
        totalCount
        edges {
          node {
            blog_post_title
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
                  imageSharp {
                    id
                  }
                  image
                }
              }
            }
            _meta {
              firstPublicationDate
              uid
              id
              type
            }
          }
        }
      }
      b1: allBlogposts(
        sortBy: meta_firstPublicationDate_DESC
        after: "YXJyYXljb25uZWN0aW9uOjE5"
      ) {
        totalCount
        edges {
          node {
            blog_post_title
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
                  imageSharp {
                    id
                  }
                  image
                }
              }
            }
            _meta {
              firstPublicationDate
              uid
              id
              type
            }
          }
        }
      }
      b2: allBlogposts(
        sortBy: meta_firstPublicationDate_DESC
        after: "YXJyYXljb25uZWN0aW9uOjM5"
      ) {
        totalCount
        edges {
          node {
            blog_post_title
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
                  imageSharp {
                    id
                  }
                  image
                }
              }
            }
            _meta {
              firstPublicationDate
              uid
              id
              type
            }
          }
        }
      }
      b3: allBlogposts(
        sortBy: meta_firstPublicationDate_DESC
        after: "YXJyYXljb25uZWN0aW9uOjU5"
      ) {
        totalCount
        edges {
          node {
            blog_post_title
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
                  imageSharp {
                    id
                  }
                  image
                }
              }
            }
            _meta {
              firstPublicationDate
              uid
              id
              type
            }
          }
        }
      }
      b4: allBlogposts(
        sortBy: meta_firstPublicationDate_DESC
        after: "YXJyYXljb25uZWN0aW9uOjc5"
      ) {
        totalCount
        edges {
          node {
            blog_post_title
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
                  imageSharp {
                    id
                  }
                  image
                }
              }
            }
            _meta {
              firstPublicationDate
              uid
              id
              type
            }
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
  let collectEntries = (data, letter, amount) => {
    let proj = []
    let totalCount = data[letter + "0"].totalCount

    for (let i = 0; i < amount; i++) {
      const key = letter + i
      proj.push(...data[key].edges)

      if (proj.length === totalCount) break
    }

    return proj
  }

  const home = data.prismic.allHomes.edges
  const bio = data.prismic.allBios.edges
  // const projects = data.prismic.allProjects.edges
  const projects = collectEntries(data.prismic, "p", 5)
  const posts = collectEntries(data.prismic, "b", 5)
  const colors = data.site.siteMetadata.colors

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
      <Projectshowcase data={projects} posts={posts} colors={colors} />
    </Layout>
  )
}
