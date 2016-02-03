$(document).ready(function(){

  //getThreads();
  $('.editable').hide();
  $('.thread-id').hide();
  $('#submit-new-comment').click(newComment);
//$('div.edit-comment').hide();

  /* **************************************** */
  /* *********** CREATE NEW THREADS ********* */
  /* **************************************** */

  $('#submit-new-thread').click(function(event){
    event.preventDefault();
    console.log("CLick!")

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
  /* *********** EDIT A COMMENT ************* */
  /* **************************************** */

  $("a.edit-comment-button").click(function(event){
      event.preventDefault();
      var threadId = $(this).data("id");
      var commentId = $(this).data("comment");
      //console.log("HELOO")
     

      // Store the original inputs in variables:
      var originalComment  = $('p.thread-comment').html();

      // Hiding the original inputs from the view:
      $('p.thread-comment').hide();

      // Show the input fields
      $("#" + commentId + "edit").show();
      //$('p.thread-comment').show().val(originalComment);

      // Show the input fields


    $("input#edit-confirm").click(function(event){
      event.preventDefault();
      var formData = $("#" + commentId + "edit").serialize();
      console.log("This is formData:" +formData);
      //debugger;

      //$("div.edit-comment").slideDown();
      $.ajax({
        type: 'put',
        url:  'http://localhost:3000/api/category/' + threadId + '/comment/' + commentId,
        data: formData
      }).done(function(data){
        console.log(data);

        $("#" + commentId + "edit").show();
        $('p.thread-comment').show().html(data.body);


        // $('p.thread-comment').show().html(data.body);
        $('.editable').hide();
      });
    });
  })



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

      console.log(formData);

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
 



});// DOCUMENT.READY


//************************************ COMMENTS ****************************************************

  /* **************************************** */
  /* *********** CREATE NEW COMMENT ********* */
  /* **************************************** */


    function newComment(event) {
    event.preventDefault();
    // .serialize collects all the data from the form:
    var formData = $('#new-comment').serialize();
    console.log(formData);
    var threadId = $("#ctid").val();
    console.log(threadId);

    $.ajax({
      type: 'POST',
      url:  'http://localhost:3000/api/category/' + threadId + '/newcomment',
      data:  formData
    }).done(function(comment){
      console.log(comment.body);
      // console.log("HI"); 
      var p = $('<div><p></p>/div>');
      p.html("&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <b>Comment:</b><br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; " + comment.body + "&nbsp; &nbsp; <a href='http://localhost:3000/api/category/" + threadId + "/comment/" + comment._id + "'>EDIT</a>"+ "<br><br>");
      $('section#comments').append(p);
      $('#comment-body').val("")

   }).fail(function(error){
    console.log(error);
  })
  };


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
  /* ********** DISPLAY ALL THREADS ********* */
  /* **************************************** */

  function getThreads() {
    return ajaxRequest("get", "http://localhost:3000/api/category", null, displayThreads);

  }

  function displayThreads(data) {
    // console.log(data);
    return $.each(data.threads, function(index, thread){
      // console.log(thread);
      $('#threads').prepend("Topic: " + thread.topic + "<br>Title: <a href='/category/" + thread._id + "'>" + thread.title + "</a><br><br>");
    });
  }




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


