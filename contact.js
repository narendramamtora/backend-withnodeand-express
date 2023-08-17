

const expresscontact=require('express');
const contacting=expresscontact.Router();
const contactcontroller=require('../controllers/contact')

contacting.get('/contactus',contactcontroller.getcontacts);

// admin =>POST 
contacting.post('/contactus',contactcontroller.postcontacts);

module.exports=contacting;
 