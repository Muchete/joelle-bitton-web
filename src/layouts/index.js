import React from "react"
import PropTypes from "prop-types"
import Transition from "../components/transition"
// import PrismicToolbar from "../components/prismictoolbar"

import "./../style/main.scss"

const Layout = ({ children, location }) => {
  return (
    <>
      {/* <PrismicToolbar /> */}
      <main className="main">
        <Transition location={location}>{children}</Transition>
      </main>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
