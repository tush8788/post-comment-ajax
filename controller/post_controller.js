const PostDB = require('../models/post');
const CommentDB = require('../models/comment');


//using async await here

//create post
module.exports.createPost = async function (req, res) {

    try {
        //creting post then return 
        let post=await PostDB.create({ containt: req.body.containt, user: req.user.id });
        req.flash('success',"Post is Created !");
        if(req.xhr){
            return res.status(200).json({
                data:{
                    post:post
                },
                message:"Post Created!"
            })
        }

        req.flash('success',"Post is Created !");
        return res.redirect('/');
    }
    catch (err) {
        req.flash('error',"Error in creating post");
        return res.redirect('/');
    }
}

//delete post 
module.exports.deletePost = async function (req, res) {

    try {

        let post = await PostDB.findById(req.params.id);

        //check post created user or deleting user is same or not
        if (post && post.user == req.user.id) {
            //delete all comments related to given post
            await CommentDB.deleteMany({ post: req.params.id });

            //delete post
            await post.remove();
            req.flash('success',"Post and associated comment is deleted !");
            return res.redirect("back");
            //removing all realted comments   
        }
        else {
            return res.redirect("back");
        }

    } catch (err) {
        req.flash('error',"Error in Deleteing post and comment !");
        return res.redirect("back");
     }
}