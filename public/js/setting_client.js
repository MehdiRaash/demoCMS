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

    $("a#submit").on('click', function(event){
      event.preventDefault();
      //$("form#post_form")[0].reset();

      var data = $("form#setting_form").serializeArray();  

      var signUpAjax = $.ajax({
          method: "POST",
          url: "./setting/submit",
          dataType: "json",
          contentType: "application/json;charset=utf-8",  
          data: JSON.stringify(data), 
          beforeSend: function(){  
            $('#preloader').addClass('active');
          } 
        });

      signUpAjax.done(function( res ) { 
         Materialize.toast('تغییرات ذخیره شد.', 4000);
      });

      signUpAjax.always(function( res ){
        $('#preloader').removeClass('active');
      }); 
    })
  }); // end of document ready
})(jQuery); // end of jQuery name space