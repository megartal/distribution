var AM = require('./../server/modules/account-manager');
var ObjectId = require('mongodb').ObjectID;


module.exports = function (app) {


    // main login page //

    app.get('/', function (req, res, next) {
        // check if the user's credentials are saved in a cookie //
        if (req.session.email) {
            // attempt automatic login //
            res.redirect('/home');
        } else {
            res.render('login', { title: 'Hello - Please Login To Your Account' });
        }
    });


    app.post('/', function (req, res) {
        AM.manualLogin(req.body['email'], req.body['pass'], function (e, o) {
            if (!o) {
                res.status(400).send(e);
            } else {
                req.session.email = o;
                if (req.body['remember-me'] == 'true') {
                    res.cookie('email', o.user, { maxAge: 900000 });
                    res.cookie('pass', o.pass, { maxAge: 900000 });
                }
                res.status(200).send(o);
            }
        });
    });


    // creating new accounts //

    app.get('/register', function (req, res) {
        res.render('register', { title: 'register', one: 'home', two: 'about_us', three: 'contact _us', four: 'sign_out' });
    });

    app.post('/register', function (req, res) {
        AM.addNewAccount({
            name: req.body['username'],
            email: req.body['email'],
            phone: req.body['phone'],
            addr: req.body['address'],
            pass: req.body['pass']
        }, function (e) {
            if (e) {
                res.status(400).send(e);
            } else {
                res.status(200).send('ok');
            }
        });
    });

    app.get('/signout', function (req, res) {
        if (req.session.email) {
            req.session.email = undefined;
            res.redirect('/')
        }
    });

    // main page of each account //
    app.get('/home', function (req, res) {
        if (req.session.email) {
            res.render('home', { title: 'home' });
        } else {
            res.redirect('/');
        }
    });

    app.get('/items', function (req, res, next) {
        if (req.session.email) {
            AM.getItems(getClientFilter(req.query, req.session.email.email), function (err, items) {
                res.json(items);
            });
        } else {
            res.redirect('/');
        }
    });

    // app.post('/items', function (req, res, next) {
    //     if (req.session.email) {
    //         AM.insertItem(prepareItem(req, req.session.email.email), function (err, item) {
    //             res.json(item);
    //         });
    //     } else {
    //         res.redirect('/');
    //     }
    // });

    app.post('/items', function (req, res, next) {
        if (req.session.email) {
            var item = prepareItem(req, req.session.email.email);
            AM.updateItems(item, function (result) {
                res.json(result);
            });
        } else {
            res.redirect('/');
        }
    });

    app.delete('/items', function (req, res, next) {
        if (req.session.email.email) {
            AM.deleteItem(prepareItem(req, req.session.email.email), function (err, item) {
                res.json(item);
            });
        } else {
            res.redirect('/');
        }
    });


    // methods
    var getClientFilter = function (query, email) {
        if (query._id) {
            return result = {
                _id: new ObjectId(query._id)
            }
        } else {
            return result = {
                // Type: new RegExp(query.Type, "i"),
                name: new RegExp(query.name, "i"),
                type: new RegExp(query.type, "i"),
                descript: new RegExp(query.descrip, "i"),
                userID: email
            };
        }
    };

    var prepareItem = function (req, userID) {
        var result = req.body;
        result.userID = userID;
        return result;
    };

    // images
    app.get('/images', function (req, res, next) {
        var filter = {};
        if(req.query.url){
            filter.url = req.query.url;
        }
        filter.name = new RegExp(req.query.name, "i");
        if (req.session.email) {
            AM.getImages(filter, function (err, images) {
                res.json(images);
            });
        } else {
            res.redirect('/');
        }
    });
}