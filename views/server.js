const express = require('express');
const router = express.Router(); 
const {createTeam,login}=require('../Controllers/teamLogin');
const randomRiddles=require('../Controllers/getRiddles');
const checkAnswer=require('../Controllers/checkRiddles');
const getTopTeams=require('../Controllers/winners');
//authenticator
const authenticateToken=require('../Controllers/Authenticate');

router.post('/create',createTeam);
router.post('/login',login);
router.get('/getriddles',authenticateToken,randomRiddles);
router.post('/riddlesol',authenticateToken,checkAnswer);
router.get('/gettopteams',getTopTeams);


module.exports =  router ; 
