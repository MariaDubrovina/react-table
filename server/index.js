require("dotenv").config();
const cors = require("cors");
const express = require('express');
const db = require("./db");

const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES

//get all products
app.get('/products', async (req, res) => {
    try {
        const allProducts = await db.query("SELECT * FROM products");
        res.json(allProducts.rows);
    } catch (err) {
        console.error(err.message);
    }
});


app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
})