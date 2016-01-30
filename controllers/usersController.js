// AI error statuses
// 200 = the server has responded and all is ok
// 404 = page not found
// 500 = internal error on the server


//.populate explained (sort-of): http://davestewart.io/resources/javascript/jQuery/demos/populate-demo.html
var User = require("../models/user");


function usersIndex(req, res){
  User.find({}, function(err, users) {
    if (err) return res.status(404).send(err);

    res.status(200).send(users);
  });
}

// AI function to create user
function usersCreate(req, res){
  // create user with new instance of User model. Schema is populated by request on body.user
  var user = new User(req.body.user);
  //save user - return error message if failure to save
  user.save(function(err, user) {
    if (err) return res.status(500).send(err);

    res.status(201).send(user)
  })
}

// AI function to show User profile
function usersShow(req, res){
  // select user particular to input URL
  var id = req.params.id;

  // find by ID 
  //populate users comments (corresponding to comments in users model)
  // error check and send user data on success
  User.findById({ _id: id }).populate("comments").exec(function(err, user) {
    //include error messages
    if (err) return res.status(500).send(err);
    if (!user) return res.status(404).send(err);

    // if all ok then send user data
    res.status(200).send(user);
  })
}
//// AI edit profile
//function usersUpdate(req, res) {
//  var id = req.params.id;
//  //mongoose command
//  //Model.findByIdAndUpdate(id, [update], [options], [callback])
//  // {new: true} - cannot claim i understand this part
//  User.findByIdAndUpdate({ _id: id }, req.body.user, {new: true}, function(err, user){
//    if (err) return res.status(500).send(err);
//    if (!user) return res.status(404).send(err);
//    res.status(200).send(user);
//  })
//}
//
//// AI delete their profile
//function usersDelete(req, res){
//  var id = req.params.id;
//  //find by id and remove 
//  User.remove({ _id: id }, function(err) {
//    if (err) return res.status(500).send(err);
//    res.status(200).send()
//  })
//}

// AI: make all actions available in scope
module.exports = {
  usersIndex: usersIndex,
  usersCreate: usersCreate,
  usersShow:   usersShow,
//  usersUpdate: usersUpdate,
//  usersDelete: usersDelete,
};