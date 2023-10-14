const Post = require('../models/posts');

exports.createPost=(req, res,next) => {
    const postLink=req.body.postLink;
    const postDes=req.body.postDes;
    
        Post.create({
            postLink:postLink,
            postDes:postDes
        })        
        .then(() => {
             res.sendStatus(200);
        })
        .catch((err)=>{
            console.log(err);
            res.sendStatus(500);
        })
}

exports.addComment = (req, res, next) => {
    const postId = req.params.postId;
    const commentText = req.body.comment;

    Post.findByPk(postId)
        .then(post => {
            if (!post) {
                return res.sendStatus(404);
            }

            let comments = JSON.parse(post.comment || '[]');
            comments.push(commentText);

            Post.update({ comment: comments }, { where: { id: postId } })
                .then(() => {
                    res.sendStatus(200);
                })
                .catch(err => {
                    console.error(err);
                    res.sendStatus(500);
                });
        })
        .catch(err => {
            console.error(err);
            res.sendStatus(500);
        });
};

exports.getPost=(req, res,next) => {
    Post.findAll()
    .then((posts) => {
        res.json(posts);
    })
    .catch((err) => {
        console.error(err);
        res.sendStatus(500);
    });
}
