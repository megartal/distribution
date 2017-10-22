var AM = require('./../server/modules/account-manager');


module.exports = function(app){


    // main login page //

    app.get('/', function(req, res, next){
    	// check if the user's credentials are saved in a cookie //
		if (req.cookies.user == undefined || req.cookies.pass == undefined){
			res.render('login', { title: 'Hello - Please Login To Your Account' });
		}	else{
	    // attempt automatic login //
			AM.autoLogin(req.cookies.user, req.cookies.pass, function(o){
				if (o != null){
				    req.session.user = o;
					res.redirect('/home');
				}	else{
					res.render('login', { title: 'Hello - Please Login To Your Account' });
				}
			});
		}
    });


    app.post('/', function(req, res){
        AM.manualLogin(req.body['user'], req.body['pass'], function(e, o){
            if (!o){
                res.status(400).send(e);
            }	else{
                req.session.user = o;
                if (req.body['remember-me'] == 'true'){
                    res.cookie('user', o.user, { maxAge: 900000 });
                    res.cookie('pass', o.pass, { maxAge: 900000 });
                }
                res.status(200).send(o);
            }
        });
    });


    // creating new accounts //
        
    app.get('/register', function(req, res) {
        res.render('register', {  title: 'register' });
    });

    app.post('/register', function(req, res){
        AM.addNewAccount({
            name 	: req.body['name'],
            email 	: req.body['email'],
            user 	: req.body['user'],
            phone   : req.body['phone'],
            pass	: req.body['pass'],
            addr    : req.body['address']
        }, function(e){
            if (e){
                res.status(400).send(e);
            }	else{
                res.status(200).send('ok');
            }
        });
    });

}