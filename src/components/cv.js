import React, { Component } from "react"
import { RichText } from "prismic-reactjs"
import { linkResolver } from "../utils/linkResolver"
import ArrowCV from "../components/arrowCV"
import { CSSTransition, TransitionGroup } from "react-transition-group"
import { animationSpeedExit, timeout } from "../components/transitionsettings"

let categoryList = []
let entries

class CV extends Component {
  constructor(props) {
    super(props)

    this.props.cvData.forEach(entry => {
      if (categoryList.indexOf(entry.category) === -1)
        categoryList.push(entry.category)
    })

    if (categoryList) {
      this.state = { currentFilter: categoryList[0] }
    }
  }

  scrollToBottom = () => {
    this.cvDiv.scrollIntoView({ behavior: "smooth" })
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
      entries = this.props.cvData.filter(entry => {
        return entry.category.indexOf(this.state.currentFilter) !== -1
      })
    }
    // else {
    //   entries = this.props.cvData
    // }

    return (
      <section className="cv" key="cv-section">
        <h2 className="cv__title" key="cv-title">
          {this.props.title}
        </h2>
        <div className="cv__categories" key="cv-allCat">
          {categoryList.map((category, i) => {
            return (
              <button
                className={this.activeHandler(category)}
                onClick={() => {
                  this.setFilter(category)
                  setTimeout(this.scrollToBottom, animationSpeedExit)
                }}
                key={"cv-button" + i}
              >
                {category}
                <ArrowCV key={"cv-arrow" + i} />
              </button>
            )
          })}
        </div>
        <div className="cv__content" key="cv-content">
          <TransitionGroup className="animation-group">
            <CSSTransition
              in={true}
              key={this.state.currentFilter + "cssTrans"}
              // appear={true}
              timeout={timeout}
              classNames="fade-animation"
            >
              <div>
                <h2
                  className="cv__content__category"
                  // key={this.state.currentFilter + "title"}
                >
                  {this.state.currentFilter}
                </h2>
                {entries.map((entry, i) => {
                  return (
                    <div className="cv__content__entry" key={"entry" + i}>
                      <RichText
                        render={entry.year}
                        linkResolver={linkResolver}
                        className="--left"
                        Component="span"
                        key={"cdleft" + i}
                      />
                      <RichText
                        render={entry.text}
                        linkResolver={linkResolver}
                        className="--right"
                        Component="span"
                        key={"cdright" + i}
                      />
                    </div>
                  )
                })}
              </div>
            </CSSTransition>
          </TransitionGroup>
        </div>
        <div
          //div used for bottom scroll animation
          style={{ float: "left", clear: "both" }}
          ref={el => {
            this.cvDiv = el
          }}
        ></div>
      </section>
    )
  }
}

export default CV
