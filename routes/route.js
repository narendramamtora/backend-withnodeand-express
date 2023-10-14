const express =require('express');
const router =express.Router();
const controller= require('../controllers/control')
router.post('/createpost', controller.createPost);
router.get('/showpost', controller.getPost);
router.post('/addcomment/:postId', controller.addComment);
module.exports=router;