const User = require('../models/models');
const Trip = require('../models/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()

module.exports = {
    // insert methods here
    // CREATE - POST
    register:(req, res)=> {
        User.create(req.body)
            .then( user => {
                const token = jwt.sign({
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    userName: user.userName,
                    email: user.email,
                    //add for rest, maybe email not pw
                }, process.env.JWT_SECRET)
                const { password, ...restOfUser } = user;
                res
                    .cookie('userToken', token, process.env.JWT_SECRET, {httpOnly:true})
                .json({ message: "success", results: user})
            })
            .catch(err => res.json({ message: "error", results: err}))
    },

    login:(req, res)=> {
        User.findOne({ email: req.body.email })
            .then(async (user) => {
            if (user === null) {
                return Promise.reject("Invalid email/password")
            } 
                let isValid = bcrypt.compare(req.body.password,user.password)
                return { user, valid:isValid}
            })
            .then(results => {
                const { user, valid } = results;
                if(!valid){
                    return Promise.reject("Invalid email/password");
                }

                const token = jwt.sign({
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    userName: user.userName,
                    email: user.email,
                }, process.env.JWT_SECRET);

                res
                    .cookie("userToken", token, process.env.JWT_SECRET, {httpOnly:true} )
                    .json({message: "success", results: user})
            })
            .catch( err => res.json({ message: "error", results: err}))
        },
            //     bcrypt
            //     .compare(req.body.password, user.password)
            //     .then((passwordIsValid) => {
            //         if (passwordIsValid) {
            //         res
            //             .cookie(
            //             "usertoken",
            //             jwt.sign({ _id: user._id }, process.env.JWT_SECRET),
            //             {
            //                 httpOnly: true,
            //             }
            //             )
            //             .json({ msg: "success!" });
            //         } else {
            //         res.status(400).json({ msg: "invalid login attempt" });
            //         }
            //     })
            //     .catch((err) =>
            //         res.status(400).json({ msg: "invalid login attempt" })
            //     );
            // }
            // })
            // .catch((err) => res.json(err));
            // .catch(err => res.json({ message: "error", results: err }))
    
    // logout(req, res) {
    // res
    //     .cookie("usertoken", jwt.sign({ _id: "" }, process.env.JWT_SECRET), {
    //     httpOnly: true,
    //     maxAge: 0,
    //     })
    //     .json({ msg: "ok" });
    // },

    logout:(req, res)=> {
    res.clearCookie("userToken");
    res.json({ message:"success", results:"You have been logged out" });
    },

    getLoggedInUser(req, res) {
        const decodedJWT = jwt.decode(req.cookies.usertoken, { complete: true });

        User.findById(decodedJWT.payload._id)
            .then(user => res.json({ message: "success", results: user }))
            .catch(err => res.json({ message: "error", results: err }))
    },
    
    createTrip: (req, res) => {
        User.create(req.body)
        .then(user => res.json({ message: "success", results: user }))
        .catch(err => res.json({ message: "error", results: err }))
    },
    // READ
    getAllUsers(req, res) {
        User.find()
            .then(users => res.json({ message: "success", results: users }))
            .catch(err => res.json({ message: "error", results: err }))
    },

    getOneUser(req, res) {
        User.findById(req.params.id)
            .then(user => {
                console.log("hello")
                res.json({ message: "success", results: user })
            })
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
    
    // UPDATE - PUT/PATCH
    updateTrip: (req, res) => {
        User.findByIdAndUpdate(req.params.id,{ $push: { trips: req.body } }, { new: true, runValidators: true })
        .then(user => res.json({ message: "success", results: user }))
        .catch(err => res.json({ message: "error", results: err }))
    },
    updateUser(req, res) {
        User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        .then(user => res.json({ message: "success", results: user }))
        .catch(err => res.json({ message: "error", results: err }))
    },
    
    // DELETE - DELETE
    //trip delete needs to be refactored
    deleteTrip: (req, res) => {
        Trip.findByIdAndDelete(req.params.id)
        .then(user => res.json({ message: "success", results: user }))
        .catch(err => res.json({ message: "error", results: err }))
    },
    deleteUser: (req, res) => {
        User.findByIdAndDelete(req.params.id)
        .then(user => res.json({ message: "success", results: user }))
        .catch(err => res.json({ message: "error", results: err }))
    },
    }