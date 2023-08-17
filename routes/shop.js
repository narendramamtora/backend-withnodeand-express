const path = require('path');

const express = require('express');

const shopcontroller=require('../controllers/product')

const router = express.Router();

router.get('/', shopcontroller.getproduct);

module.exports = router;
