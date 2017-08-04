const express = require('express');
const port = process.env.PORT || 3000;

var app = express();
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('index.html');
});

app.listen(port, () => {
    console.log("Server started on port: " + port);
});