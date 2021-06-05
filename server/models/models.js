const mongoose = require('mongoose');
const bcrypt = require("bcrypt");


const validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const TripSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter a name for your trip."]
    },
    location: {
        type: String,
        required: [true, "Please enter your trips location."]
    },
    startDate: {
        type: Date,
        required: [true, "Please enter in your trip start date."],
        min: [Date.now, "Please enter in a valid date"]
    },
    endDate: {
        type: Date,
        required: [true, "Please enter in your trip end date."],
        min: [Date.now, "Please enter in a valid date"]
    }
}, { timestamps: true })

const UserSchema = new mongoose.Schema({
    // go buck wild with your schema
    firstName: {
        type: String,
        required: [true, "Please enter your first name!"],
        minlength: [2, "Please enter your full first name!"]
    },
    lastName: {
        type: String,
        required: [true, "Please enter your last name!"],
        minlength: [2, "Please enter your full last name!"]
    },
    userName: {
        type: String,
        required: [true, "Please Create your UserName!"],
        minlength: [3, "UserName must be longer than 3 characters."],
        unique: true,
        lowercase: true
    },
    //email
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: {validator: validateEmail, message: 'Please fill a valid email address'},
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    //pass
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be 8 characters or longer"],
    },
    trips: [TripSchema]
}, { timestamps: true });

const CommentSchema = new mongoose.Schema({
    comment:{
        type: String,
        minlength: [5, "Please create a comment that is longer than 5 characters!"]
    },
    userName:{
        type: String,
        minlength: [5, "UserName must be longer than 3 characters."]
    }
}, { timestamps: true });

const MessageSchema = new mongoose.Schema({
    message:{ 
        type: String,
        minlength: [5, "Please create a message that is longer than 5 characters!"]
    },
    userName:{
        type: String,
        minlength: [5, "UserName must be longer than 3 characters."]
    },
    comments: [CommentSchema]
}, { timestamps: true });

UserSchema.virtual("confirmPassword")
    .get(() => this._confirmPassword)
    .set((value) => (this._confirmPassword = value));

UserSchema.pre("validate", function (next) {
    if (this.password !== this.confirmPassword) {
    this.invalidate("confirmPassword", "Password must match confirm password");
    }
    next();
});

UserSchema.pre("save", function (next) {
    console.log(this.password);
    bcrypt.hash(this.password, 10)
        .then((hash) => {
            console.log(hash)
            this.password = hash;
            next();
        });
});

const User = mongoose.model("User", UserSchema);
const Trip = mongoose.model("Trip", TripSchema);
const Message = mongoose.model("Message", MessageSchema);

module.exports = User, Trip, Message;

// user model
// nested schema with trip location and start and end date name and description


// trip name, trip location, start date, end date