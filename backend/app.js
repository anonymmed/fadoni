const express = require("express");
const app = express();
const productsRoute = require('./routes/product');
require('./utils/db');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/api/v1', (req, res) => {
    res.end(JSON.stringify({
        'version': '1'
    }, null, 3));
});

app.use('/api/products', productsRoute);

app.use((req, res) => {
    res.redirect('/api/v1');
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
