$( function() {

	var container = document.querySelector('#grid');
  
  var grid = $('#grid').packery();
  var idNumber = 6;


  bindDragabillyToElement('.display');


 	$( "#button" ).on( "click",   function() { //freely interact with displays
 		reloadGrid();
	});

 	  var items = 30;
  while (items-- > 0){
  		appendDisplay("<div id='" + idNumber + "' class='display'></div>");
  		idNumber++;
  //     //$("#grid").append("<div id='" + idNumber++ + "' class='display'></div>");
  //       //grid.packery('reload');
  //         grid.find('.display').each( function( i, itemElem ) {
  //   // make element draggable with Draggabilly
  //   var draggie = new Draggabilly( itemElem );
  //   // bind Draggabilly events to Packery
  //   grid.packery( 'bindDraggabillyEvents', draggie );
  // });
  //       grid.packery('destroy');
 	// 	grid.packery();
  }

  function reloadGrid(){
  	grid.packery('destroy');
 	grid.packery();
  }

  // function reloadDraggabilly(){
  // 	 var itemElems = grid.getItemElements();
  // // for each item...
  // for ( var i=0, len = itemElems.length; i < len; i++ ) {
  //   var elem = itemElems[i];
  //   // make element draggable with Draggabilly
  //   var draggie = new Draggabilly( elem, {
  //   });
  //   // bind Draggabilly events to Packery
  //   pckry.bindDraggabillyEvents( draggie );
  // }
  // }

  function appendDisplay(text){
  	$("#grid").append("" + text);
	bindDragabillyToElement('.display');
  	reloadGrid();
  }

	function bindDragabillyToElement(element){ 
		grid.find(element).each( function( i, itemElem ) {
    		var draggie = new Draggabilly( itemElem, {

    			grid: [5, 5] //this will have to be changed at some point
    		});
    		grid.packery( 'bindDraggabillyEvents', draggie );
  		});
	}

  
  
});
