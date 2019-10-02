const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');

const { username, password, database } = require('./credentials/mongodb-atlas.json');

mongoose.connect(`mongodb+srv://${username}:${password}@cluster0-3nmv8.mongodb.net/${database}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const app = express();

app.use(express.json());
app.use(routes);

console.log('server on');
app.listen(3333);