import path         = require ('path');
import express      = require ('express');
import MD           = require('@molecule-driver/core');

const router	      = express.Router();
let logged        = false;

router.route('/molecule')
  .get((req,res)=>{
    MD.server.get(req.body)
    .then((response)=> res.json(response))
    .catch((response)=> res.json(response))
  })
  .put((req,res)=>{
    MD.server.post(req.body)
    .then((response)=> res.json(response))
    .catch((response)=> res.json(response))
  })
  .post((req,res)=>{
    MD.server.post(req.body)
    .then((response)=> res.json(response))
    .catch((response)=> res.json(response))
  })
  .delete((req,res)=>{
    MD.server.delete(req.body)
    .then((response)=> res.json(response))
    .catch((response)=> res.json(response))
  });

  router.get('/logout', function(req, res){
  	logged = false;
    res.redirect('/');
  });

  router.get('/login', function(req, res){
  	logged = true;
    res.redirect('/');
  });

router.get("*", (req,res)=>{
  if(logged){
    MD.client.app(req,res);
  }else{
    res.render('login');
  }
});

export = router;
