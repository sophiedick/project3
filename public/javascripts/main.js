$(document).ready(function(){
//EVENT DELEGATION:
  //getThreads();

  $('.editable').hide();
  $('.thread-id').hide();
  $('body').on('click', '#submit-new-comment', newComment);
  $('body').on('click', '.deleteComment', removeComment);
  $('body').on('click', '.edit-comment-button', editComment);
  $('.row.col-md-10.centered.social-share-links').hide();
  



  /* **************************************** */
  /* ********** GET NEW THREAD FORM ********* */
  /* **************************************** */
  $('a#fetch-new-thread-form-button').click(function(event){
      event.preventDefault();

      $('.get-new-thread-button').slideUp();
      $('.cancel-new-thread-button').fadeIn();
      $( "#form-for-new-thread-section").fadeIn( "slow");

        $(".cancel").click(function(event){
          event.preventDefault();
          $('.cancel-new-thread-button').fadeOut().slideUp();

        //  $('.cancel-new-thread-button').fadeOut().slideUp();    
          setTimeout(cancelNewThread, 500);

          // Hide the editable elements again
          $('.editable').hide();

          function cancelNewThread() {
            $('.get-new-thread-button').fadeIn().slideDown(); 
          }

        });   // End of $('.cancel').click


    });


  /* **************************************** */
  /* *********** CREATE NEW THREADS ********* */
  /* **************************************** */
  $('#submit-new-thread').click(function(event){
    event.preventDefault();
    // .serialize collects all the data from the form:
    //var formData = $('#new-thread').serialize();

    var username = jwt_decode(getToken())._doc.username;
    var userID = jwt_decode(getToken())._doc._id;
    var title = $('#thread-title').val();
    var topic = $('#thread-topic').val();
    var body = $('#thread-body').val();

    var dataToBeSent = {

      title: title,
      topic: topic,
      body: body,
      userID: userID
    }
    console.log(dataToBeSent);

    $.ajax({
      type: 'POST',
      url:  'http://localhost:3000/api/category',
      data:  dataToBeSent,
      beforeSend: setRequestHeader
    }).done(function(thread){

    //  var li = $('<li></li>');
    //  li.html("Topic: " + thread.topic + "<br>Title: <a href='/" + thread.topic + "/" + thread._id +"'>" + thread.title + "</h3><///a><br>Body: " + thread.body + "<br><br>");
    //  $('ul#threads').prepend(li);
       var li = $('<div></div>');
       li.html("<a href='/" + thread.topic + "/" + thread._id +"'><h3>" + thread.title + "</h3></a><i class='fa fa-comments'></i><i>" + moment(thread.updatedAt).fromNow() + "</i> by <b>User</b><hr>");
       $('ul#threads').prepend(li);
      }).fail(function(message){
        var message = message.responseText
        console.log(message);
        $("#error-message").html(message)
    }); 
  });   
  /* **************************************** */
  /* *********** EDIT A COMMENT ************* */
  /* **************************************** */
  //Note: '$(this)' is the <a href=''>EDIT</a> link :(
  // $("a.edit-comment-button").click(function(event){
  //     event.preventDefault();
  //     var threadId = $(this).data("id");
  //     var commentId = $(this).data("comment");
  //     console.log(commentId)
  //     console.log("this parent:")
  //     console.log($(this).parent().children(".thread-comment").html())
  //     // Store the original inputs in variables:
  //     var originalComment  = $('p.thread-comment').html();
  //     console.log("originalComment:"); // This logs the first comment on the page
  //     console.log(originalComment); // This logs the first comment on the page
  //     // Hiding the original inputs from the view:
  //     $('.edit-and-delete-comment').hide();
  //     $('p.thread-comment').hide();
  //     // Show the input fields
  //     $("#" + commentId + "edit").show();
  //     $("input.cancel").show();
  //     $('p.thread-comment').show().val(originalComment);
  //   /* *//* Confirm Edit *//* */
  //   $("input#edit-confirm").click(function(event){
  //     event.preventDefault();
  //     console.log("this is 'this':" + this)
  //     // debugger;
  //     var formData = $("#" + commentId + "edit").serialize();
  //     console.log("This is 'formData': " + formData);
  //     //$("div.edit-comment").slideDown();
  //     $.ajax({
  //       type: 'put',
  //       url:  'http://localhost:3000/api/category/' + threadId + '/comment/' + commentId,
  //       data: formData
  //     }).done(function(data){
  //       console.log("This is data");
  //       console.log(data.body);
  //       $("#" + commentId + "edit").show();
        
  //       // Lovely long-winded way of getting the data.body <3
  //       //$(this).parentsUntil(("#comments")[2]).children('.comments').children('p.thread-comment').html(data.body);
  //       $("#" + commentId).children().children('.thread-comment').html(data.body)
  //       $('.edit-and-delete-comment').show();
  //       // Hide editable forms
  //       $('.editable').hide();
  //     });
  //   });
  //   // This works - CB.
  //     $(".cancel").click(function(event){
  //       event.preventDefault();
  //       $('p.thread-comment').show();
  //       $('.edit-and-delete-comment').show();
  //       // Hide the editable elements again
  //       $('.editable').hide();
  //     });   // End of $('.cancel').click
  // });



/* **************************************** */
/* ********** EDIT CURRENT THREAD ********* */
/* **************************************** */


//Note: '$(this)' is the <a href=''>EDIT</a> link :(

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
    $('.original-thread-meta').hide();

    // Store the original inputs in variables:
    var originalTopic = $('p.thread-topic').html();
    var originalTitle = $('h3.thread-title').html();
    var originalBody  = $('.thread-body p').html();

    // Hiding the original inputs from the view:
    $('.original-thread').hide();
    $('p.thread-topic').hide();
    $('h3.thread-title').hide();
    $('.thread-body p').hide();

    // Show the input fields
    $('.editable').show();
    $('.editable.thread-topic').show().val(originalTopic);
    $('.editable.thread-title').show().val(originalTitle);
    $('.editable.thread-body').show().val(originalBody);
    $('input[type="submit"].editable').show();
    

      $(".save").click(function(event){
        event.preventDefault();

      

        var formData = $('form.edit-thread-form').serialize();

        console.log("formData:")
        console.log(formData)
        // Don't return this because I want to do things afterwards
        return ajaxRequest("put", 'http://localhost:3000/api/category/' + id, formData, showUpdatedThread)

        function showUpdatedThread(data){
          console.log(data)

          $('p.thread-topic').html(data.topic);
          $('h3.thread-title').html(data.title);
          var test = $('.thread-body p').html(data.body); 

          console.log("test:")
          console.log(test)

          $('.editable').hide();
          $('div.original-thread-meta').show();
          $('p.thread-topic').show().html();
          $('h3.thread-title').show();
          $('.thread-body p').show();
        }

        console.log(formData);

      }); 

      // This works - CB.
      $(".cancel").click(function(event){
        event.preventDefault();
        $('.original-thread-meta').show();
        $('p.thread-topic').show();
        $('h3.thread-title').show();
        $('.thread-body p').show();

        // Hide the editable elements again
        $('.editable').hide();
      });   // End of $('.cancel').click
    
  }); // End of edit-thread function





















// NOTE: Tidy this function up when it's working properly - CB.
// NOTE: Any element with the class of editable is hidden until the 'edit' button is clicked
// Edit thread in place:
// $('.edit-thread').click(function(event){
//   event.preventDefault();
//   // Storing the original inputs
//   var id = $(this).data("id");
//   // Store the original inputs in variables:
//   var originalTopic = $('p.thread-topic').html();
//   var originalTitle = $('h3.thread-title').html();
//   var originalBody  = $('p.thread-body').html();
//   // Hiding the original inputs from the view:
//   $('.original-thread').hide();
//   $('p.thread-topic').hide();
//   $('h3.thread-title').hide();
//   $('p.thread-body').hide();
//   // Show the input fields
//   $('form.edit-thread-form.editable').show();
//   $('.editable.thread-topic').show().val(originalTopic);
//   $('.editable.thread-title').show().val(originalTitle);
//   $('.editable.thread-body').show().val(originalBody);
//   $('input[type="submit"].editable').show();
//     $(".save").click(function(event){
//       event.preventDefault();
//       var formData = $('.edit-thread-form').serialize();
//       // Don't return this because I want to do things afterwards
//       return ajaxRequest("put", 'http://localhost:3000/api/category/' + id, formData, showUpdatedThread)
//       function showUpdatedThread(data){
//         console.log(data)
//         $('p.thread-topic').html(data.topic);
//         $('h3.thread-title').html(data.title);
//         $('p.thread-body').html(data.body); 
//         $('.editable').hide();
//         $('div.original-thread').show();
//         $('p.thread-topic').show().html();
//         $('h3.thread-title').show();
//         $('p.thread-body').show();
//       }
//       console.log(formData);
//     }); 
//     // This works - CB.
//     $(".cancel").click(function(event){
//       event.preventDefault();
//       $('.original-thread').show();
//       $('p.thread-topic').show();
//       $('h3.thread-title').show();
//       $('p.thread-body').show();
//       // Hide the editable elements again
//       $('.editable').hide();
//     });   // End of $('.cancel').click
  
// }); // End of edit-thread function

// ************** SOCIAL MEDIA SLIDER ********************


$('.thread-header-date i.fa.fa-share-square-o').click(function(event){
  event.preventDefault();
  console.log('Clicked the <i>!');
  $('.row.col-md-10.centered.social-share-links').slideToggle()
})


 
});// DOCUMENT.READY




/* **************************************** */
/* *********** EDIT A COMMENT ************* */
/* **************************************** */
//Note: '$(this)' is the <a href=''>EDIT</a> link :(
//************************************ COMMENTS ****************************************************
  
  /* **************************************** */
  /* *********** CREATE NEW COMMENT ********* */
  /* **************************************** */
    function newComment(event) {
    event.preventDefault();
    // .serialize collects all the data from the form:
    var username = jwt_decode(getToken())._doc.username;
    var userID = jwt_decode(getToken())._doc._id;
    

    var commentBody = $('#comment-body').val();

    // console.log(formData);
    var threadId = $("#ctid").val();
    // console.log(threadId);
    // console.log(formData);

    var dataToBeSent = {
      theComment: commentBody,
      userID: userID
    }
    console.log(dataToBeSent)

    $.ajax({
      type: 'POST',
      url:  'http://localhost:3000/api/category/' + threadId + '/newcomment',
      data:  dataToBeSent,
      beforeSend: setRequestHeader
    }).done(function(comment){
      console.log(comment.body);
      console.log(comment); 
      var p = $('<div id="'+ comment._id +'" class="comment-block row"></div>');

      p.html('<div class="comments"><div class="col-md-2"><img class="comment-avatar" src="http://cumbrianrun.co.uk/wp-content/uploads/2014/02/default-placeholder-300x300.png"></div><div class="col-md-10"><div class="comment-meta"><p class="comment-author">' + comment.user.username + '</p><form class="delete-comment-form edit-comment-button" action="/api/category/' + threadId + '/comment/' + comment._id + '?method=DELETE" method="post"><button type="submit" data-id="' + comment._id + '" name="thread[topic]" class="delete deleteComment"><i class="fa fa-trash"></i></button></form><a class="button edit-comment-button data-id="' + threadId + '" data-comment="' + comment._id + '" href=""><i class="fa fa-pencil"></i></a></div><p class="thread-comment">' + comment.body + '</p>');
      $('section#comments').append(p);
      $('#comment-body').val("")
   }).fail(function(error){
    console.log(error);
  })
};
  /* **************************************** */
  /* *********** EDIT A COMMENT ************* */
  /* **************************************** */
  function editComment(event) {
      event.preventDefault();
      var threadId = $(this).data("id");
      var commentId = $(this).data("comment");
      //console.log("HELOO")
     
      // Store the original inputs in variables:
      var originalComment  = $("#" + threadId).children('p.thread-comment').html();
      // Hiding the original inputs from the view:
      $("#" + commentId).children('p.thread-comment').hide();
      // Show the input fields
      $("#" + commentId + "edit").show();
      //$('p.thread-comment').show().val(originalComment);
      // Show the input fields
    $("body").on('click', "input#edit-confirm", function(event){
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
        // //$("#" + commentId + "edit").show();
        // //$('p.thread-comment').show().html(data.body);
        // $("#" + commentId).children('p.thread-comment').show().html(data.body);
        
        // // $('p.thread-comment').show().html(data.body);
        $('.editable').hide();
        $("#" + commentId + "comment").html(data.body)
  
        // $("#" + commentId).children('p.thread-comment').html(data.body)

      });    
    });  
  };



  /* **************************************** */
  /* *********** DELETE NEW COMMENT ********* */
  /* **************************************** */
function removeComment(event) {
  event.preventDefault();

  if($(this).parent().parent()[0].id == jwt_decode(getToken())._doc._id){
    console.log('YOU ARE THE AUTHOR, THEREFORE YOU CAN DELETE YOUR POST. YOU\'RE WELCOME')

    var threadId = $("#ctid").val();
    var commentId = $(this).data("id");
    var itemToRemove = $('#' + commentId);
  
    $.ajax({
        url:'http://localhost:3000/api/category/' + threadId + "/comment/" + commentId,
        type:'delete'
    }).done(function() {
        itemToRemove.remove();
    });
    } else {
      console.log("NOOOOO")
    }
    
  }
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




