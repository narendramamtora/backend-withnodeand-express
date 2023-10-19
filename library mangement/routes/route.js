const express =require('express');
const router =express.Router();
const controller= require('../controllers/control')
router.post('/createbook', controller.createBook);
router.get('/showbook', controller.getBook);
router.post('/returnbook', controller.returnBook);

module.exports=router;