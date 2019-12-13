import React, { Component } from "react"
import { RichText } from "prismic-reactjs"

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

  setFilter(newFilter) {}

  render() {
    if (this.state.currentFilter) {
      entries = this.props.data.filter(entry => {
        return entry.category.indexOf(this.state.currentFilter) !== -1
      })
    } else {
      entries = this.props.data
    }

    return (
      <div className="cv">
        <div className="categories">
          {categoryList.map(category => {
            return (
              <button
                onClick={() => this.setState({ currentFilter: category })}
              >
                {category}
              </button>
            )
          })}
        </div>
        <div className="cv-entries">
          <h4 className="cv-category-title">{this.state.currentFilter}</h4>
          {entries.map(entry => {
            return (
              <div className="cv-entry">
                <div>
                  <p className="leftColumn">{RichText.asText(entry.year)}</p>
                  <p className="rightColumn">{RichText.asText(entry.text)}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default CV
