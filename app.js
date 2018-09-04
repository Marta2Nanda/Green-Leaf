var express=require("express");
var bodyParser=require('body-parser');
var validator = require('express-validator');
var session = require('express-session');
var connection = require('./server/dbconnection');
var app = express();
var router = express.Router();

var path = __dirname + '/views/';
var authenticateController=require('./server/controllers/authenticate-controller');
var registerController=require('./server/controllers/register-controller');
var recommendationDisplayController=require('./server/controllers/recommendation-display-controller');
var recommendationController=require('./server/controllers/recommendation-controller');
var userDisplayController=require('./server/controllers/user-display-controller');
var userController=require('./server/controllers/user-controller');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static('public'));
app.use(validator());
app.use(session({
	  secret: 'keyboard cat',
	  resave: false,
	  saveUninitialized: true,
	  cookie: { maxAge: 60000 }
	}));

router.use(function (req,res,next) {
	  console.log("/" + req.method);
	  next();
	});

router.get('/', function (req, res) {  
	res.render( path + "index.ejs" );
});

router.get('/accessDenied', function (req, res) {  
	res.render( path + "accessDenied.ejs" );
});
 
router.get('/user', function (req, res) {  
	res.render( path + "userHomepage.ejs" ); 
});

router.get('/about', function (req, res) {  
	res.render( path + "about.ejs" ); 
});

router.get('/recommendations', function (req, res) {  
	res.render( path + "recommendations.ejs" ); 
});

router.get('/myRecommendation', function (req, res) {  
	res.render( path + "myRecommendation.ejs" ); 
});

router.get('/top10', function (req, res) {  
	res.render( path + "top10.ejs" ); 
});

router.get('/logout', function (req, res) {  
	res.render( path + "logout.ejs" ); 
});

router.get('/admin', function (req, res) {  
	res.render( path + "adminHomepage.ejs" ); 
});

router.get('/recommendationsOverview', function (req, res) {  
	res.render( path + "recommendationsOverview.ejs" ); 
});

router.get('/users', function (req, res) {  
	res.render( path + "users.ejs" ); 
});

router.get('/main', function (req, res) {  
	res.render( path + "main.ejs" ); 
});

app.use("/",router);

/* route to handle RESTful requests */
app.post('/api/register', registerController.register);
app.post('/api/login', authenticateController.login);
app.get('/api/recommendations/display', recommendationDisplayController.displayAll);
app.get('/api/recommendations/display/:user_email', recommendationDisplayController.displayPerUser);
app.get('/api/recommendations/displayTop10', recommendationDisplayController.displayTop10);
app.post('/api/recommendations/add', recommendationController.add);
app.put('/api/recommendations/update/:recommendation_id', recommendationController.update);
app.delete('/api/recommendations/delete/:recommendation_id', recommendationController.delete);
app.put('/api/recommendations/updateRating/:recommendation_id', recommendationController.updateRating);
app.get('/api/users/display', userDisplayController.displayAll);
app.post('/api/users/add', userController.addAdmin);
app.delete('/api/users/delete/:user_email', userController.deleteUser);
app.post('/controllers/register-controller', registerController.beforeRegister);
app.post('/controllers/authenticate-controller', authenticateController.beforeLogin);

if(!module.parent){
app.listen(8080);
} else {
app.listen(3000);
}
