const express = require("express");
const app = express();
const products = require("./products.json");
const cors = require("cors");

app.use(cors());
app.set("view engine", "ejs");

app.use(express.urlencoded({extended : true}))
app.use(express.static(__dirname+"/public/images"));
app.use(express.json())


const userRouter = require("./routes/users");
app.use("/users", userRouter);

// Get All
// app.get("/products", (req, res) => {
//     res.send(products);
// })

// // Get Highest
// app.get("/products/highest", (req, res) => {
//     var highest = 0;
//     for (let i = 0; i < products.length; i++)
//     {   
//         if (products[i].price > highest)
//         {
//             highest = products[i].price;
//         }
//     }
//     const product = products.filter((p) => p.price == highest)
//     res.send(product);
// })

// // Get Sum
// app.get("/products/sum", (req, res) => {
//     var sum = 0;
//     for (let i = 0; i < products.length; i++)
//     {
//         sum += products[i].price
//     }
//     res.send("sum : " + sum);
// })


app.listen(3333, () => {
    console.log("Server on Port 3333")
})