
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.get('/add-user', userController.getAddUser);
router.post('/add-user', userController.postAddUser);
router.delete('/delete-user/:userId', userController.postDeleteUser);
// previous = router.post('/delete-user/id', userController.postDeleteUser);
router.get('/edit-user/:userId', userController.getEditUser);
router.post('/edit-user', userController.postEditUser);
router.get('/users', userController.getUsers);

router.get('/all-users', userController.getAllUsers);
module.exports = router;
