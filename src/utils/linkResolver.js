// -- The Link Resolver
// This function will be used to generate links to Prismic documents
// As your project grows, you should update this function according to your routes

exports.linkResolver = function linkResolver(doc) {
  switch (doc.type) {
    case "bio":
      return "/bio"
    case "project":
      return "/projects/" + doc.uid
    // Homepage route fallback
    default:
      return "/"
  }
}
