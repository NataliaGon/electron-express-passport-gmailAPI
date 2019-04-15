const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/', 

    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/callback',
    passport.authenticate('google', {
        // successRedirect: '/',
        failureRedirect: '/', session: false
    })
    , (req, resp)=>{
        console.log(req ,resp)
    }
);


module.exports = router;
