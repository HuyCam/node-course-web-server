const express = require('express');
const fs = require('fs');
const hbs = require('hbs');

const app = express();
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');

// set configuration for app
app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.path}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => { 
        if (err) {
            console.log('Unable to log on server.log.txt');
        }
    })
    next();
});

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home',
        welcomeMessage: 'Welcome to my town',
        author(name) {
          return name;
      }
    })
  });

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About page',
        author(name) {
            return name;
        }
    });
})

app.get('/bad', (req, res) => {
    res.send({
        status: 'fail',
        message: 'Unable to get data'
    });
})

app.listen(port ,(error, good) => {
    if (error) {
        console.log(error);
    } else {
        console.log('App is running at the port ' + port);
    }
});
