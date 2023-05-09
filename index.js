const express = require("express");
const app = express();
const products = require("./products.json");

// Get All
app.get("/products", (req, res) => {
    res.send(products);
})

// Get Highest
app.get("/products/highest", (req, res) => {
    var highest = 0;
    for (let i = 0; i < products.length; i++)
    {   
        if (products[i].price > highest)
        {
            highest = products[i].price;
        }
    }
    const product = products.filter((p) => p.price == highest)
    res.send(product);
})

// Get Sum
app.get("/products/sum", (req, res) => {
    var sum = 0;
    for (let i = 0; i < products.length; i++)
    {
        sum += products[i].price
    }
    res.send("sum : " + sum);
})


app.listen(3333, () => {
    console.log("Server on Port 3333")
})