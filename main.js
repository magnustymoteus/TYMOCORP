const express = require('express');
const open = require('open');
const fetch = require('cross-fetch');
const session = require('express-session');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const app = express();
const jsonParser = bodyParser.json();
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('./views'));
app.use(favicon(__dirname + '/views/images/favicon.ico'));
app.use(session({
    secret: "tymocorp-secret-key",
    resave: true,
    saveUninitialized: false,
    cookie: {
        expires: 1.8e6
    },
    authorized: 0
}));
open('http://localhost:3000/');
app.get('/AUTH', async(req, res) => {
    if(req.session.authorized) res.redirect('/HOME');
    else res.render('authorization.ejs');
});
app.get('/AUTH/SUBMIT', async(req, res) => {
    if(req.session.authorized) {
        res.redirect('/HOME');
    }
    else {
        res.redirect('/AUTH');
    }
});
app.post('/AUTH/SUBMIT', jsonParser, async(req,res) => {
    if(req.body.key.length) {
        req.session.authorized=1;
        res.redirect('/HOME');
    }
});
app.get("/HOME", async(req,res) => {
    if(req.session.authorized) {
        if(!req.session.citizens) {
            fetch("https://my.api.mockaroo.com/tymocorp_citizens2.json?key=016bd6f0")
            .then((res) => res.json())
            .then((data) => {
                req.session.citizens = data;
                res.render('home.ejs', {citizens: req.session.citizens, page: (req.query.page>0&&req.query.page*20<=citizens.length)?req.query.page:1});
            });
        }
        else {
            res.render('home.ejs', {citizens: req.session.citizens, page: (req.query.page>0&&req.query.page*20<=req.session.citizens.length)?req.query.page:1});
        }
    }
    else {
        res.redirect('/AUTH');}
});
app.get("/DETAIL", async(req, res) => {
    if(req.session.authorized) {
        if(req.session.citizens) {
            res.render('detail.ejs', {citizen: req.session.citizens[req.query.id]});
        }
        else res.redirect('/AUTH');
    }
});
app.get("/", async(req, res) => {
    res.redirect("/AUTH");
});
app.listen(3000, () => console.log('TYMOCORP running on port 3000...'));