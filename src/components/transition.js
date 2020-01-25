import React from "react"
import { TransitionGroup, CSSTransition } from "react-transition-group"
import { timeout } from "../components/transitionsettings"

class Transition extends React.PureComponent {
  render() {
    const { children, location } = this.props

    return (
      <TransitionGroup className="animation-group">
        <CSSTransition
          key={location.pathname}
          timeout={timeout}
          classNames="fade-animation"
        >
          {children}
        </CSSTransition>
      </TransitionGroup>
    )
  }
}

export default Transition
