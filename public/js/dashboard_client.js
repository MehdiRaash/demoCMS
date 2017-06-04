(function($){
  $(function(){ 
     

    $('.button-collapse').sideNav();
    $('.parallax').parallax(); 
    
      
    $('input.autocomplete').autocomplete({
      data: {
        "ورزشی": null, 
        "اجتمائی": null 
      },
      limit: 15, // The max amount of results that can be shown at once. Default: Infinity.
      onAutocomplete: function(val) { 
         
       var selectedTags = $("#selectedTags");
        
       var tag = $('<div class="chip">' + val + '<i class="close material-icons">close</i></div>');
       selectedTags.append(tag);


       $('input.autocomplete').val('');

      },
      minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
    });

    $("#post_form").on('submit' , function( event ) {
      event.preventDefault();
       
      if ( $( ".required" ).val().length === 0 ) {  
        
        //show a message
      } else {  

        
        var data = $("form#post_form").serializeArray();   
         console.log(data);
        var ajax = $.ajax({
          method: "POST",
          url: "dashboard/new_post",
          dataType: "json",
          contentType: "application/json;charset=utf-8",  
          data: JSON.stringify(data) 
        });

        ajax.done(function( res ) {
            if(res.state === 1){
              console.log('data ersal shod')
            }
        }); 

      }
    });

  }); // end of document ready
})(jQuery); // end of jQuery name space