// used to build Rest apis
const express = require("express");

// provides Express middleware to enable CORS
const cors = require("cors");

// create an express app
const app = express();

var corsOptions = {
    origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({message: "Welcome to kelllyco application."});
});

require("./app/routes/product.routes")(app);
// require("./app/routes/author.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

const db = require("./app/models");
db.mongoose
    .connect(db.url)
    .then(() => {
        console.log("Connected to the db!");
    })
    .catch(err => {
        console.log("Cannot connect to the db :(");
        process.exit();
    });