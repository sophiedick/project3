$(document).ready(function(){
  getUsers();

/////////////////////////////////////////////
$(init);

  function init(){
    $("form").on("submit", submitForm);
    $(".logout-link").on("click", logout);
    $(".users-link").on("click", users);
    $(".login-link, .register-link, .users-link").on("click", showPage);
    hideErrors();
    checkLoginState();  
  }

  function checkLoginState(){
    if (getToken()) {
      return loggedInState();
    } else {
      return loggedOutState();
    }
  }

  function showPage() {
    event.preventDefault();
    var linkClass = $(this).attr("class").split("-")[0]
    $("section").hide();
    hideErrors();
    return $("#" + linkClass).show();
  }

  function submitForm(){
    event.preventDefault();

    var method = $(this).attr("method");
    var url    = "http://localhost:3000/api" + $(this).attr("action");
    var data   = $(this).serialize();

    return ajaxRequest(method, url, data, authenticationSuccessful);
  }

  function users(){
    event.preventDefault();
    return getUsers();
  }



  function logout(){
    event.preventDefault();
    removeToken();
    return loggedOutState();
  }


  function getUsers(){
    return ajaxRequest("get", "http://localhost:3000/api/users", null, displayUsers)
  }


  function displayUsers(data){
    hideErrors();
    hideUsers();
    return $.each(data.users, function(index, user) {
      $(".users").prepend('<div class="media">' +
                            '<div class="media-left">' +
                              '<a href="#">' +
                                '<img class="media-object" src="' + user.local.image +'">' +
                              '</a>' +
                            '</div>' +
                            '<div class="media-body">' +
                              '<h4 class="media-heading">@' + user.local.username + '</h4>' +
                              '<p>' + user.local.fullname + '</p>'+
                            '</div>' +
                          '</div>');
    });
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
    $("section, .logged-out").hide();
    $("#users, .logged-in").show();
    return getUsers();
  }

  function loggedOutState(){
    $("section, .logged-in").hide();
    $("#register, .logged-out").show();
    return hideUsers();
  }

  function authenticationSuccessful(data) {
    if (data.token) setToken(data.token);
    return checkLoginState();
  }

  function setToken(token) {
    return localStorage.setItem("token", token)
  }

  function getToken() {
    return localStorage.getItem("token");
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
      if (callback) return callback(data);
    }).fail(function(data) {
      displayErrors(data.responseJSON.message);
    });
  }


///////////////////////////////////////////////////////////////////////////////////////////////







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

console.log("This is the console logging");
getThreads();

  /* **************************************** */
  /* *********** CREATE ALL THREADS ********* */
  /* **************************************** */

  $('#submit-new-thread').click(function(event){
    event.preventDefault();

    // .serialize collects all the data from the form:
    var formData = $('#new-thread').serialize();
    console.log(formData);

    $.ajax({
      type: 'POST',
      url:  'http://localhost:3000/api/category',
      data:  formData
    }).done(function(thread){
      console.log(thread);
      var li = $('<li></li>');
      li.html("Topic: " + thread.topic + "<br>Title: " + thread.title + "<br>Body: " + thread.body + "<br><br>");
      $('ul#threads').prepend(li);
    }); 


  });   // End of $('#submit-new-thread').click()



  /* **************************************** */
  /* ********** DISPLAY ALL THREADS ********* */
  /* **************************************** */

  function getThreads() {
    console.log("Hellooooo");
    return ajaxRequest("get", "http://localhost:3000/api/category", null, displayThreads);

  }

  function displayThreads(data) {
    console.log("This is display threads")
    return $.each(data.threads, function(index, thread){
      console.log(thread.title);
      $('#threads').prepend("Topic: " + thread.topic + "<br>Title: " + thread.title + "<br><br>");
    });
  }

  /* **************************************** */
  /* ************* AJAX RESQUEST ************ */
  /* **************************************** */

  function ajaxRequest(method, url, data, callback) {
   return $.ajax({
     method: method,
     url: url,
     data: data,
//     beforeSend: setRequestHeader,
   }).done(function(data){
     if (callback) return callback(data);
   }).fail(function(data) {
    console.log('Fail')
   //  displayErrors(data.responseJSON.message);
   });
  }   // End of function ajaxRequest();


});
