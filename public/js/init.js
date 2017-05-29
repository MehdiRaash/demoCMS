(function($){
  $(function(){

    $('.button-collapse').sideNav();
    $('.parallax').parallax();

    $('a#login_link').click(function(){
      $('form#loginFrom').submit();
    });
           
    setTimeout(function(){
      $('input').val('');
      $('label').removeClass('active');
      $('input').blur()
    }, 0)
  }); // end of document ready
})(jQuery); // end of jQuery name space