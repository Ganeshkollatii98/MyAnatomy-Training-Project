const User = require('../models/user');
const router = require('express').Router();
var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'kollatiganesh1998@gmail.com',
        pass: '9912053395'
    }
});


router.post('/register', (req, res) => {
    console.log(req.body);
    let name = req.body.username;
    let mail = req.body.email;
    let password = req.body.password;
    // let cpassword=req.body.cpassword;
    console.log("hello hai ra");
    let userTable = User.build({
        username: name,
        email: mail,
        password: password
    })
    userTable.save().then((data) => {
        console.log(data);

        var mailOptions = {
            from: 'kollatiganesh1998@gmail.com',
            to: `${mail}`,
            subject: 'Thank you for Choosing Online Pizza',
            html: '<h2>Thank you for choosing us 😍, and Pizza Ordering with us <br><br> Enjoy Your Pizza!!!</h2>'
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            console.error(err);
        else
            console.log('Email sent :' + info.response);
    })
    res.status(201).send("record inserted in user table");
}).catch((error) => {
    res.status(401).send("unable to insert record please chek", error)
})

})

router.post("/login", (req, res) => {
    let reqEmail = req.body.email;
    let reqPassword = req.body.password;

    User.findAll({ where: { email: reqEmail }, raw: true }).then((data) => {
        if (data) {
            let userRecord = data[0];
            console.log(userRecord);
            let password = userRecord.password;
            console.log(password);
            if (reqPassword == password) {
                res.status(200).send("user successfully logged in..")
            }
            else {
                res.status(401).send("unable to  logged in..")
            }
        }
        else {
            res.send("please register before")
        }
    }).catch((error) => {
        console.log("please check error logging error", error);
    })
})
module.exports = router;