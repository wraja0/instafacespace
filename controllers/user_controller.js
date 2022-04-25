const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/', async (req,res,next)=>{
    try {
        const foundUsers = await db.User.find({})
        const context = {users:foundUsers};
        res.render('index_view.ejs',context);
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})

//Create User post route
router.post('/',async (req,res,next)=>{
    try {
        const createdUser = await db.User.create(req.body);
        console.log(createdUser);
        res.redirect('/users');
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})

//Create user page 
router.get('/create', (req,res,next)=>{
   res.render('create_user_view.ejs');
})

//Edit User page
router.get('/:userid/edit', async (req,res,next)=>{
    try {
        const userToEdit = await db.User.findById(req.params.userid);
        const context = {user:userToEdit};
        res.render('edit_user_view.ejs',context);
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})

//edit user put route
router.put('/:userid',async (req,res,next)=>{
    try {
        const updatedUser = await db.User.findByIdAndUpdate(req.params.userid,req.body)
        console.log(updatedUser);
        res.redirect(`/users/${req.params.userid}`);
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})


//user profile
router.get('/:userid', async (req,res,next)=>{
    try {
        const foundUser =  await db.User.findById(req.params.userid).populate("posts");
        console.log(foundUser.posts)
        console.log(foundUser.id)
        const context = {user:foundUser};
        //console.log(context)
        res.render('user_view.ejs',context);
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})

router.delete('/:userid', async (req,res,next)=>{
    try {
        const userToDelete = await db.User.findByIdAndDelete(req.params.userid);
        res.redirect('/users');
} catch (error) {
        console.log(error);
        req.error = error;
        return next();
}
})

module.exports=router;