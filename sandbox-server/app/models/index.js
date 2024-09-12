const dbConfig = require("../../config/db.config.js");

const mongoose = require("mongoose");

// sets the apps promise to the promise that mongoose will use
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.products = require("./product.model");
db.user = require("./user.model");
db.role = require("./role.model");
db.refreshToken = require("./refreshToken.model");

db.ROLES = ["user", "admin"];

module.exports = db;