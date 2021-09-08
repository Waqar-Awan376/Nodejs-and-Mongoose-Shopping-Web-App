const user = require('../models/user');
const bcrypt = require('bcryptjs');

exports.getLogin = (req, res, next) => {
    res.render('auth/login',
        {
            pageTitle: "Login Page",
            path: ''
        });
}
exports.postLogin = (req, res, next) => {
    let email = req.body.login_email;
    let password = req.body.login_password;
    if (email == "admin@shop.com") {
        user.findOne({ email: email, password: password }).then((foundAdmin) => {
            if (!foundAdmin) {
                return res.redirect('/auth/login');
            }
            req.session.user = foundAdmin;
            req.session.isLoggedIn = true;
            return req.session.save(err => {
                res.redirect('/admin/index');
            });
        }).catch(err => console.log(err));
    }
    else {
        user.findOne({ email: email }).then((foundUser) => {
            if (!foundUser) {
                return res.redirect('/auth/login')
            }
            bcrypt.compare(password, foundUser.password).then(matchFound => {
                if (matchFound) {
                    req.session.user = foundUser;
                    req.session.isLoggedIn = true;
                    return req.session.save(err => {
                        console.log(err);
                        res.redirect('/user/index');
                    });
                }
                res.redirect('/auth/login');
            }).catch(err => {
                console.log(err);
                res.redirect('/auth/login');
            });
        }).catch(err => console.log(err));
    }
}

exports.getRegister = (req, res, next) => {
    res.render('auth/register', {
        pageTitle: 'Registration Page',
        path: ''
    });
}

exports.postRegister = (req, res, next) => {
    let email = req.body.reg_email;
    let username = req.body.reg_username;
    let password = req.body.reg_password;
    let confirmPass = req.body.reg_confirm_password;
    let image = req.file;
    let imageUrl = image.path;
    let role = "user";
    if (password != confirmPass) {
        console.log("Password Mismatch.");
        res.redirect('/auth/register');
    }

    user.findOne({ email: email }).then(foundUser => {
        if (foundUser) {
            console.log("User Already Exist.");
            return res.redirect('/auth/register');
        }
        return bcrypt.hash(password, 12).then(hashPassword => {
            const newUser = new user({
                email: email,
                username: username,
                password: hashPassword,
                imageURL: imageUrl,
                role: role
            });
            return newUser.save();
        })
            .then(result => {
                res.redirect('/auth/login');
            });
    })
        .catch(err => {
            console.log(err)
        });
}

exports.getLogout = (req, res, next) => {
    req.session.destroy(err => {
        res.redirect('/');
    });
}