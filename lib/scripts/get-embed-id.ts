export default function getEmbedId(youtubeid: string): string {
  let id = youtubeid?.split('/')?.pop() // ex. Cn0OKuG2mzM

  return 'https://www.youtube.com/embed/' + id
}
