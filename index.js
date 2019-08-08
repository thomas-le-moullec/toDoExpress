const express = require('express')
const app = express();
const bodyParser = require('body-parser');
var session = require('cookie-session');
var cookieParser = require('cookie-parser');

app.use(bodyParser.json());

var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(cookieParser('notsosecretkey'));
app.use(session({secret: 'notsosecretkey123'}));
app.use(express.static(__dirname + '/public')); 

app.get('/', (req, res) => {
    if (!req.session.actionsToDo) {
        res.render('home.ejs');
    }
    else {
        res.render('home.ejs', {toDo: req.session.actionsToDo})
    }
});

app.post('/submit-action', urlencodedParser, (req, res) => {
    const actionToDo = req.body.action
    if (!req.session.actionsToDo) {
        req.session.actionsToDo = new Array(actionToDo);
    }
    else {
        req.session.actionsToDo.push(actionToDo);
    }
    res.render('home.ejs', {toDo: req.session.actionsToDo})
    res.end()
});

app.get('/logout', (req,res) => {
    req.session = null;
    console.log("Cookies cleaned!");
    res.redirect('/');
});

app.listen(8000, () => {
  console.log('To Do List App listening on port 8000!')
});