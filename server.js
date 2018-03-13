const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')

app.use(express.static('./dist'))

app.get('*', function(req, res, next) {
  // hidden html suffix
  // Inspired https://github.com/kapouer/express-urlrewrite
  if (!/(assets|\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf|mp4|webm|ogg|mp3|wav|flac|aac|js|css|html)(\?.*)?$)/.test(req.path)) {
    req.url = req.originalUrl = req.url + '.html'
    var file = path.join(__dirname, './dist', req.url)
    if(fs.existsSync(file)) {
      res.setHeader("Content-Type", "text/html");
      let fileTpl = fs.readFileSync(file)
      res.send(fileTpl)
    } else {
      next()
    }
  }
  next()
});

app.listen(8090)
