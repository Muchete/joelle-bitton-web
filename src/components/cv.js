import React, { Component } from "react"
import { RichText } from "prismic-reactjs"
import { linkResolver } from "../utils/linkResolver"
import ArrowCV from "../components/arrowCV"

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
    let classnames = "filter__item"
    if (this.state.currentFilter === tag) classnames += " filter__item--active"
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
        <h2 className="cv__title">{this.props.title}</h2>
        <div className="cv__categories">
          {categoryList.map(category => {
            return (
              <button
                className={this.activeHandler(category)}
                onClick={() => this.setFilter(category)}
              >
                {category}
                <ArrowCV />
              </button>
            )
          })}
        </div>
        <div className="cv__content">
          <h2 className="cv__content__category">{this.state.currentFilter}</h2>
          {entries.map(entry => {
            return (
              <div className="cv__content__entry">
                <RichText
                  render={entry.year}
                  linkResolver={linkResolver}
                  className="--left"
                  Component="span"
                />
                <RichText
                  render={entry.text}
                  linkResolver={linkResolver}
                  className="--right"
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
