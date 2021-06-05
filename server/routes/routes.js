const controller = require('../controllers/controller');
const { authenticate } = require("../config/jwt.config");

module.exports = app => {
    // insert routes here
    // CREATE
    app.post("/api/register", controller.register);
    app.post("/api/login", controller.login);
    app.post('/api/message/create', controller.createMessage);
    // app.post("/api/newtrip", controller.createTrip);
    // READ
    app.get("/api/logout", authenticate, controller.logout);
    app.get("/api/users/all", authenticate, controller.getAllUsers);
    app.get('/api/messages', controller.getAllMessages);
    // app.get("/api/users/loggedin", authenticate, controller.getLoggedInUser);
    app.get("/api/user/:id", controller.getOneUser);
    app.get("/api/trip/:id", controller.getOneTrip);
    // UPDATE
    app.put("/api/user/update/:id", controller.updateUser);
    app.put("/api/trip/update/:id", controller.updateTrip);
    app.put('/api/comment/update/:id', controller.updateComment);
    // DELETE
    app.delete("/api/user/delete/:id", controller.deleteUser);
    app.delete("/api/trip/delete/:id", controller.deleteTrip);
}
