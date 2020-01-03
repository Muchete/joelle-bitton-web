import React from "react"
import PropTypes from "prop-types"
// import { StaticQuery, graphql } from "gatsby"
// import { CSSTransition, TransitionGroup } from "react-transition-group"
// import { BrowserRouter as Router, Route } from "react-router-dom"
import Transition from "../components/transition"

import "./../style/main.scss"

const Layout = ({ children, location }) => {
  return (
    <Transition location={location}>
      <main className="main">{children}</main>
    </Transition>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
