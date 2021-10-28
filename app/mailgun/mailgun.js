const mailgun = require("mailgun-js");

const domain = process.env.MAILGUN_DOMAIN;
const api_key = process.env.MAILGUN_KEY;
const mg = mailgun({apiKey: api_key, domain: domain});

exports.sendMail = (req, res) => {
    // Validate request
    if (!req.body.email) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }

    const data = {
        from: 'Erik-ersr20 <erik@familjensvensson.se>',
        to: `${req.body.email}`,
        subject: 'jsramverk-editor-ersr20',
        text: 'You have been invite to join jsramverk-editor-ersr20',
        html: '<p> Here is a <a href="https://jsramverk-editor-ersr20.azurewebsites.net/#/register">link</a> to signup page'
    };

    mg.messages().send(data, function (error, body) {
        console.log(body);
        console.log("sent mail...");
        console.log("Error: ", error);
    });

    res.send("Invite sent!");
};