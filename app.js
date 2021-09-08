const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const flash = require('connect-flash');
const session = require('express-session');
const multer = require('multer');
const mongoDbStore = require('connect-mongodb-session')(session);
const User = require('./models/user');


// ~~~~~~~ ROUTES ~~~~~~~//
const shopRoute = require('./routes/shop');
const authRoute = require('./routes/auth');
const adminRoute = require('./routes/admin');
const userRoute = require('./routes/user');
// ~~~~~~~~~~~~~~~~~~~~~//

// ~~~~~~~~~~~~~~~~~~~~~//

const MONGODB_URI = '';
const store = new mongoDbStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        var d = new Date();
        var n = d.getTime();
        cb(null, n + '_' + file.originalname);
    }
});

// ~~~~~~~~~~~~~~~~~~~~~//

app.set('view engine', 'ejs');//setting the view engine to ejs
app.set('views', 'views');//setting the views directory as views
app.use(
    session({
        secret: 'my secret',
        resave: false,
        saveUninitialized: false,
        store: store
    })
);

// ~~~~~~~ FOLLOWING MIDDLEWARES WILL RUN ON EVERY REQUESTION ~~~~~~~//

app.use(bodyparser.urlencoded({ extended: true }));
app.use(multer({ storage: fileStorage }).single('image'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(flash());

app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id).then((foundUser) => {
        req.user = foundUser;
        next();
    }).catch(err => console.log(err));
})

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//


// ~~~~~~~ MIDDLEWARES ~~~~~~~//

app.use(shopRoute);
app.use('/auth', authRoute);
app.use('/admin', adminRoute);
app.use('/user', userRoute);

// ~~~~~~~ MIDDLEWARES ~~~~~~~//

mongoose.connect(MONGODB_URI).then(() => {
    app.listen(3000);
}).catch(err => {
    console.log(err);
})