var app = require('../server');
var db = app.get('db');

module.exports = {
    getProducts: function(req, res, next) {
        db.read_products(function(err, products) {
            res.json(products);
        });
    },

    getProduct: function(req, res, next) {
        var id = req.params.id;
        db.read_product(id, function(err, product) {
            res.json(product);
        });
    },

    getCart: function(req, res, next) {
        if (!req.session.cart) {
            req.session.cart = [];
        }
        res.json(req.session.cart);
    },

    addToCart: function(req, res, next) {
        if (!req.session.cart) {
            req.session.cart = [];
        }
        db.read_product(req.body.product_id, function(err, product) {
            req.session.cart.push(product[0]);
            res.json(req.session.cart);
        });
    },

    removeFromCart: function(req, res, next) {
        if (!req.session.cart) {
            res.status(403).send('no cart');
            return;
        }
        for (let i = 0; i < req.session.cart.length; i++) {
            if (req.session.cart[i].id == req.params.id) {
                req.session.cart.splice(i, 1);
                break;
            }
        }
        res.json(req.session.cart);
    },

    getProfile: function(req, res, next) {
        if (req.user) {
            console.log("getting profile", req.user.id, req.user.first_name);
            var id = req.user.id;
            db.read_user(id, function(err, user) {
                if (err) {
                    res.send(err)
                }
                res.json(user);
            })
        } else {
            res.status(401).send('must login')
        }
    },

    getUsers: function(req, res, next) {
        db.read_users(function(err, users) {
            res.json(users);
        })
    },

    createSubmission: function(req, res, next) {
        if (req.files.cover) {
            var cover_url = "../public/uploads/" + req.files.cover[0].filename;
            var template = null;
        } else {
            var template = req.body.template;
            var cover_url = null;
        }
        var score_url = "../public/uploads/" + req.files.submissionScore[0].filename;
        var parts_url = "../public/uploads/" + req.files.submissionParts[0].filename;
        var date_submitted = new Date();
        var title = req.body.title;
        var year_composed = req.body.year_composed;
        var package2;
        var price_pdf;
        var price_print;
        var price_mixed;
        if (req.body.package == "pdf") {
            package2 = 'pdf';
            price_pdf = req.body.price_pdf;
            price_print = null;
            price_mixed = null;
        } else if (req.body.package == "print") {
            package2 = 'print';
            price_print = req.body.price_print;
            price_pdf = null;
            price_mixed = null;
        } else if (req.body.package == "mixed") {
            package2 = 'mixed';
            price_mixed = req.body.price_mixed;
            price_pdf = req.body.price_pdf;
            price_print = req.body.price_print;
        }

        var accepted = null;
        var date_accepted = null;
        console.log(req.user.id);
        db.get_composer_by_user(req.user.id, function(err, resp) {
            var composer_id = resp[0].id;
            db.create_submission(date_submitted, title, year_composed, composer_id,
                cover_url, score_url, parts_url, template, price_print, price_pdf,
                price_mixed, package2, accepted, date_accepted,
                function(err, resp) {
                    if (err) {
                        console.log('error', err);
                    }
                    res.status(200).redirect('/#/profile');

                });
        });
    },

    createWork: function(req, res, next) {
        var cover_url;
        if (req.files.cover) {
            cover_url = "../public/uploads/" + req.files.cover[0].filename;
        } else if (req.body.cover_url) {
            cover_url = req.body.cover_url;
        }
        var score_url;
        if (req.files.submissionScore) {
            score_url = "../public/uploads/" + req.files.submissionScore[0].filename;
        } else if (req.body.score_url) {
            score_url = req.body.score_url;
        }
        var parts_url
        if (req.files.submissionParts) {
            parts_url = "../public/uploads/" + req.files.submissionParts[0].filename;
        } else if (req.body.parts_url) {
            parts_url = req.body.parts_url;
        }
        var title = req.body.title;
        var year_composed = req.body.year_composed;
        var package2;
        var price_pdf;
        var price_print;
        var price_mixed;
        if (req.body.package == "pdf") {
            package2 = 'pdf';
            price_pdf = req.body.price_pdf;
            price_print = null;
            price_mixed = null;
        } else if (req.body.package == "print") {
            package2 = 'print';
            price_print = req.body.price_print;
            price_pdf = null;
            price_mixed = null;
        } else if (req.body.package == "mixed") {
            package2 = 'mixed';
            price_mixed = req.body.price_mixed;
            price_pdf = req.body.price_pdf;
            price_print = req.body.price_print;
        }
        var instrumentation = req.body.instrumentation.split(',');
        var catalog = req.body.catalog;
        var worknumber = req.body.worknumber;
        var style = req.body.style;
        var collection = req.body.collection;
        var composer_id = req.body.composer_id;
        db.create_work(title, composer_id, instrumentation, catalog, worknumber, year_composed,
            style, score_url, cover_url, collection, package2, price_print, price_pdf,
            price_mixed, parts_url,
            function(err, resp) {
                if (err) {
                    console.log('error', err);
                }
                res.status(200).redirect('/#/admin/inventory');

            });
    },

    updateWork: function(req, res, next) {
        var id = req.body.id;
        if (req.body.title) {
            db.update_work_title(id, req.body.title, function(err, resp) {
                res.send('updated');
            });
        }
    },

    createComposer: function(req, res, next) {
        var first_name = req.body.first_name;
        var last_name = req.body.last_name;
        var year_born = req.body.year_born;
        if (!req.body.year_died) {
            var year_died = null;
        } else {
            var year_died = req.body.year_died;
        }
        var country_of_origin = req.body.country_of_origin;
        var user_id = req.user.id;
        db.create_composer(first_name, last_name, year_born,
            year_died, country_of_origin, user_id,
            function(err, resp) {
                res.send(resp)
            })
    },

    getSubmissions: function(req, res, next) {
        db.get_unreviewed_submissions(function(err, resp) {
            res.json(resp);
        })
    },

    getSubmission: function(req, res, next) {
        db.get_submission_by_id(req.params.id, function(err, resp) {
            res.json(resp[0]);
        })
    },

    acceptOrDenySubmission: function(req, res, next) {
        db.submissions.update({
                id: req.params.id,
                accepted: req.params.acceptance
            },
            function(err, resp) {
                res.send(resp);
            })
    },

    createOrder: function(req, res, next) {
        var timeNow = newDate();
        db.purchases.insert({
            user_id: req.user.id,
            order_date: timeNow
        }, function(err, order) {
            if (err) {
                res.status(500).send(err);
                return;
            }
            for (var item in req.session.cart) {
                var prices = [];
                db.purchase_lines.insert({
                    order_id: order.id,
                    work_id: item.id,
                    quantity: 1,
                    package: 'mixed'
                }, function(err, resp) {
                    if (err) {
                        res.status(500).send(err);
                    }
                })
            }
        })
    },

    getPurchasesByUser: function(req, res, next) {
        db.get_purchases_by_user(req.user.id, function(err, purchases) {
            if (err) {
                res.status(500).send(err)
            }
            res.json(purchases);
        })
    },

    getWorksByComposer: function(req, res, next) {
        db.get_works_by_composer(req.params.id, function(err, works) {
            if (err) {
                res.status(500).send(err)
            }
            res.json(works);
        })
    }


}
