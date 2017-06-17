(function($){
  $(function(){ 
     
    $('.button-collapse').sideNav();
    $('.parallax').parallax(); 

    $(".deletePost").on('click', function(event){

      event.preventDefault();
      var postId = $(this).data('postid');

      var ajax = $.ajax({
          url: './delete_post',
          type: 'DELETE',
          data: JSON.stringify({ postId: postId }),
          contentType:'application/json;charset=utf-8',
          dataType: 'json',
          beforeSend: function(){
            $('#preloader').addClass('active');
          }
      });

        ajax.done(function( res ) { 
          if(res.state === 1){ 
            Materialize.toast('پست شما ارسال شد.', 4000); 
          }
        });

        ajax.always(function( res ){
          $('#preloader').removeClass('active');
        }); 

    })


        
  }); // end of document ready
})(jQuery); // end of jQuery name space