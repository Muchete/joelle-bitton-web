export const animationSpeedExit = 250 //time of animation speed (old element out)
export const animationSpeedEnter = 250 //time of animation speed (new element in)
export const timeout = animationSpeedExit + animationSpeedEnter

export const transitionStyles = {
  entering: {
    position: `absolute`,
    opacity: 0,
  },
  entered: {
    transition: `opacity ${animationSpeedExit}ms ease-in-out`,
    opacity: 1,
  },
  exiting: {
    transition: `opacity ${animationSpeedEnter}ms ease-in-out`,
    opacity: 0,
  },
}

export default {
  animationSpeedEnter,
  animationSpeedExit,
  timeout,
  transitionStyles,
}
