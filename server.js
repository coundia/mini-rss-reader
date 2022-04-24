const express = require('express');
const path = require('path');
const app = express();
//autoriser le proxy  de heroku
app.set('trust proxy', 1);
// limiter le nb de requete
const RateLimit = require('express-rate-limit');
const limiter = new RateLimit({
  windowMs: 60*1000, // 1 minute
  max: 10
});
//Pour que pour heroku marche
app.use(limiter);

app.use(express.static(__dirname + '/dist/mini-rss-reader'));
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/mini-rss-reader/index.html'));
});
app.listen(process.env.PORT || 8080);
