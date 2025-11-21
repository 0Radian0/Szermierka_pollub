const express = require('express');
const router = express.Router();
const authFunction = require('../functions/authFunction');
const usersFunction = require('../functions/usersFunction');

router.post('/login', authFunction.login);
router.post('/register', authFunction.register);
router.get('/users', usersFunction.showFilteredUsers);
router.delete('/users/:id', usersFunction.deleteUser);
router.post('/users/rank', usersFunction.changeRanks);
router.post('/users/reset-password', usersFunction.resetPassword);
router.post("/users/changePassword", usersFunction.changePassword);
router.post("/users/changeDescription", usersFunction.changeDescription);
router.post("/users/deactivateUser", usersFunction.deactivateUser);




module.exports = router;