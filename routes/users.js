const express = require("express");
const router = express.Router();
const multer = require("multer");
// const users = require("../users.json");
const app = express();

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
    destination : function (req, file, cb)
    {
        cb(null, "./public/images/")
    },
    filename : (req, file, callback) => {
        callback(null, Date.now() +  file.originalname)
    }
})

const upload = multer({storage : storage}).single("profile")

const users = [
    {
        firstname: 'Rijan',
        lastname: 'Maharjan',
        username: 'Machine',
        profile: "16840565986528f4dca6546513e0254bb59fd739314ce.png"
    },
    {
        firstname: 'Neerav',
        lastname: 'Shrestha',
        usename: "Kai",
        profile: "16840565986528f4dca6546513e0254bb59fd739314ce.png"
    },{
        firstname: 'Arush',
        lastname: 'Nepali',
        username: "drunken",
        profile: "16840565986528f4dca6546513e0254bb59fd739314ce.png"
    }
]

router.get("/", (req, res) => {
    res.render("users", {users})
})

router.get("/register", (req, res) => {
    res.render("registerUser", {firstname : "My name"})
})

router.post("/register", (req, res) => {
    console.log(req.body)
    const {firstname, lastname ,username} = req.body;
    users.push({firstname, lastname, username})
    upload(req, res, (err) => {
        if (err)
        {
            return res.send("Error uploading file")
        }
        users.push({profile : req.file.filename})
        res.render("users", {users})
        return; 
    })
})

module.exports = router;