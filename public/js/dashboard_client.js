(function($){
  $(function(){

    $('.button-collapse').sideNav();
    $('.parallax').parallax(); 
    
    $("#allowToPublish").prop('checked', true) ;

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
  
       
      if ( $( ".required" ).val().length === 0 ) {  
        event.preventDefault();
      } else { 
        event.preventDefault();

        var ajax = $.ajax({
          method: "POST",
          url: "dashboard/new_post",
          dataType: "json",
          data: { data: [{ name: "John"},{ name: "John"}] }
        })

        ajax.done(function( msg ) {
            console.log( "Data Saved: " + msg );
        }); 

        event.preventDefault();
      }
    });

  }); // end of document ready
})(jQuery); // end of jQuery name space