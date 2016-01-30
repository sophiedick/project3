$(document).ready(function(){
  getUsers();


  // GET ALL USERS

  function getUsers(){
    var ajax = $.get('http://localhost:3000/users')
    .done(function(data){
      console.log(data)
      $.each(data, function(index, user){
        addUser(user);
      });
    });
  }