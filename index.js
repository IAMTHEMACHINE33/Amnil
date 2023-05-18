const express = require("express");
require('dotenv').config()
const app = express();
// const products = require("./products.json");
const cors = require("cors");
const jwt = require('jsonwebtoken')

app.use(cors());
app.set("view engine", "ejs");

app.use(express.urlencoded({extended : true}))
app.use(express.static(__dirname+"/public/images"));
app.use(express.json())

const authHelper = (req, res, next) => {
    try{
        const authToken = req.headers.authorization.split(' ')[1];
        console.log('Token', authToken)
        console.log('Secret:: ', process.env.JWT_SECRET)
        const cookieToken = req.signedCookies['authToken'] //req.signedCookies['name']
        console.log('Cookie token', cookieToken)
        const decodeToken = jwt.verify(authToken, process.env.JWT_SECRET)
        console.log('Decoded token  ', decodeToken)
        next()
    }catch(err){
        console.log(err)
        return res.status(401).send('User Unauthorized')
    }
}

app.post('/login', (req, res) => {
    const {username, password} = req.body
    if(username == 'admin' && password === 'admin'){
        const token = jwt.sign({username}, process.env.JWT_SECRET)
        console.log(token)
        res.cookie('authToken', token, {maxAge: 10000, signed: true})
        return res.status(200).json({success: true, token, message: 'User authenticated successfully.'})
    }
    return res.status(401).send('Invalid username or password.')
})

app.get('/getAll', authHelper, async (req, res) => {
    const users = await  pool.query('select * from users_table;')
    // console.log(users)
    return res.json(users.rows)
})

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