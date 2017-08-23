// = INIT
const express       = require ('express');
const fs            = require ('fs');
const router	      = express.Router();
const path          = require ('path');
const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const multer = require('multer');
const upload = multer({ dest: 'uploads/tmp' })
const pdStatic = require('../custom_modules/pd.jsonp');
const s3module = require("../custom_modules/amazons3");
const s3 = new s3module();

const User = require('../models/user');


// = LOAD CONTROLLERS
const c = {
  sites : require("../controllers/sites"),
  external : require("../controllers/external"),
  amazons3 : require("../controllers/amazons3"),
  molecule : require("../controllers/molecule")
};

const bouncer = (req,res)=>{
  return new Promise((resolve,reject)=>{
    if(req.isAuthenticated()){
      resolve(req,res);
    }else{
      reject(req,res);
    }
  })
}

const rejectAccess = (req,res)=>{
  res.redirect('/login');
}

const rejectEndpoint = (req,res)=>{
  res.status(403);
  return res.json({error : "User not allowed"});
}

// = SET ROUTES

/*
==============================
= ----------------------------
=            GET
= ----------------------------
==============================
*/

router.get('/get/config/:domain',(req,res)=>{
  let fileSystem = s3.dataBucket.fs;
  let filesLocation = "/config/";
  fileSystem.readFile(path.join(filesLocation,req.params.domain+".json"),"utf-8",(err,data)=>{
    let response;
    try{
      response = JSON.parse(data);
    }catch(e){
      console.log(e);
    }
    if(response){
      res.json(response);
    }else{
      res.status(404);
      res.json({"error":err});
    }
  });
})

router.get('/demo-site/:domain/:page',(req,res)=>{
  let fileSystem = s3.dataBucket.fs;
  let filesLocation = "/config/";
  fileSystem.readFile(path.join(filesLocation,req.params.domain+".json"),"utf-8",(err,data)=>{
    let locals;
    try{
      locals = JSON.parse(data);
    }catch(e){
      console.log(e);
    }
    if(locals){
      pdStatic.get("venue/"+locals.venue_info.general_info.venue.id+"/events.json",(events)=>{
        let i = 0;
        let fillUpcomingEvents = (obj)=>{
            if(Array.isArray(obj)){
              return obj.map(el=>fillUpcomingEvents(el));
            }else if(typeof obj == "object" && obj){
              Object.keys(obj).forEach(key=>{
                if(key === "use_item_type" && obj[key].indexOf('Upcoming') > -1){
                  let item = events[i];
                  obj.use_information_from = (i >= events.length-1) ? events[events.length-1] : events[i];
                  obj.tmp = {
                    media : "//flyerdriver.com/flyer/squared/320/"+item.dataType+"/"+item.id+".png",
                    title : item.title,
                    additional_text : item.short_description || "",
                    buttons : [
                      {label : "BUY TICKETS", url : "//ticketdriver.com/"+item.get_friendly_id+"/buy/tickets/event/"+item.id},
                      {label : "RESERVE VIP", url : "//ticketdriver.com/"+item.get_friendly_id+"/apps/web/reservation?event="+item.id }
                    ]
                  }
                  i++;
                }else{
                  obj[key] = fillUpcomingEvents(obj[key]);
                }
              });
            }
            return obj;
        }

        locals = fillUpcomingEvents(locals);
        locals._domain = req.params.domain;
        locals._page = req.params.page;
        res.render('./demo-site/'+req.params.page, locals );
      })
    }else{
      res.status(404);
      res.send(404);
    }
  });
});


router.get("/site/list", (req,res)=>{
  // console.log("Requesting Site List")
  c.sites.checkUser(req,res, (isAuth)=> {
    // console.log("User Authenticated:",isAuth);
    if(isAuth){
       c.sites.getSiteList(req,res);
    }else{
      res.json({'message' : "Invalid User"});
    }
  });
});

router.get( "/site/:site_domain" ,(req,res)=>{
  c.sites.checkUser(req,res, (isAuth)=> {
    if(isAuth){
      res.render("index");
    }else{
      res.redirect('/login');
    }
  });
});

router.get("/login", (req,res)=>{
  res.render("login");
});


passport.use(new LocalStrategy(
  function(username, password, done) {
   User.getUserByUsername(username, function(err, user){
   	if(err) throw err;
   	if(!user){
   		return done(null, false, {message: 'Unknown User'});
   	}

   	User.comparePassword(password, user.password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
   			return done(null, user);
   		} else {
   			return done(null, false, {message: 'Invalid password'});
   		}
   	});
   });
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});



























/*
==============================
 MOLECULE
==============================
*/

router.get("/:type/get/:typeName",(req,res)=>{
  bouncer(req,res).then(()=>{
    c.molecule.get(req.params.type,req.params.typeName).then((data)=>{
      res.status(200);
      return res.json(data);
    }).catch((error)=>{
      res.status(400);
      return res.json(error);
    });

  }).catch((error)=> rejectEndpoint(error));
})











































router.get('/logout', function(req, res){
	req.logout();
  req.session.destroy();
	res.redirect('/');
});


router.get( "/:pagename" ,(req,res)=>{
  c.sites.checkUser(req,res, (isAuth)=> {
    if(isAuth){
      res.render("index");
    }else{
      res.redirect('/login');
    }
  });
});





/*
==============================
= ----------------------------
=            POST
= ----------------------------
==============================
*/

/*
==============================
 S3 BUCKET
==============================
*/

router.post( "/media/s3/list" , (req,res)=>{
  c.sites.checkUser(req,res, (isAuth)=> {
    if(isAuth){
      c.amazons3.list(req.body.path).then((data)=>{
        res.json(data);
      })
    }else{
      res.status(403);
      res.json({error : "User not allowed"});
    }
  });
});

router.post( "/media/s3/add/folder" , (req,res)=>{
  c.sites.checkUser(req,res, (isAuth)=> {
    if(isAuth){
      c.amazons3.addFolder(req.body.path).then((err)=>{
        res.json(err);
      })
    }else{
      res.status(403);
      res.json({error : "User not allowed"});
    }
  });
});

router.post( "/media/s3/add/file" , upload.single('_file') , (req,res)=>{
  c.sites.checkUser(req,res, (isAuth)=> {
    if(isAuth){
      c.amazons3.addFile(req.body._folder,req.file).then((data)=>{
        res.json(data);
      })
    }else{
      res.status(403);
      res.json({error : "User not allowed"});
    }
  });
});

router.post( "/media/s3/remove" , (req,res)=>{
  c.sites.checkUser(req,res, (isAuth)=> {
    if(isAuth){
      c.amazons3.remove(req.body.path).then((err)=>{
        res.json(err);
      })
    }else{
      res.status(403);
      res.json({error : "User not allowed"});
    }
  });
});


























/*
==============================
 MOLECULE
==============================
*/



router.post("/molecule/get",upload.single("_file"),(req,res)=>{
  bouncer(req,res).then(()=>{
    console.log("/molecule/get",req.body);
    c.molecule.get(req.body).then((data)=>{
      res.status(200);
      return res.json(data);
    }).catch((error)=>{
      res.status(400);
      return res.json(error);
    });

  }).catch((error)=> rejectEndpoint(error));
})


router.post("/molecule/save",upload.single("_file"),(req,res)=>{
  bouncer(req,res).then(()=>{
    c.molecule.save(req.body).then((success)=>{
      res.status(200);
      return res.json({message : "Success! Data saved"});
    }).catch((error)=>{
      res.status(400);
      return res.json(error);
    });

  }).catch((error)=> rejectEndpoint(error));
})

router.post("/molecule/remove",upload.single("_file"),(req,res)=>{
  console.log("/molecule/remove",req.body);
  bouncer(req,res).then(()=>{
    c.molecule.remove(req.body).then((success)=>{
      res.status(200);
      return res.json({message : "Success! Data removed"});
    }).catch((error)=>{
      res.status(400);
      return res.json(error);
    });
  }).catch((error)=> rejectEndpoint(error));
})








































/*
==============================
 SITE
==============================
*/

router.post( "/site/save" , upload.single('_file') , (req,res)=>{
  req.body = Object.assign({},req.body);
  c.sites.checkUser(req,res, (isAuth)=> {
    if(isAuth){
      req.body._child = JSON.parse(req.body._child);
      req.body._folder = req.body._domain;
      c.sites.save(req,res);
    }else{
      res.status(403);
      res.json({error : "User not allowed"});
    }
  });
});


router.post( "/upload/file" , upload.single('_file') , (req,res)=>{
  c.sites.checkUser(req,res, (isAuth)=> {
    if(isAuth){
      c.external.uploadFile(req,res,(url)=>{
        res.json({"url":url});
      });
    }else{
      res.status(403);
      res.json({error : "User not allowed"});
    }
  });
});


/*
==============================
 USER
==============================
*/

router.post( "/user/role" , (req,res)=>{
  c.sites.checkUser(req,res, (isAuth)=> {
    if(isAuth){
      res.json({role : req.user.role});
    }else{
      res.status(403);
      res.json({error : "User not allowed"});
    }
  });
});

router.post('/login', passport.authenticate('local', {successRedirect:'/', failureRedirect:'/login',failureFlash: false}),
  (req, res)=>{ res.redirect('/'); }
);
// Register User
router.post('/register', (req, res)=>{
  c.sites.checkUser(req,res, (isAuth)=> {
    if(isAuth){

    	let name = req.body.name;
    	let email = req.body.email;
    	let username = req.body.username;
    	let password = req.body.password;
    	let password2 = req.body.password2;
    	let role = req.body.role;

      console.log("HEADERS:",req.headers);

      console.log("BODY:",req.body);

    	// Validation
    	req.checkBody('name', 'Name is required').notEmpty();
    	req.checkBody('email', 'Email is required').notEmpty();
    	req.checkBody('email', 'Email is not valid').isEmail();
    	req.checkBody('username', 'Username is required').notEmpty();
    	req.checkBody('password', 'Password is required').notEmpty();
    	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
    	req.checkBody('role', 'Role is required').notEmpty();

    	let errors = req.validationErrors();

    	if(errors){
    		res.json({"message" : 'Error!', errors : errors});
    	} else {
    		let newUser = new User({
    			name: name,
    			email: email,
    			username: username,
    			password: password,
    			role: role
    		});

        let blablaNewUser = {};

    		User.createUser(newUser, function(err, user){
    			if(err) throw err;
    			console.log(user);
          blablaNewUser = user;
    		});


    		res.json({"message" : 'You are registered and can now login' , "user" : blablaNewUser});
    	}
    }else{
      res.json({ "message" : "Not allowed." });
    }
  })
});


// = DEFAUL ROUTES
router.get("*",(req,res)=>{
  c.sites.checkUser(req,res, (isAuth)=> {
    if(isAuth){
      res.render("index");
    }else{
      res.redirect('/login');
    }
  });
});






// = EXPORT ROUTES
module.exports = router;
