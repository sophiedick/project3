$(init);

//"submit-login-info" and "submit-new-user"

function init(){
  //alert("hello")
  $("#signup-form").on("submit", submitAuthForm);
  $("#login-form").on("submit", submitAuthForm);
  $(".logout-link").on("click", logout);
  //$(".users-link").on("click", users);
  $(".login-link, .register-link, .users-link").on("click", showPage);
  hideErrors();
  checkLoginState();  
}

function checkLoginState(){
  if (getToken()) { // expecting either truthy or falsey -undefined returns FALSE
    return loggedInState();
  } else {
    return loggedOutState();
  }
}

function showPage() {
  //event.preventDefault();
  var linkClass = $(this).attr("class").split("-")[0] // changes a class named logged-in to loggedin
  // register-link and logged-out
  $("section").hide();          // this is hiding all topics on homepage when register clicked
  hideErrors();
  return $("#" + linkClass).show(); // gives id prefix to linkClass eg #loggedin and calls .show on this
}

function submitAuthForm(){
  event.preventDefault();
  console.log("submitform function called")
  var method = $(this).attr("method");
  var url    = "http://localhost:3000" + $(this).attr("action");
  // going to /register
  var data   = $(this).serialize();
  console.log(data)

  return ajaxRequest(method, url, data, authenticationSuccessful);
}

//function users(){
//  event.preventDefault();
//  return getUsers();
//}

function logout(){
  event.preventDefault();
  removeToken();
  return loggedOutState();
}

//function getUsers(){
//  return ajaxRequest("get", "http://localhost:3000/users", null, displayUsers)
//}

//function displayUsers(data){
//  hideErrors();
//  hideUsers();
//  return $.each(data.users, function(index, user) {
//    $(".users").prepend('<div class="media">' +
//                          '<div class="media-left">' +
//                            '<a href="#">' +
//                              '<img class="media-object" src="' + user.local.image +'">' +
//                            '</a>' +
//                          '</div>' +
//                          '<div class="media-body">' +
//                            '<h4 class="media-heading">@' + user.local.username + '</h4>' +
//                            '<p>' + user.local.fullname + '</p>'+
//                          '</div>' +
//                        '</div>');
//  });
//}

function hideUsers(){
  return $(".users").empty();
}

function hideErrors(){
  return $(".alert").removeClass("show").addClass("hide");
}

function displayErrors(data){
  return $(".alert").text(data).removeClass("hide").addClass("show");
}

function loggedInState(){
  console.log("logged in")
  var current_user_email = jwt_decode(getToken())._doc.email
  var current_user_id    = jwt_decode(getToken())._doc._id
  $("#current_user_email").html(current_user_email);
  $("a#current_user_email").attr("href","/users/" + current_user_id);
  $(" .logged-out").hide();
  $("#users, .logged-in").show();
  //return getUsers();
}

function loggedOutState(){
  console.log("logged out")
  $(".logged-in").hide();
  $("#register, .logged-out").show();
  // return hideUsers(); 
}

function authenticationSuccessful(data) {
  if (data.token) setToken(data.token);
  checkLoginState();
  // on client side redirect when authenticated ie logged in!
  window.location.href = "/"
}

function setToken(token) {
  return localStorage.setItem("token", token)
}

function getToken() {     
  return localStorage.getItem("token"); //search in local storage to see if there is a token
}

function removeToken() {
  return localStorage.clear();
}

function setRequestHeader(xhr, settings) {
  var token = getToken();
  if (token) return xhr.setRequestHeader('Authorization','Bearer ' + token);
}

function ajaxRequest(method, url, data, callback) {
  return $.ajax({
    method: method,
    url: url,
    data: data,
    beforeSend: setRequestHeader,
  }).done(function(data){
    console.log(data)
    if (callback) return callback(data);
  }).fail(function(data) {
    console.log(data)
    console.log("error");
    //displayErrors(data.responseJSON.message);
  });
}