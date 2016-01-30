$(document).ready(function(){

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
    return $.each(data, function(index, thread){
      $('ul#threads').prepend()
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