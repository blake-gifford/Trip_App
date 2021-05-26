const User = require('../models/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    // insert methods here
    // CREATE - POST
    register(req, res) {
        const user = new User(req.body);

        user
            .save()
            .then(() => {
                res.json({ message: "success", results: user})
            })
            .catch(err => res.json({ message: "error", results: err}))
    },
    login(req, res) {
        User.findOne({ email: req.body.email })
            .then((user) => {
            if (user === null) {
                res.status(400).json({ msg: "invalid login attempt" });
            } else {
                bcrypt
                .compare(req.body.password, user.password)
                .then((passwordIsValid) => {
                    if (passwordIsValid) {
                    res
                        .cookie(
                        "usertoken",
                        jwt.sign({ _id: user._id }, process.env.JWT_SECRET),
                        {
                            httpOnly: true,
                        }
                        )
                        .json({ msg: "success!" });
                    } else {
                    res.status(400).json({ msg: "invalid login attempt" });
                    }
                })
                .catch((err) =>
                    res.status(400).json({ msg: "invalid login attempt" })
                );
            }
            })
            // .catch((err) => res.json(err));
            .catch(err => res.json({ message: "error", results: err }))

        },
    
        logout(req, res) {
        res
            .cookie("usertoken", jwt.sign({ _id: "" }, process.env.JWT_SECRET), {
            httpOnly: true,
            maxAge: 0,
            })
            .json({ msg: "ok" });
        },
    
        logout2(req, res) {
        res.clearCookie("usertoken");
        res.json({ msg: "usertoken cookie cleared" });
        },
    
        getLoggedInUser(req, res) {
            const decodedJWT = jwt.decode(req.cookies.usertoken, { complete: true });
    
            User.findById(decodedJWT.payload._id)
                .then(user => res.json({ message: "success", results: user }))
                .catch(err => res.json({ message: "error", results: err }))
            // .then((user) => res.json(user))
            // .catch((err) => res.json(err));
        },
    
        getAllUsers(req, res) {
            User.find()
                .then(user => res.json({ message: "success", results: user }))
                .catch(err => res.json({ message: "error", results: err }))
            // .then((users) => res.json(users))
            // .catch((err) => res.json(err));
        },
    
        getOneUser(req, res) {
            User.findOne({ _id: req.params.id })
                .then(user => res.json({ message: "success", results: user }))
                .catch(err => res.json({ message: "error", results: err }))
            // .then((user) => res.json(user))
            // .catch((err) => res.json(err));
        },

        updateUser(req, res) {
            User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
                .then(user => res.json({ message: "success", results: user }))
                .catch(err => res.json({ message: "error", results: err }))
        },

        deleteUser: (req, res) => {
            User.findByIdAndDelete(req.params.id)
                .then(user => res.json({ message: "success", results: user }))
                .catch(err => res.json({ message: "error", results: err }))
        },

        createTrip: (req, res) => {
            User.create(req.body)
                .then(user => res.json({ message: "success", results: user }))
                .catch(err => res.json({ message: "error", results: err }))
        },

        getAllTrips: (req, res) => {
            User.find()
                .then(user => res.json({ message: "success", results: user }))
                .catch(err => res.json({ message: "error", results: err }))
        },
        getOneTrip: (req, res) => {
            User.findOne({"trip._id": req.params.id})
                .then(user => res.json({ message: "success", results: user }))
                .catch(err => res.json({ message: "error", results: err }))
        },
        updateTrip: (req, res) => {
            User.findByIdAndUpdate(req.params.id,{ $push: { trips: req.body } }, { new: true, runValidators: true })
                .then(user => res.json({ message: "success", results: user }))
                .catch(err => res.json({ message: "error", results: err }))
        },
        deleteTrip: (req, res) => {
            User.findByIdAndDelete(req.params.id)
                    .then(user => res.json({ message: "success", results: user }))
                    .catch(err => res.json({ message: "error", results: err }))
        }

    // UPDATE - PUT/PATCH

    // DELETE - DELETE
}