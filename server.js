const express = require('express')
const app = express()

app.use(express.static('./dist'))

app.get('*', function(req, res, next) {
  // hidden html suffix
  // Inspired https://github.com/kapouer/express-urlrewrite
  if(!/(assets|\.(
     png|jpe?g|gif|svg
    |woff2?|eot|ttf|otf
    |mp4|webm|ogg|mp3|wav|flac|aac
    |js|css|html)(\?.*)?$)/.test(req.path)) {
      req.url = req.originalUrl = req.url + '.html';
  }
  next();
});

app.listen(8090)
