const jwt = require("jsonwebtoken");
const config = require("../../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

const catchError = (err, res) => {
    if (err instanceof jwt.TokenExpiredError) {
        return res.status(401).send({ message: "Unauthorized. Access Token was expired." });
    }
}

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({message: "No token provided."});
    }

    jwt.verify(token,
        config.secret,
        (err, decoded) => {
            if (err) {
                return catchError(err, res);
            }
            req.userId = decoded.id;
            next();
        });
};

isAdmin = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }

        Role.find(
            {
                _id: { $in: user .roles },
            },
            (err, roles) => {
                if (err) {
                    res.status(500).send({message: err});
                    return;
                }

                for (let i=0; i < roles.length; i++) {
                    if (roles[i].name === "admin") {
                        next();
                        return;
                    }
                }

                res.status(403).send({message: "Requires Admin Role"});
                return;
            }
        );
    });
};

const authJwt = {
    verifyToken,
    isAdmin,
};
module.exports = authJwt;