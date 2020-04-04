const router = require('express').Router();
//mongoose model created
let User = require('../models/user.model');

//first endpoint that handles incoming HTTP get requests in the /user URL
router.route('/').get((req, res) => {
    //mongoose method to get all users from MongoDb DB. It returns a promise
     User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

//endpoint to handle post requests
router.route('/add').post((req, res) => {
    //gets the username from the req and assigns to the variable
    const username = req.body.username;

    const newUser = new User({username});

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
