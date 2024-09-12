const express = require('express');
const router = express.Router(); 
const {createTeam,login}=require('../Controllers/teamLogin');
const randomRiddles=require('../Controllers/getRiddles');
const checkAnswer=require('../Controllers/checkRiddles');
//authenticator
const authenticateToken=require('../Controllers/Authenticate');

// router.post('/create',createTeam);
router.post('/login',login);
router.get('/getriddles'
    // authenticateToken
    ,randomRiddles);


    router.post('/riddlesol',checkAnswer);


module.exports =  router ; 
