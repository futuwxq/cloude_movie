// export get() {
  
// }

export class Movies {
  constructor(moviedetail,  moviecover){
      this.cover = moviecover.url
      this.title = moviecover.title
      this.sort = moviedetail.sort
  }
}