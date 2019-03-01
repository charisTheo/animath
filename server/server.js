const path = require('path');
const express = require('express');
const hbs = require('hbs');
const port = process.env.PORT || 3000;

var app = express();
hbs.registerPartials(path.join(__dirname, 'views/partials'))
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('index.hbs');
});

app.get('/sequences', (req, res) => {
    res.render('sequences.hbs');
});

app.get('/limits', (req, res) => {
    res.render('limits.hbs');
});


app.listen(port, () => {
    console.log("Server started on port: " + port);
});