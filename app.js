const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const config = require('./config');

const app = express();

// jade stuff
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
	res.render('index', {title: 'Welcome'});
});

app.get('/about', function(req, res){
	res.render('about');
});

app.get('/contact', function(req, res){
	res.render('contact');
});

app.post('/contact/send', function(req, res){
	const transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: { user: config.email, pass: config.pass },
	});
	const mailOptions = {
		from: 'Your cool site <ely0013@gmail.com>',
		to: 'ely0013@gmail.com',
		subject: 'Web submit',
		text: 'you have submission with the following deets... name: '+ req.body.name+ ' Email: '+req.body.email+ ' Message: '+ req.body.text,
		html: '<p> you have submission with the following deets...<p>'
	}
	transporter.sendMail(mailOptions, (err, info)=> {
		if(err) {
			console.log(err);
			res.redirect('/')
		} else {
			console.log('Message sent' + info.response);
			res.redirect('/');
		}
	});
});
app.listen(3000);
console.log('Server is running on port 3000...');
