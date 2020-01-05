import React from "react"
import PropTypes from "prop-types"
import Transition from "../components/transition"
// import PrismicToolbar from "../components/prismictoolbar"

import "./../style/main.scss"

const Layout = ({ children, location }) => {
  return (
    <>
      {/* <PrismicToolbar /> */}
      <Transition location={location}>
        <div className="page-transition">
          <main className="main">{children}</main>
        </div>
      </Transition>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
