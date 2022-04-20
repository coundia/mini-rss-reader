const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(__dirname + '/dist/mini-rss-reader'));
app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname+'/dist/mini-rss-reader/index.html'));
});
// app.listen(process.env.PORT || 8080);

const server = app.listen(process.env.PORT || 8080, () => {
  const port = server.address().port;
  console.log(`Express is working on port ${port}`);
});
