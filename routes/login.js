var express = require('express');
var router = express.Router();

/* GET login page */
router.get('/', function(req, res, next){
    	// check if the user's credentials are saved in a cookie //
		if (req.cookies.user == undefined || req.cookies.pass == undefined){
			res.render('login', { title: 'Hello - Please Login To Your Account' });
		}	else{
	// // attempt automatic login //
	// 		AM.autoLogin(req.cookies.user, req.cookies.pass, function(o){
	// 			if (o != null){
	// 			    req.session.user = o;
	// 				res.redirect('/home');
	// 			}	else{
	// 				res.render('login', { title: 'Hello - Please Login To Your Account' });
	// 			}
	// 		});
		}
});

module.exports = router;
