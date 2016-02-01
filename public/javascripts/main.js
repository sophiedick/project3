$(document).ready(function(){

//getThreads();
$('.editable').hide();
$('.thread-id').hide();
});

  /* *************************************** */
  /* *********** INDEX PAGE - ************** */
  /* ******** SHOW MOST RECENT TOPIC ******* */

  // $(".index-topics").hover(function(event){
  //   event.preventDefault();
  //   //return
  //   ajaxRequest("get", "http://localhost:3000/api/category", null, );
    
  // });

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

    // Store the original inputs in variables:
    var originalTopic = $('p.thread-topic').html();
    var originalTitle = $('h3.thread-title').html();
    var originalBody  = $('p.thread-body').html();

    // Hiding the original inputs from the view:
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

        // Don't return this because I want to do things afterwards
        return ajaxRequest("put", 'http://localhost:3000/api/category/' + id, formData, showUpdatedThread)

        function showUpdatedThread(data){
          console.log(data)
          $('p.thread-topic').html(data.topic);
          $('h3.thread-title').html(data.title);
          $('p.thread-body').html(data.body); 

          $('.editable').hide();
          $('div.original-thread').show();
          $('p.thread-topic').show().html();
          $('h3.thread-title').show();
          $('p.thread-body').show();
        }


        // This prints out: threadTopic=world&threadTitle=Goodbye+Niall&threadBody=ewefe&threadId=56acbd365b39b94d6362e4a9
        console.log(formData);

        
      //  $('p.thread-topic').html("");
      //  $('h3.thread-title').html("");
      //  $('p.thread-body').html(""); 


        // Hide the editable elements again


      }); 

      // This works - CB.
      $(".cancel").click(function(event){
        event.preventDefault();

        $('.original-thread').show();
        $('p.thread-topic').show();
        $('h3.thread-title').show();
        $('p.thread-body').show();

        // Hide the editable elements again
        $('.editable').hide();
      });   // End of $('.cancel').click
    
  }); // End of edit-thread function
   


  /* **************************************** */
  /* *********** CREATE NEW THREADS ********* */
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
      li.html("Topic: " + thread.topic + "<br>Title: <a href='/" + thread.topic + "/" + thread._id +"'>" + thread.title + "</a><br>Body: " + thread.body + "<br><br>");
      $('ul#threads').prepend(li);
    }); 
  });   // End of $('#submit-new-thread').click()


  /* **************************************** */
  /* ********** DISPLAY ALL THREADS ********* */
  /* **************************************** */

  function getThreads() {
    return ajaxRequest("get", "http://localhost:3000/api/category", null, displayThreads);

  }

  function displayThreads(data) {
    // console.log(data);
    return $.each(data.threads, function(index, thread){
      // console.log(thread);
      $('#threads').prepend("Topic: " + thread.topic + "<br>Title: <a href='/category/" + thread._id + "'>" + thread.title + "</a> <br><br>");
    });
  }

  //************************************ COMMENTS ****************************************************

// Create new comment:

$('#submit-new-comment').click(function(event){
  event.preventDefault();

  // .serialize collects all the data from the form:
  var formData = $('#new-comment').serialize();
  console.log(formData);

  $.ajax({
    type: 'POST',
    url:  'http://localhost:3000/api/category/' + thread._id + '/newcomment',
    data:  formData
  }).done(function(data){
    console.log(data) 
});
});



  /* **************************************** */
  /* ************* AJAX REQUEST ************* */
  /* **************************************** */

  function ajaxRequest(method, url, data, callback) {
   return $.ajax({
     method: method,
     url: url,
     data: data
//     beforeSend: setRequestHeader,
   }).done(function(data){
     if (callback) return callback(data);
   }).fail(function(data) {
    console.log('Fail')
   //  displayErrors(data.responseJSON.message);
   });
  }   // End of function ajaxRequest();

//});