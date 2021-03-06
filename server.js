require('babel-register')({
    presets: ['react']
});

var express = require('express');
var app = express();

app.use(express.static('public'));
app.use(require('./routes/index.jsx'));

var PORT = process.env.PORT || 8081;
app.listen(PORT, function() {
    console.log('http://localhost:' + PORT);
});
