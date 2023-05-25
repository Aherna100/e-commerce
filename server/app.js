const express = require('express');
const app = express();

require('dotenv').config();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));

const loaders = require('./loaders');

async function startServer() {
    loaders(app);

    app.listen(process.env.PORT, () => {
        console.log("Listening on Port", process.env.PORT);
    })
}

startServer();