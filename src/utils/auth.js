// router.js
const express = require('express');
const router = express.Router();
const configurePassport = require("./passport");
const passport = configurePassport();
const schema=require("./schema")
let user;
router.use(passport.initialize());
const mongo=require("mongoose")
const google= mongo.model("google_user",schema.schema5)
const google_owner=mongo.model("google_owner",schema.schema5) 
router.get('/auth/google-login', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google-login-owner',(req,res)=>{
  console.log("okhaiji")
  res.redirect("/auth/google-owner/callback")
});

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/dashboard_google');
});
router.get('/auth/google-owner/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/dashboard_google_owner');
});
router.get('/dashboard_google', async(req, res) => {
  // Check if user is authenticated
    // User is authenticated, access user profile from session
    const userProfile = req.session.passport.user;
    // Access profile information
    const { id, displayName, emails } = userProfile;
    user ={id:id,name:displayName,email:emails[0].value}
    console.log('Google ID:', id);
    console.log('Display Name:', displayName);
    console.log('Email:', emails[0].value);
    res.redirect(`http://localhost:3000/dashboard_google?name=${user.name}`)
    console.log(user,"ihodr")
    const field=await google.find({email:emails[0].value,name:displayName})
    if(field.length==0){
    await new google({email:emails[0].value,name:displayName}).save()
    }
    // Render dashboard or any other action
});

router.get('/dashboard_google_owner', async(req, res) => {
  // Check if user is authenticated
    // User is authenticated, access user profile from session
    const userProfile = req.session.passport.user;
    // Access profile information
    const { id, displayName, emails } = userProfile;
    user ={id:id,name:displayName,email:emails[0].value}
    console.log('Google ID:', id);
    console.log('Display Name:', displayName);
    console.log('Email:', emails[0].value);
    res.redirect(`http://localhost:3000/dashboard_owner?name=${user.name}`)
    console.log(user,"ihodr")
    const field=await google_owner.find({email:emails[0].value,name:displayName})
    if(field.length==0){
    await new google_owner({email:emails[0].value,name:displayName}).save()
    }
    // Render dashboard or any other action
});
module.exports = router;

