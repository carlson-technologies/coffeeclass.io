// a function that takes a string in the from https://youtu.be/Cn0OKuG2mzM and returns the form https://www.youtube.com/embed/Cn0OKuG2mzM

export function getEmbedId(youtubeid) {
  let id = youtubeid?.split("/")?.pop() // ex. Cn0OKuG2mzM
  return "https://www.youtube.com/embed/" + id
}