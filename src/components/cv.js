import React, { Component } from "react"
import { RichText } from "prismic-reactjs"
import { linkResolver } from "../utils/linkResolver"

let categoryList = []
let entries

class CV extends Component {
  constructor(props) {
    super(props)

    this.props.data.forEach(entry => {
      if (categoryList.indexOf(entry.category) === -1)
        categoryList.push(entry.category)
    })

    if (categoryList) {
      this.state = { currentFilter: categoryList[0] }
    }
  }

  setFilter(newFilter) {
    this.setState({ currentFilter: newFilter })
  }

  activeHandler(tag) {
    let classnames = "filter-button"
    if (this.state.currentFilter === tag) classnames += " active"
    return classnames
  }

  render() {
    if (this.state.currentFilter) {
      entries = this.props.data.filter(entry => {
        return entry.category.indexOf(this.state.currentFilter) !== -1
      })
    } else {
      entries = this.props.data
    }

    return (
      <section className="cv">
        <h3 className="cv-title">{this.props.title}</h3>
        <div className="cv-categories filter-set">
          {categoryList.map(category => {
            return (
              <button
                className={this.activeHandler(category)}
                onClick={() => this.setFilter(category)}
              >
                {category}
              </button>
            )
          })}
        </div>
        <div className="cv-content">
          <h4 className="cv-category-title">{this.state.currentFilter}</h4>
          {entries.map(entry => {
            return (
              <div className="cv-entry">
                <RichText
                  render={entry.year}
                  linkResolver={linkResolver}
                  className="leftColumn"
                  Component="span"
                />
                <RichText
                  render={entry.text}
                  linkResolver={linkResolver}
                  className="rightColumn"
                  Component="span"
                />
              </div>
            )
          })}
        </div>
      </section>
    )
  }
}

export default CV
