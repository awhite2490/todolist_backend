const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: true}));

app.use(bodyParser.json());

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {}).then(() => {
    console.log("Successful DB connection");
}).catch(err => {
    console.log('Could not connect to DB', err);
    process.exit();
});

app.get('/items', (req, res) => {
    const items = [
        {
            itemid: 1,
            isComplete: false,
            text: 'First sample item - not completed',
        },
        {
            itemid: 2,
            isComplete: true,
            text: 'Second sample item - is completed',
        },
        {
            itemid:4,
            isComplete: false,
            text: 'Third sample item - ID is 4'
        },
    ];
    res.json(items);
});

require ('./app/routes/item.routes.js')(app);

app.listen(
    port, 
    () => console.log(`Example app listening on port ${port}!`)
);