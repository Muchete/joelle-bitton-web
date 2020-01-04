import React from "react"
import { graphql } from "gatsby"
import SEO from "../components/seo"

export const query = graphql`
  query siteNotFound {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`

const NotFoundPage = ({ data }) => (
  <>
    <SEO title="404: Not found" site={data.site} />
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn't exist... the sadness.</p>
  </>
)

export default NotFoundPage
