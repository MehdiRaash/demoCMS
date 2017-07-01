(function($){
  $(function(){

    $('.button-collapse').sideNav();
    $('.parallax').parallax();
    Materialize.updateTextFields();


    setTimeout(function(){
      $('input').val('');
      $('label').removeClass('active');
      $('input').blur()
    }, 0);

    $("button#signup_submit").on('click', function(event){
      event.preventDefault();

      var data = $("form#signup_form").serializeArray();  
     
      var signUpAjax = $.ajax({
          method: "POST",
          url: "./signup/submit_ajax",
          dataType: "json",
          contentType: "application/json;charset=utf-8",  
          data: JSON.stringify(data),
          beforeSend: function(){  
            $('#preloader').addClass('active');
          } 
        });

      signUpAjax.done(function( res ) {
        var $errorList = $('#errorList');
        var $errorContainer = $('#errorContainer');
         
        if(res.signUpDone){
          $("form#signup_form").remove();
          $("#success").removeClass('hide');
        }else{
          $.each(res.errors, function(index, val){
            var p = $('<p class="red-text text-lighten-2 right-align"></p>').text(" - " + val);
            $errorContainer.append(p);
          });  
          $errorList.removeClass('hide');

        }
      });

      signUpAjax.always(function( res ){
        $('#preloader').removeClass('active');
      }); 
    })
  }); // end of document ready
})(jQuery); // end of jQuery name space