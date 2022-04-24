const express = require('express');
const path = require('path');
const app = express();
//autoriser le proxy  de heroku

app.set('trust proxy', 1);
// limiter le nb de requete
const rateLimit = require('express-rate-limit')

//  creer un role
const apiRequestLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 1000,//mille req par minute
  handler: function (req, res, /*next*/) {
    return res.status(429).json({
      error: 'Trop de requetes ,Attend 1 minute et ressayer'
    })
  }
})
//Pour que pour heroku marche
app.use(apiRequestLimiter)

app.use(express.static(__dirname + '/dist/mini-rss-reader'));
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/mini-rss-reader/index.html'));
});
app.listen(process.env.PORT || 8080);
