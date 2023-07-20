require('dotenv').config();
const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const sequelize = require('./util/database');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const users = require("./routes/users");
const cars = require('./routes/cars');
const contents = require('./routes/contents')
const contacts = require('./routes/contacts')
const openingHours = require('./routes/openingHours')
const testimonials = require('./routes/testimonials')
const file = require('./routes/files')
const auth = require("./routes/auth");
const acl = require('express-acl');


app.use(bodyparser.json({ limit : '10mb'}));
app.use(bodyparser.urlencoded({ limit : '10mb', extended: false }));

const uploadDirectory = '/files'
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

// CORS POLICY
app.use(cors({
    origin: '*',
    methods: ['GET', 'PUT', 'DELETE', 'POST'],
    allowedHeaders: ['Content-Type', 'x-access-token']
}));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


//ACL CONFIG
acl.config({
    baseUrl: '/',
    fileName: 'nacl.json',
    decodedObjectName: 'user',
    defaultRole: 'anonymous'
  })

 
//CRUD ROUTES
app.use("/login", auth);
app.use("/user", users);
app.use('/cars', cars);
app.use('/contents', contents )
app.use('/contacts',contacts)
app.use('/openingHours', openingHours)
app.use('/testimonials', testimonials)
app.use('/file', express.static(path.join(__dirname, 'files')), file);

//TEST ROUTE
app.use(express.static(path.join(__dirname,'build')))
app.get('/*', (req, res, next) => {
    res.sendFile(path.join(__dirname,'build','index.html'))
});


//ERROR HANDLING
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({ message: message });
});


//SYNC DATABASE
sequelize
    .sync()
    .then(result => {
        console.log("Database connected");
        app.listen(8000);
    })
    .catch(err => console.log('Une erreur est survenue', err));
