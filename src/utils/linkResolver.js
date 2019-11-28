// -- The Link Resolver
// This function will be used to generate links to Prismic documents
// As your project grows, you should update this function according to your routes

exports.linkResolver = function linkResolver(doc) {
  // Route for blog posts
  if (doc.type === "project") {
    return "/projects/" + doc.uid
  } else if (doc.type === "bio") {
    return "/bio"
  }

  // Homepage route fallback
  return "/"
}
