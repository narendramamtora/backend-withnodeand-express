const Sequelize= require('sequelize');
const sequelize=new Sequelize('projects','root','password',{
    dialect:'mysql',
    host:'localhost'
});

module.exports=sequelize;