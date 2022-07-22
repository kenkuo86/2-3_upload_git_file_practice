const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')

// 這邊在 require 的路徑上要特別留意：如果我們使用 ./ 開頭，代表要找一個與現在檔案同層的檔案；而如果沒有特別指定，則會去 node_modules 當中尋找
const movieList = require('./movies.json')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine','handlebars')

// app.use 可以指定在 get 任何路由之前，先回傳某個 static file 回去
app.use( express.static('public') )

app.get('/',(req,res) => {
  res.render('index', { movies: movieList.results })
})

app.get('/movies/:movie_id', (req,res) => {
  const id = req.params.movie_id
  const movie = movieList.results.find(movie => movie.id.toString() === id)
  console.log(movie)
  res.render('show', {movie: movie} )
})

app.get('/search', (req,res) => {

  const keyword = req.query.keyword
  const movies = movieList.results.filter( (movie) => {
    return movie.title.toLowerCase().includes(keyword.toLowerCase())
  })
  
  res.render('index', { movies: movies, keyword: keyword})
})

app.listen(port, () => {
  console.log(`node.js listening on http://localhost:${port}`)
})