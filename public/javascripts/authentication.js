$(init);
//"submit-login-info" and "submit-new-user"
function init(){
  //alert("hello")
  $("#signup-form").on("submit", submitAuthForm);
  $("#login-form").on("submit", submitAuthForm);
  $(".logout-link").on("click", logout);
  //$(".users-link").on("click", users);
  $(".login-link, .register-link, .users-link").on("click", showPage);
  $("#delete-user-account").on("click", deleteuser);
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
  var url    = "https://the-4rum.herokuapp.com/" + $(this).attr("action");
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

function deleteuser(){
 removeToken();
 return loggedOutState();
}

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
  var current_user_email    = jwt_decode(getToken())._doc.username;
  var current_user_id       = jwt_decode(getToken())._doc._id;
  var current_user_avatar   = jwt_decode(getToken())._doc.avatar;

  $("#current_user_email").html(current_user_email);
  $("a#current_user_email").attr("href","/users/" + current_user_id);
  $("#current_user_avatar").attr("src", current_user_avatar);
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
  window.location.pathname = "/"
}
function setToken(token) {
  return localStorage.setItem("token", token);
}
function getToken() {     
  return localStorage.getItem("token"); //search in local storage to see if there is a token
}
function removeToken() {
  localStorage.clear();
  window.location.href ="/"
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