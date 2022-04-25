const express = require('express');
const router = express.Router({mergeParams:true});
const db = require('../models');
// Post Route 
router.get('/', async(req,res,next)=>{
    try {
        let found = await db.User.findById(req.params.userid).populate("posts");
        console.log(found);
        context = {posts: found.posts, user: found};
        await res.render('post_view.ejs', context);
    }
    catch(error) {
        console.log(error);
        req.error=error;
        res.send(`ERROR ${error}`);
        next();
    }
})
// Create new post route
router.get('/new', async(req,res,next)=>{
    try {console.log(req.params.userid);
    context = {
        userid: req.params.userid};
        console.log(context);
        await res.render('create_post_view.ejs', context);
    }
    catch(error) {
        console.log(error);
        req.error=error;
        res.send(`ERROR ${error}`);
        next();
    }
})
router.get ('/:postid/see', async(req,res,next)=>{
    try {
        let founduser = await db.User.findById(req.params.userid);
        console.log(founduser);
        let postid = req.params.postid;
        const foundPost = await db.Post.findById(postid);
        console.log (foundPost);
        context = {post:foundPost, user:founduser};
        res.render('post_show_view.ejs', context);  
    }
    catch(error) {
        console.log(error);
        req.error=error;
        res.send(`ERROR ${error}`);
        next();
    }
})
router.get('/:postid/edit', async(req,res, next)=> {
    try {
        let postid = req.params.postid;
        let userid = req.params.userid;
        const foundUser = await db.User.findById(userid);
        const postToEdit = await db.Post.findById(postid);
        let context = {post:postToEdit,user:foundUser};
        res.render('edit_post_view.ejs', context)
    }
    catch(error) {
        console.log(error);
        req.error=error;
        res.send(`ERROR ${error}`);
        next();
    }
})
router.post('/new', async(req,res, next)=>{
    try {
        const createdPost = await db.Post.create(req.body);
        console.log(createdPost);
        await db.Post.findByIdAndUpdate(createdPost.id,{date: createdPost.createdAt});
        await db.User.findByIdAndUpdate(
            req.params.userid, 
            {$push: {posts: createdPost}},
            {
                new: true,  
                useFindandModify: false
            }
        );
        res.redirect(`/users/${req.params.userid}/posts`);
    }
    catch(error) {
        console.log(error);
        req.error=error;
        res.send(`ERROR ${error}`);
        next();
    }
})
router.delete('/:postid', async(req,res, next)=>{
    try {
        let postid = req.params.postid
        const postToDelete= await db.Post.findByIdAndDelete(postid);
        const refTodDelete = await db.User.updateOne({_id:req.params.userid},{$pull:{posts:postid}});
        console.log (refTodDelete);
        console.log(postToDelete);
        res.redirect(`/users/${req.params.userid}/posts`);
    }
    catch(error) {
        console.log(error);
        req.error=error;
        res.send(`ERROR ${error}`);
        next();
    }
})
router.put('/:postid/edit', async(req,res,next)=>{
    try {
        let userid= req.params.userid;
        let postid = req.params.postid;
        const updatedPost = await db.Post.findByIdAndUpdate(postid,req.body);
        console.log(updatedPost);
        res.redirect(`/users/${userid}/posts/${postid}/see`);
    }
    catch(error) {
        console.log(error);
        req.error=error;
        res.send(`ERROR ${error}`);
        next();
    }
})
module.exports = router