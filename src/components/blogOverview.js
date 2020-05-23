import React, { Component } from "react"
import { Link } from "gatsby"
import { RichText, Date as PDate } from "prismic-reactjs"

import { linkResolver } from "../utils/linkResolver"

const textLimit = 300 // only even numbers!!
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
  // Function to retrieve a small preview of the post's text
  firstParagraph(post) {
    // Find the first text slice of post's body
    let firstTextSlice = post.body.find(slice => slice.type === "text")
    if (firstTextSlice != null) {
      let text = RichText.asText(firstTextSlice.primary.text)
      let limitedText = text.substring(0, textLimit)
      let limitedTextShort = text.substring(0, textLimit / 2)

      if (text.length > textLimit / 2) {
        return (
          <>
            <p className="post__excerpt__short">
              {limitedTextShort.substring(
                0,
                limitedTextShort.lastIndexOf(" ")
              ) + "..."}
            </p>
            <p className="post__excerpt__long">
              {limitedText.substring(0, limitedText.lastIndexOf(" ")) + "..."}
            </p>
          </>
        )
      } else {
        return <p>{text}</p>
      }
    } else {
      return null
    }
  }

  formatDate(str) {
    const d = new Date(PDate(str))
    return d.getDate() + ". " + months[d.getMonth()] + ", " + d.getFullYear()
  }

  render() {
    return (
      <div className="posts">
        {this.props.posts.map(({ node: post }) => {
          return (
            <div className="post">
              <Link to={linkResolver(post._meta)}>
                <div className="post__wrap">
                  <h2 className="post__title">
                    {RichText.asText(post.blog_post_title)}
                  </h2>
                  <div className="post__excerpt">
                    <span className="post__date">
                      <time>
                        {this.formatDate(post._meta.firstPublicationDate)}
                      </time>
                    </span>
                    {this.firstParagraph(post)}
                  </div>
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    )
  }
}

export default BlogOverview
