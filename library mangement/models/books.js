const Sequelize=require('sequelize')
const sequelize=require('../util/database')

const Book = sequelize.define('book', {
  id:{
    type: Sequelize.INTEGER,
    autoIncrement:true,
    allowNull:false,
    primaryKey:true 
 },
  postBook: {
    type: Sequelize.STRING,
  },
  takenOnTime: {
    type: Sequelize.STRING,
  },
  status: {
    type: Sequelize.STRING, // Add a field to track the status of the book (e.g., "returned" or "not returned")
    defaultValue: 'not returned', // Default value can be 'not returned' when a book is initially added
},
returnOnTime: {
    type: Sequelize.DATE, // Add a field to store the return date
},
});
module.exports = Book;