import { Component } from "react"

class PrismicToolbar extends Component {
  componentDidMount() {
    window.prismic = {
      endpoint: "https://joelle-bitton.cdn.prismic.io/api/v2",
    }
    const script = document.createElement("script")
    script.src = "https://static.cdn.prismic.io/prismic.min.js?new=true"
    script.type = "text/javascript"

    document.head.appendChild(script)
  }

  render() {
    return null
  }
}

export default PrismicToolbar
