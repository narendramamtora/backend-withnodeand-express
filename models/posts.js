const Sequelize=require('sequelize')
const sequelize=require('../util/database')

const Post = sequelize.define('post', {
  id:{
    type: Sequelize.INTEGER,
    autoIncrement:true,
    allowNull:false,
    primaryKey:true 
 },
  postLink: {
    type: Sequelize.STRING,
  },
  postDes: {
    type: Sequelize.STRING,
  },
  comment: { 
    type: Sequelize.ARRAY(Sequelize.STRING), 
    defaultValue: [], 
  }
});
module.exports = Post;