module.exports = app => {
    const mailController = require("../mailgun/mailgun.js");
    var router = require("express").Router();

    router.post("/signup", mailController.sendMail);

    app.use('/api/mail', router);
};
