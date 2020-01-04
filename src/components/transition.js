import React from "react"
import {
  TransitionGroup,
  Transition as ReactTransition,
  CSSTransition,
} from "react-transition-group"
import { timeout } from "../components/transitionsettings"

// const timeout = 500
const getTransitionStyles = {
  entering: {
    position: `absolute`,
    opacity: 0,
  },
  entered: {
    transition: `opacity ${timeout}ms ease-in-out`,
    opacity: 1,
  },
  exiting: {
    transition: `opacity ${timeout}ms ease-in-out`,
    opacity: 0,
  },
}

class Transition extends React.PureComponent {
  render() {
    const { children, location } = this.props

    return (
      <TransitionGroup className="animation-group page-transition">
        <CSSTransition
          key={location.pathname}
          timeout={timeout}
          classNames="fade-animation"
        >
          <div>{children}</div>
        </CSSTransition>
      </TransitionGroup>
    )
  }
}

export default Transition
