require('./config/config');

const mongoose = require('mongoose');
const express = require('express')
    /* const bodyParser = require('body-parser'); */
const app = express()
const db = mongoose.connection;

app.use(require('./routes/user'));

mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, res) => {
    if (err) throw err;
    console.log('Base de datos ONLINE, desde callback de mongoose.connect');
});

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('we are connected!, desde db.on/db.once');
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});