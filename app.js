const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true}));

app.use(bodyParser.json());
app.use(cors());

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {}).then(() => {
    console.log("Successful DB connection");
}).catch(err => {
    console.log('Could not connect to DB', err);
    process.exit();
});



require ('./app/routes/item.routes.js')(app);

app.listen(
    port, 
    () => console.log(`Example app listening on port ${port}!`)
);