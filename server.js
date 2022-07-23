const express = require('express');
const cors = require("cors")
require("./db/config");
const User = require('./db/User');
const Product = require("./db/Product");
const Jwt = require('jsonwebtoken');
var multer = require('multer');
var fs = require('fs');
var path = require('path');

const app = express();
app.use(express.static("uploads"));
app.use(express.json());
app.use(cors());

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "--" + file.originalname) //Appending extension
    }
})

var upload = multer({ storage: storage });


app.post("/register", async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    Jwt.sign({ result }, jwtKey, { expiresIn: "8h" }, (err, token) => {
        if (err) {
            res.send({ result: "No User Found" });
        }
        res.send({ result, auth: token });
    })

});

app.post("/login", async (req, res) => {
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
                if (err) {
                    res.send({ result: "No User Found" });
                }
                res.send({ user, auth: token });
            })

        } else {
            res.send({ result: "No User Found" });
        }
    } else {
        res.send({ result: "No User Found" });
    }
});

app.post("/add-product", verifyToken, async (req, res) => {
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);
})

app.get("/products", verifyToken, async (req, res) => {
    let products = await Product.find();
    if (products.length > 0) {
        res.send(products);
    } else {
        res.send({ result: "No result found" })
    }
})

app.delete("/product/:id", verifyToken, async (req, res) => {
    let result = await Product.deleteOne({ _id: req.params.id });
    res.send(result);
})

app.get("/product/:id", verifyToken, async (req, res) => {
    let result = await Product.findOne({ _id: req.params.id });
    if (result) {
        res.send(result);
    } else {
        res.send("No Product found with this ID");
    }
})

app.put("/product/:id", verifyToken, async (req, res) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        }
    );
    res.send(result);
})

app.get("/profile/:id", (req, res) => {
    User.findOne({ _id: req.params.id }, (err, item) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.send(item.img);
        }
    });

});
app.put('/profile/:id', upload.single('image'), async (req, res) => {

    console.log(req.file);
    let result = await User.updateOne(
        { _id: req.params.id },
        {
            img: (req.file) ? req.file.filename : null
        }
    );

    res.send("file sent successfully");

});



app.get("/search/:key", verifyToken, async (req, res) => {
    let result = await Product.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { category: { $regex: req.params.key } },
            { company: { $regex: req.params.key } }
        ]
    });
    res.send(result);
});

function verifyToken(req, res, next) {
    let token = req.headers["authorization"];
    if (token) {
        token = token.split(" ")[1];
        Jwt.verify(token, jwtKey, (err, valid) => {
            if (err) {
                res.status(401).send({ result: "please provide valid token" })
            } else {
                next();
            }
        });
    } else {
        res.status(403).send({ result: "add token with header" });
    }


}

 __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/client/build")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

const PORT = process.env.PORT;
app.listen(PORT, function () {
    console.log("server started at port 3001");
});
