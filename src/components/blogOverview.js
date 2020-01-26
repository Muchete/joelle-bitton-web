import React, { Component } from "react"
import { Link } from "gatsby"
import { RichText } from "prismic-reactjs"

import { linkResolver } from "../utils/linkResolver"

const textLimit = 300
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

class BlogOverview extends Component {
  constructor(props) {
    super(props)
  }

  // Function to retrieve a small preview of the post's text
  firstParagraph(post) {
    // Find the first text slice of post's body
    let firstTextSlice = post.body.find(slice => slice.type === "text")
    if (firstTextSlice != null) {
      let text = RichText.asText(firstTextSlice.primary.text)
      let limitedText = text.substring(0, textLimit)

      if (text.length > textLimit) {
        return (
          <p className="post__excerpt">
            {limitedText.substring(0, limitedText.lastIndexOf(" ")) + "..."}
          </p>
        )
      } else {
        return <p className="post__excerpt">{text}</p>
      }
    } else {
      return null
    }
  }

  formatDate(str) {
    let d = new Date(str)
    return d.getDate() + ". " + months[d.getMonth()] + ", " + d.getFullYear()
  }

  render() {
    return (
      <div className="posts">
        {this.props.posts.map(({ node: post }) => {
          return (
            <div className="post">
              <Link to={linkResolver(post._meta)}>
                <h2>{RichText.asText(post.blog_post_title)}</h2>
                <p className="post__date">
                  <time>
                    {this.formatDate(post._meta.firstPublicationDate)}
                  </time>
                </p>
                {this.firstParagraph(post)}
              </Link>
            </div>
          )
        })}
      </div>
    )
  }
}

export default BlogOverview
