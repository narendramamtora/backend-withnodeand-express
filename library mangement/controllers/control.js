const Post = require('../models/books');
const moment = require('moment');
exports.createBook=(req, res,next) => {
    const postBook=req.body.postBook;
    const takenOnTime=req.body.takenOnTime;
        Post.create({
            postBook:postBook,
            takenOnTime:takenOnTime
            

        })        
        .then(() => {
             res.sendStatus(200);
        })
        .catch((err)=>{
            console.log(err);
            res.sendStatus(500);
        })
}

exports.getBook=(req, res,next) => {
    Post.findAll()
   
   
    .then((books) => {
        const returnedBooks = books.filter(book => book.status === 'returned');
        const notReturnedBooks = books.filter(book => book.status === 'not returned');

        res.json({ returnedBooks, notReturnedBooks });

    })
    .catch((err) => {
        console.error(err);
        res.sendStatus(500);
    });
}

exports.returnBook = (req, res, next) => {
    const returntime = new Date()
    const bookId = req.body.id;
    Post.update(
        { status: 'returned', returnOnTime: returntime},
        { where: { id: bookId } }
    )
        .then(() => {
            res.sendStatus(200);
        })
        .catch((err) => {
            console.error(err);
            res.sendStatus(500);
        });
};
