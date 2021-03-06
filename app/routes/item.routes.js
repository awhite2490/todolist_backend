module.exports = (app) => {
    const items = require('../controllers/item.controller.js');

    app.post('/items', items.create);

    app.get('/items', items.findAll);

    app.get('/items/:itemId', items.findOne);

    app.put('/items/:itemId', items.update);

    app.delete('/items/:itemId', items.delete);
}