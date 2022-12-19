const CommentDB = require('../models/comment');
const PostDB = require('../models/post');

//using async await

//create comment 
module.exports.create = async function (req, res) {
    try {

        //first checking post is available in db or not
        let post = await PostDB.findById(req.body.postId);

        //if post is available then create comment 
        if (post) {
            let newComment = await CommentDB.create(
                {
                    containt: req.body.containt,
                    user: req.user.id,
                    post: req.body.postId
                }
            )
            req.flash('success',"new Comment added !");   
            post.comments.push(newComment);

            post.save();
            return res.redirect('/');
        }

    } catch (err) {
        req.flash('error',"error in creating comment !"); 
        return;
    }
}

//delete comment 
module.exports.deleteComment = async function (req, res) {

    try {

        let comment = await CommentDB.findById(req.params.id);

        if (comment && comment.user == req.user.id) {
            let postID = comment.post;
            //delete comment 
            comment.remove();

            await PostDB.findByIdAndUpdate(postID, { $pull: { comments: req.params.id } });
            req.flash('success',"Delete Comment!");   
            return res.redirect("back");
        }

    } catch (err) {
        req.flash('error',"error in Delete Comment!");   
        return res.redirect("back");
    }
}