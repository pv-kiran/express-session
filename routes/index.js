var express = require('express');
var router = express.Router();

router.use((req, res, next) => {
  res.set('cache-control', 'no-cache,private,no-store,must-revalidate,max-stale=0,post-check=0,pre-check=0')
  next();
});


const myusername = 'user1'
const mypassword = 'mypassword'

var session;

/* GET home page. */
router.get('/', function(req, res) {
  session=req.session;
  console.log(session);
    if(session.userid){
        res.send("Welcome User <a href=\'/logout'>click to logout</a>");
    }else
   res.render('index');
});


router.post('/user',(req,res) => {
  if(req.body.username == myusername && req.body.password == mypassword){
      session=req.session;
      session.userid=req.body.username;
      console.log(req.session)
      res.send(`Hey there, welcome <a href=\'/logout'>click to logout</a>`);
  }
  else{
      res.render('index' , {message: 'Invalid userid or password' , username: req.body.username , password: req.body.password});
  }
})



router.get('/logout',(req,res) => {
  req.session.destroy();
  res.redirect('/');
});




module.exports = router;
