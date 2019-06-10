var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    const fs = require('fs');
    const login = req.query['login'];
    console.log(login);

    fs.readFile(login+'.json', (err, data) => {
        if (err){
            var obj = {
                login:login,
                notes: []
            };
            fs.writeFile(login+'.json',JSON.stringify(obj),(err, data) => {
                if (err) throw err;
                res.render('user', { user: obj});
            });
        }else{
            let user = JSON.parse(data);
            res.render('user',{ user: user});
        }
    });
});

router.post('/', function(req, res, next) {
    const fs = require('fs');
    const login = req.body.login;
    const noteText= req.body.note;
    const remove=req.body.remove;

    fs.readFile(login+'.json', (err, data) => {
      let user = JSON.parse(data);
      if(remove<0){
          var note = {
              text: noteText,
              date:new Date()
          };
          user.notes.push(note);
      }else{
          user.notes.splice(remove,1);
      }
      fs.writeFile(login+'.json',JSON.stringify(user),(err, data) => {
        if (err) throw err;
        res.redirect('/users?login='+user.login);
      });
    });
});

module.exports = router;
