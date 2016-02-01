$(document).ready(function(){

console.log("This is the console logging");
getThreads();


// This is just so I don't keep accidentally deleting my thread! - CB
$("button.delete").click(function(event){
  event.preventDefault();
});




  $('.editable').hide();
  $('.thread-id').hide();

  /* *************************************** */
  /* *********** INDEX PAGE - ************** */
  /* ******** SHOW MOST RECENT TOPIC ******* */

  $(".index-topics").hover(function(event){
    event.preventDefault();
    //return
    ajaxRequest("get", "http://localhost:3000/api/category", null, mostRecentThread);
    
  });

  /* ************************************** */
  /* *********** INDEX PAGE - ************* */
  /* ******** GET MOST RECENT TOPIC ******* */

  function mostRecentTopic(data){
    var topicsArray = ["tech", "business", "showbiz", "culture", "lifestyle", "world"];

    return $.each(data.threads, function(index, thread){
      console.log(thread);
      $('#tech').prepend("Topic: " + thread.topic + "<br>Title: " + thread.title + "<br><br>");
    })
  }

  /* **************************************** */
  /* ********** EDIT CURRENT THREAD ********* */
  /* **************************************** */

  // NOTE: Tidy this function up when it's working properly - CB.

  // NOTE: Any element with the class of editable is hidden until the 'edit' button is clicked

  // Edit thread in place:
  $('.edit-thread').click(function(event){
    event.preventDefault();
    // Storing the original inputs
    var id = $(this).data("id");

    console.log("This is the new id that works:")
    console.log(id);
    console.log("****")

    var originalTopic =  $('p.thread-topic').html();
    var originalTitle =  $('h3.thread-title').html();
    var originalBody  =  $('p.thread-body').html();
    // console.log("************")
    // console.log(originalTopic)
    // console.log(originalTitle)
    // console.log(originalBody)
    // console.log("************")

    // Hiding the original inputs:

    $('.original-thread').hide();
    $('p.thread-topic').hide();
    $('h3.thread-title').hide();
    $('p.thread-body').hide();

    // Show the input fields
    $('form.editable').show();
    $('.editable.thread-topic').show().val(originalTopic);
    $('.editable.thread-title').show().val(originalTitle);
    $('.editable.thread-body').show().val(originalBody);
    $('input[type="submit"].editable').show();


      $(".save").click(function(event){
        event.preventDefault();
        var formData = $('.edit-thread-form').serialize();
        
        console.log("This is formData in the save function:")
        console.log(id)

        return $.ajax({
          method: "put",
          url: 'http://localhost:3000/api/category/' + id,
          data: formData,
          // beforeSend: setRequestHeader,
        }).done(function(data){
          if (callback) return callback(data);
        }).fail(function(data) {
         console.log('Fail')
         //  displayErrors(data.responseJSON.message);
         });
      }); 


      // This works - CB.
      $(".cancel").click(function(event){
        event.preventDefault();

        $('.original-thread').show();
        $('p.thread-topic').show();
        $('h3.thread-title').show();
        $('p.thread-body').show();

        $('.editable').hide();

      });



    
  }); // End of edit-thread function
   


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
    // console.log(data);
    return $.each(data.threads, function(index, thread){
      // console.log(thread);
      $('#threads').prepend("Topic: " + thread.topic + "<br>Title: " + thread.title + "<br><br>");
    });
  }


  /* **************************************** */
  /* ************* AJAX REQUEST ************* */
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