module.exports = app => {
    const authController = require("../controllers/auth.controller.js");
  
    var router = require("express").Router();
  
    // Create a new TextEditor
    router.post("/signup", authController.create);
    router.post("/login", authController.login);

    app.use('/api/auth', router);
};
