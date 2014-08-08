$(document).ready( function () 
{
    var t = $('#masonry');
    var clicked = false;
    t.masonry({
        itemSelector:        '.layout-card',
        isResizable:        true,
        columnWidth: 1
    })
    
  var isActive = true;
  var resize = "large";

  var items = 50;
  while (items-- > 0){
    if (items == 49){
      $("#masonry").append("<div class='item'>You may have to toggle if you click the first tile!</div>");
    }
    else{
      $("#masonry").append("<div class='layout-card'></div>");
    }  
  }

  
  $( "#toggle-size-xlarge" ).on( "click",   function() {
   resize = "xlarge";
});
  $( "#toggle-size-large" ).on( "click", function() {
   resize = "large";
});
  $( "#toggle-size-medium" ).on( "click", function() {
   resize = "medium";
});
    
    $(".layout-card").on( "click", function() {
        if (!this.clicked){
            $(this).width(420);
            $(this).height(420);
          //$(this).height(358);
            this.clicked = true;
            //item.parent().masonry('reload');
            t.masonry('reload');
        }
        else{
          $(this).width(140);
          $(this).height(80);
            this.clicked = false;
            t.masonry('reload');
        }
    })
        
    t.sortable({
        distance: 12,
        forcePlaceholderSize: true,
        items: '.layout-card',
        placeholder: 'card-sortable-placeholder layout-card',
        tolerance: 'pointer',
        
        start:  function(event, ui) {            
                 console.log(ui); 
            ui.item.addClass('dragging').removeClass('layout-card');
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
                   ui.item.removeClass('dragging').addClass('layout-card');
                   ui.item.parent().masonry('reload');
        }
   });
})