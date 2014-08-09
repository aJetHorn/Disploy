$(document).ready( function () 
{
    var t = $('#masonry');
    var clicked = false;

    t.masonry({
        itemSelector:        '.display',
        isResizable:        true,
        columnWidth: 1
    })
    
  var isActive = true;
  var resize = "large";

  var items = 30;
  while (items-- > 0){
      $("#masonry").append("<div class='display'></div>");
        t.masonry('reload');
  }

  $( "#toggle-interactivity" ).on( "click",   function() {
   $( "iframe" ).toggleClass( "manipulate" );
   $( ".display" ).toggleClass( "moveCursor" );
});

  

  //$(".display").children().addBack().off();

$( "#reload-masonry" ).on( "click",   function() {
   t.masonry('reload');
});
  
$( "#toggle-size-xlarge" ).on( "click",   function() {
   resize = "xlarge";
});

  $( "#toggle-size-large" ).on( "click", function() {
   resize = "large";
});

  $( "#toggle-size-medium" ).on( "click", function() {
   resize = "medium";
});
    
    $(".display").on( "click", function() {

      if (($(this).width() === 800
        && resize == "xlarge") || ($(this).width() === 600
        && resize == "large") || $(this).width() === 400
        && resize == "medium"){
          $(this).width(200);
          $(this).height(200);
    }
    else if (resize == "xlarge"){
          $(this).width(800);
          $(this).height(800);
    }
     else if (resize == "large"){
          $(this).width(600);
          $(this).height(600);
    }
      else if (resize == "medium"){
          $(this).width(400);
          $(this).height(400);
    }
    t.masonry('reload');





        // if (!this.clicked){
        //     $(this).width(420);
        //     $(this).height(420);
        //   //$(this).height(358);
        //     this.clicked = true;
        //     //item.parent().masonry('reload');
        //     t.masonry('reload');
        // }
        // else{
        //   $(this).width(140);
        //   $(this).height(80);
        //     this.clicked = false;
        //     t.masonry('reload');
        // }
    })
        
    t.sortable({
        distance: 12,
        forcePlaceholderSize: true,
        items: '.display',
        placeholder: 'card-sortable-placeholder display',
        tolerance: 'pointer',
        
        start:  function(event, ui) {            
                 console.log(ui); 
            ui.item.addClass('dragging').removeClass('display');
            if ( ui.item.hasClass('bigun') ) {
                 ui.placeholder.addClass('bigun');
                 }
             $(".card-sortable-placeholder").width(ui.item.width());
    $(".card-sortable-placeholder").height(ui.item.height());
                   ui.item.parent().masonry('reload')
                },
        change: function(event, ui) {
                   ui.item.parent().masonry('reload');
                },
        stop:   function(event, ui) { 
                   ui.item.removeClass('dragging').addClass('display');
                   ui.item.parent().masonry('reload');
        }
   });
})