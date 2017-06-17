(function($){
  $(function(){ 
     
    $('.button-collapse').sideNav();
    $('.parallax').parallax(); 

    
    var data = null; 

    var getTags = function(){
      var autocompleteData = {};
      $.each(helperData.serverTagsArr, function(index, value){
        autocompleteData[value] = null;
      });
       
      return autocompleteData;
    };  
    var resetTheForm = function() {
      $("form#post_form")[0].reset();
      $("#selectedTags").empty();
    }
    //Listeners:
    $('input.autocomplete').autocomplete({
      // data: {
      //   "ورزشی": null, 
      //   "اجتمائی": null 
      // },
      data: getTags(),
      limit: 15, // The max amount of results that can be shown at once. Default: Infinity.
      onAutocomplete: function(val) { 

      var ifNotExists = function(val) {
        var notExist = true;
        $("#selectedTags").children('.chip').each(function(){
           if(val === $(this).data('tagname')){
             notExist = false;
           }
        });
        return notExist;
      };
      if(ifNotExists(val)){
        var selectedTags = $("#selectedTags"); 
        var tag = $('<div class="chip" data-tagname=' + val + ' >' + val + '<i class="close material-icons">close</i></div>');
        selectedTags.append(tag);
      } 

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
        
        var getTheTagsObject = function(){
          var arr = [];

          $("#selectedTags").children('.chip').each(function(){   
              arr.push( $(this).data('tagname') ); 
          });
          return {
            name: 'tags',
            value: arr
          };
        }; 
         
        data = data.concat(getTheTagsObject()); 
        
        var ajax = $.ajax({
          method: "POST",
          url: "dashboard/new_post",
          dataType: "json",
          contentType: "application/json;charset=utf-8",  
          data: JSON.stringify(data),
          beforeSend: function(){ 
            $('#progress').removeClass('hide');
            $('#publishButton').text('در حال ارسال').addClass('disabled');
          } 
        });

        ajax.done(function( res ) { 
            if(res.state === 1){
               
                Materialize.toast('پست شما ارسال شد.', 4000);
                resetTheForm();
            }
        });  

        ajax.always(function(){
            $('#progress').addClass('hide');
            $('#publishButton').text('انتشار').removeClass('disabled');
        });

      }
    });
    
  }); // end of document ready
})(jQuery); // end of jQuery name space