const Sequelize =require('sequelize');
const sequelize=new Sequelize('nodeexpense','root','password',{
    dialect:'mysql',
    host:'localhost'
});

module.exports=sequelize;