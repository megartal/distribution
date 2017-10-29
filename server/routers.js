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
        AM.manualLogin(req.body['email'], req.body['pass'], function(e, o){
            if (!o){
                res.status(400).send(e);
            }	else{
                req.session.email = o;
                if (req.body['remember-me'] == 'true'){
                    res.cookie('email', o.user, { maxAge: 900000 });
                    res.cookie('pass', o.pass, { maxAge: 900000 });
                }
                res.status(200).send(o);
            }
        });
    });


    // creating new accounts //
        
    app.get('/register', function(req, res) {
        res.render('register', {  title: 'register', one:'home', two :'about_us', three :'contact _us', four:'sign_out'});
    });

    app.post('/register', function(req, res){
        AM.addNewAccount({
            name 	: req.body['username'],
            email 	: req.body['email'],
            phone   : req.body['phone'],
            addr    : req.body['address'],
            pass	: req.body['pass']
        }, function(e){
            if (e){
                res.status(400).send(e);
            }	else{
                res.status(200).send('ok');
            }
        });
    });

    // main page of each account //
    app.get('/home', function(req, res) {
        res.render('home', {title : 'home'});
    });
    
    app.get('/clients', function(req, res, next) {
        AM.getItems(req.query, function(err, items) {
            res.json(items);
        });
    });
    
    app.post('/clients', function(req, res, next) {
        AM.insertItem(prepareItem(req.body), function(err, item) {
            res.json(item);
        });
    });
    
    app.put('/clients', function(req, res, next) {
        var item = prepareItem(req.body);
    
        db.update({ _id: item._id }, item, {}, function(err) {
            res.json(item);
        });
    });
    
    app.delete('/clients', function(req, res, next) {
        var item = prepareItem(req.body);
    
        db.remove({ _id: item._id }, {}, function(err) {
            res.json(item);
        });
    });


    // methods
    var getClientFilter = function(query) {
        var result = {
            // Name: new RegExp(query.Name, "i"),
            Name : new RegExp(query.Name, "i")
            // Type: new RegExp(query.Type, "i")
        };
    
        if(query.Available) {
            result.Available = query.Available === 'true' ? true : false;
        }
    
        if(query.Type && query.Type !== '0') {
            result.Type = parseInt(query.Type, 10);
        }
    
        return result;
    };
    
    var prepareItem = function(source) {
        var result = source;
        result.Married = source.Married === 'true' ? true : false;
        result.Country = parseInt(source.Country, 10);
        return result;
    };
}