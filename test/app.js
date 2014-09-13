$(document).ready( function () 
{
    var t = $('#masonry');
    var clicked = false;
    var lineNumber = 5;

    var currentHistoryIndex = 0;

    var commandHistory = [];

    var mode = "interaction"; //selection or interaction

    t.masonry({
        itemSelector:        '.display',
        isResizable:        true,
        columnWidth: 1
    })
    
  var isActive = true;
  //var resize = "large";
  var marginSize = 1;
  //var split = false;
  var idNumber = 100;
  var items = 30;
  while (items-- > 0){
      $("#masonry").append("<div id='" + idNumber++ + "' class='display'></div>");
        t.masonry('reload');
  }

  var selectedIds = [];

$( "#interactionButton" ).on( "click",   function() { //freely interact with displays
  toggleInteractionMode();
});

  $( "#selectionButton" ).on( "click",   function() { //select, move, resize, etc, displays
    toggleSelectionMode();
  });

    $( "#showHideIdsButton" ).on( "click",   function() {
      toggleIds();
    });

  $( "#splitButton" ).on( "click",   function() {
   //for each selected div
   split();
  });
  $( "#mergeButtonMultiply" ).on( "click",   function() {
   //for each selected div
   merge("Multiply");
});
    $( "#mergeButtonLargest" ).on( "click",   function() {
   //for each selected div
   merge("Largest"); //takes on area of largest
});

    $( "#reload-page" ).on( "click",   function() {
   location.reload();
});

  //$(".display iframe").css("border-radius", "5px");

$( "#reload-masonry" ).on( "click",   function() {
   t.masonry('reload');
});

$( "#hugeSquareButton" ).on( "click",   function() {
   resize(800 + (marginSize*6), 800 + (marginSize*6));
});
  
$( "#largeSquareButton" ).on( "click",   function() {
   resize(600 + (marginSize*4), 600 + (marginSize*4));
});

  $( "#mediumRectangleButton" ).on( "click", function() {
   resize(400 + (marginSize*2), 200);
});

  $( "#mediumSquareButton" ).on( "click", function() {
   resize(400 + (marginSize * 2), 400 + (marginSize *2));
});

  $( "#normalSizeButton" ).on( "click", function() {
      resize(200, 200);
});

  $( "#deleteButton" ).on( "click", function() {
      deleteDisplay();
});

  $(".page-header h6 span").on( "click", function() {
   //var text = "Glad you asked."
   if ($("#infoText").length>0){
      $("#infoText").remove();
   }

   $("#masonry").prepend("<div id='infoText' class='display'><h1>Glad you asked.</h1><span>Disploy is a portmanteau of the words Display and Deploy. I originally conceived this idea as a feature in a graphical math game I was developing. I planned to implement a secret developer console to interact with and manipulate the elements of the game. </span><span>As I gave the concept more thought, I ditched the math game completely and became obsessed with the idea of a developer console built for <i>for developers</i>- A command line interface (CLI) within a website that could be used to work with different APIs. </span><h2>An API playground. A Supercharged Search Bar.</h2><span>I found my first real inspiration in SparkTab, which was developed by a legendary team from Lehigh University at PennApps in Spring 2013. My intended function and their end-product overlapped somewhat, and what they were able to accomplish in 40 hours served as a proof-of-concept. Disploy's multitude of features can be used by the technically adept as well as those just looking to innovate their web browsing experience.</span><h2>Enough Talk. Learn how to use Disploy.</h2><span>The Command Line included on this website isn't as difficult to use as the one that came preinstalled on your desktop. The command syntax, which I call Disploy Logic, attempts to mimic natural language. It's as simple as using a search bar. Display modifies existing tiles, deploy creates new ones, and disploy supports admin features and much of the functionality of sparktab. A quick peek at the guide and you'll be good to go. And if the feature you're looking for doesn't exist-</span><h2>It will soon. Disploy is open source.</h2><span>I want people around the world to be able to contribute to this project. If the github repository isn't available at the time you're reading this, fear not- it will be soon. I'm probably in the process of organizing and documenting my code.</span><h2>Contact me.</h2><span>This might be the first time in my life where I can say 'We Need to Talk' and be taken seriously. Please excuse my sophmoric banter- we <i>should</i> talk if you're at all interested in this project or, by some miracle, me. You can email me at TJO216@Lehigh.edu. Use a descriptive title- I get an awful lot of unsolicited stock tips.</span></div>");
    $("#infoText").width(590 + (marginSize * 4));
    $("#infoText").height(790 + (marginSize * 6));

    //$("#about").css('background-color', '#2C3E50');
    t.masonry('reload');
});
    
$(document).on( "click", ".display", function() {
  if (mode === "interaction"){
  }
  else if (mode === "selection"){
    //$(this).toggleClass("highlight");
    //$(this).animate({ "background-color": "#9b59b6" }, 200, "linear")};
    //$(this).animate({ "background-color": "#9b59b6" }, 200, "linear")};

    //this should be modularized to a method called selectDisplay(arg: )
    if ($(".highlight", this).length > 0){
      $("div.highlight", this).remove();
      for (var i = 0; i < selectedIds.length; i++){
        if (selectedIds[i] == $(this).attr('id')){
          selectedIds.pop($(this).attr('id')); 
        }
      }     
    }
    else{
      $(this).prepend("<div class='highlight'> </div>");
      $(".highlight", this).css({"border": "0px solid #f1c40f"}).animate({'borderWidth': '5px'}, 160, "linear")};
      selectedIds.push($(this).attr('id'));  
    }  
        //css("border", "3px solid #9b59b6");
    //$(this).css("border-color", "#999");
  })
  
  function toggleIds(){
    $( "div.display" ).each(function( index ) {
      //appened class
      
      if ($("div.idBanner", this).length <= 0){
        $(this).prepend("<div class='idBanner'>" + $(this).attr('id') + "</div>");
      }
      else{
        $("div.idBanner", this).remove();
      }
    });
  }

  function toggleSelectionMode(){
   $( "iframe" ).addClass( "selection" );
   $( ".display" ).addClass( "moveCursor" );
   mode = "selection";
  }

  function toggleInteractionMode(){
   $( "iframe" ).removeClass( "selection" );
   $( ".display" ).removeClass( "moveCursor" );
   //remember to remove all highlight classes (div won't allow clicking)
   mode = "interaction";
  }

  function resize(width, height){
    for (var i = 0; i < selectedIds.length; i++){
      var currentId = "#" + selectedIds[i];
      if ($(currentId).length <= 0){
        alert("id doesn't exist");
      }
      else{
        $(currentId).width(width);
        $(currentId).height(height);
        $("div.highlight", currentId).remove();
      }
      t.masonry('reload');
    }
    selectedIds = [];
  }

  function split() {
    for (var i = 0; i < selectedIds.length; i++){
      var currentId = "#" + selectedIds[i];
      if ($(currentId).length <= 0){
        alert("id doesn't exist");
      }
      else{
    var width = $(currentId).width();
    var height = $(currentId).height();
    var html = $(currentId).html() + "";
    var newHeight = (height - marginSize*2) / 2;
    var newWidth = (width - marginSize*2) / 2;

    $(currentId).remove();

    for (var j = 4; j > 0; j--){
      $("#masonry").prepend("<div id='" + idNumber + "' class='display'></div>");
      $("#" + (idNumber)).width(newWidth);
      $("#" + (idNumber)).height(newHeight);
      $("#" + (idNumber)).append(html);
      $("div.highlight", "#" + idNumber).remove();

      if ($("div.idBanner", "#" + idNumber).length > 0){
        $("div.idBanner", "#" + idNumber).remove();
        $("#" + idNumber).prepend("<div class='idBanner'>" + $("#" + idNumber).attr('id') + "</div>");
      }

      idNumber++;
      t.masonry('reload');
      }
    }
  }
    selectedIds = [];
  }

  function merge(mergeType){
    //largest area gets precedence in merge source
    var totalWidth = 0;
    var totalHeight = 0;
    var largestArea = 0;
    var largestWidth = 0;
    var largestHeight = 0;
    var htmlCode = "";
    for (var i = 0; i < selectedIds.length; i++){
      var currentId = "#" + selectedIds[i];
      if ($(currentId).length <= 0){
        //alert("id doesn't exist");
      }
      else{
        var elementWidth = $(currentId).width();
        var elementHeight = $(currentId).height();
        var elementArea = elementWidth * elementHeight;
        totalWidth += elementWidth;
        totalHeight += elementHeight;
        if (elementArea > largestArea){
          htmlCode = $(currentId).html() + "";
          largestArea = elementArea;
        }
        if (elementWidth > largestWidth){
          largestWidth = elementWidth;
        }
        if (elementHeight > largestHeight){
          largestHeight = elementHeight;
        }
        $(currentId).remove();
        t.masonry('reload');
      }
    }
    $("#masonry").prepend("<div id='" + idNumber + "' class='display'></div>");
      if (mergeType == "Multiply"){
        $("#" + idNumber).width(totalWidth);
        $("#" + idNumber).height(totalHeight);
      }
      else if (mergeType == "Largest"){
        $("#" + idNumber).width(largestWidth);
        $("#" + idNumber).height(largestHeight);
      }

      $("#" + idNumber).append(htmlCode);
      $("div.highlight", "#" + idNumber).remove();
      idNumber++;
      selectedIds = [];
      t.masonry('reload');
  }

  function deleteDisplay(){
    for (var i = 0; i < selectedIds.length; i++){
      var currentId = "#" + selectedIds[i];
      if ($(currentId).length <= 0){
        alert(currentId + " not deleted");
      }
      else{
        $(currentId).remove();
        t.masonry('reload');
      }
    }
    selectedIds = [];
  }

  function toggleGUI(){
    //#top-buttons
    $("#top-buttons").toggle();
  }
  function toggleConsole(){
    //#top-buttons
    $("#console").toggle();
  }
  //===================================
  //This is for the CLI now
  //$("#bottom").draggable();

//   $(document).on('keypress',function(e) {
//     if (e.which == 13) {
//         alert('You pressed enter!');
//     }
// });

function openInNewTab(url) {
  var win = window.open(url, '_blank');
  win.focus();
}

function createInNewTab(url){ //doesn't focus
  var win = window.open(url, '_blank');
}

function openBlankTab() { //literally just opens a new tab
  var win = window.open("", '_blank');
}

 $(document).keypress(function (e) {
 var key = e.which;
 if(key == 13)  // the enter key code
  {
    var commandString = $("#CLIEntry").val();
    //alert(commandString);
    //store it in log
    parseCommand(commandString);
    //return false;  

    //uncomment this for testing...
    $("#CLIEntry").val("");
  }
});

  $(document).keydown(function (e) {
 var key = e.which;
 if(key == 38)  // up arrow
  {
    if (currentHistoryIndex > 0 && commandHistory.length > 0){
      $("#CLIEntry").val(commandHistory[--currentHistoryIndex]);
    }
  }
});

    $(document).keydown(function (e) {
 var key = e.which;
 if(key == 40)  // down arrow
  {
    if (currentHistoryIndex < commandHistory.length - 1){
      $("#CLIEntry").val(commandHistory[++currentHistoryIndex]);
    }
  }
});

 //$('#console').scrollTop($('#console')[0].scrollHeight);

 function parseCommand(cString){
  //this parses the input from command line
  //Some of the error checking and general flow is a little loose in this version
  cString = cString.toLowerCase();

  commandHistory.push(cString);
  currentHistoryIndex = commandHistory.length;
  $("#console").append("<span>" + lineNumber++ + "&nbsp;&nbsp;&nbsp;" + cString +  "</span><br>");
  $("#console").scrollTop(1500); //this is a hack to auto scroll to bottom

  if (cString.length >= 6 && cString.substring(0,5) == "display"){
    alert("display");
    //do something..
  }
  else if (cString.length >= 6 && cString.substring(0,5) == "deploy"){
    alert("deploy");
    //deploy!
  }
  else{
    if (cString.length >= 6 && cString.substring(0,7) == "disploy"){
      //alert("cString before: " + cString);
      cString = cString.substring(8);
      //alert("cString After: " + cString);
    }
    disployParser(cString);
  }

 }

 function disployParser(cString){
  //alert(cString);
  var searchSuffix = "";
  var searchPrefix = "";

  if (cString.indexOf('google ')  > -1){
    cStringQuery = cString.replace('google ', '');
    if (cString.indexOf('search ')  > -1){
      cStringQuery = cStringQuery.replace('search ', '');
    }
    else if (cString.indexOf('image ')  > -1){
      cStringQuery = cStringQuery.replace('image ', '');
      searchSuffix = "&tbm=isch";
    }
    else if (cString.indexOf('images ')  > -1){
      cStringQuery = cStringQuery.replace('images ', '');
      searchSuffix = "&tbm=isch";
    }
    else if (cString.indexOf('video ') > -1){
      cStringQuery = cStringQuery.replace('video ', '');
      searchSuffix = "&tbm=vid";
    }
    else if (cString.indexOf('videos ') > -1){
      cStringQuery = cStringQuery.replace('videos ', '');
      searchSuffix = "&tbm=vid";
    }
    else if (cString.indexOf('shopping ') > -1){
      cStringQuery = cStringQuery.replace('shopping ', '');
      searchSuffix = "&tbm=shop";
    }
    else if (cString.indexOf('apps ') > -1){
      cStringQuery = cStringQuery.replace('apps ', '');
      searchSuffix = "&tbm=app";
    }
    else if (cString.indexOf('book ') > -1){
      cStringQuery = cStringQuery.replace('book ', '');
      searchSuffix = "&tbm=bks";
    }
    else if (cString.indexOf('books ') > -1){
      cStringQuery = cStringQuery.replace('books ', '');
      searchSuffix = "&tbm=bks";
    }
    else if (cString.indexOf('map ') > -1){
      cStringQuery = cStringQuery.replace('map ', '');
      openInNewTab("http://www.google.com/maps/search/" + cStringQuery);
    }
    else if (cString.indexOf('maps ') > -1){
      cStringQuery = cStringQuery.replace('maps ', '');
      openInNewTab("http://www.google.com/maps/search/" + cStringQuery);
    }
    openInNewTab("http://www.google.com/?gws_rd=ssl#q=" + cStringQuery + searchSuffix);
  }

  else if (cString.indexOf('bing ')  > -1){
    cStringQuery = cString.replace('bing ', '');
    searchPrefix = "search";
    if (cString.indexOf('search ')  > -1){
      cStringQuery = cStringQuery.replace('search ', '');
    }
    else if (cString.indexOf('image ')  > -1){
      cStringQuery = cStringQuery.replace('image ', '');
      searchPrefix = "images/search";
    }
    else if (cString.indexOf('images ')  > -1){
      cStringQuery = cStringQuery.replace('images ', '');
      searchPrefix = "images/search";
    }
    else if (cString.indexOf('video ') > -1){
      cStringQuery = cStringQuery.replace('video ', '');
      searchPrefix = "videos/search";
    }
    else if (cString.indexOf('videos ') > -1){
      cStringQuery = cStringQuery.replace('videos ', '');
      searchPrefix = "videos/search";
    }
    else if (cString.indexOf('news ') > -1){
      cStringQuery = cStringQuery.replace('news ', '');
      searchPrefix = "news/search";
    }
    else if (cString.indexOf('map ') > -1){
      cStringQuery = cStringQuery.replace('map ', '');
      searchPrefix = "maps/default.aspx";
    }
    else if (cString.indexOf('maps ') > -1){
      cStringQuery = cStringQuery.replace('maps ', '');
      searchPrefix = "maps/default.aspx";
    }
    openInNewTab("http://www.bing.com/" + searchPrefix + "?q=" + cStringQuery);
  }

  else if (cString.indexOf('dictionary ')  > -1){
    cStringQuery = cString.replace('dictionary ', '');
    openInNewTab("http://www.merriam-webster.com/dictionary/" + cStringQuery);
  }

  else if (cString.indexOf('thesarus ')  > -1){
    cStringQuery = cString.replace('dictionary ', '');
    openInNewTab("http://www.merriam-webster.com/thesarus/" + cStringQuery);
  }

  else if (cString.indexOf('medical ')  > -1){
    cStringQuery = cString.replace('medical ', '');
    openInNewTab("http://www.merriam-webster.com/medical/" + cStringQuery);
  }

  else if (cString.indexOf('concise ')  > -1){
    cStringQuery = cString.replace('concise ', '');
    openInNewTab("http://www.merriam-webster.com/concise/" + cStringQuery);
  }

  else if (cString.indexOf('youtube ')  > -1){
    cStringQuery = cString.replace('youtube ', '');
    openInNewTab("http://www.youtube.com/results?search_query=" + cStringQuery);
  }

  else if (cString.indexOf('pandora ')  > -1){
    cStringQuery = cString.replace('pandora ', '');
    openInNewTab("http://www.pandora.com/search/" + cStringQuery);
  }

  else if (cString.indexOf('wiki ')  > -1){
    cStringQuery = cString.replace('wiki ', '');
    openInNewTab("http://en.wikipedia.org/w/index.php?t&search=" + cStringQuery);
  }

  else if (cString.indexOf('wikipedia ')  > -1){
    cStringQuery = cString.replace('wikipedia ', '');
    openInNewTab("http://en.wikipedia.org/w/index.php?t&search=" + cStringQuery);
  }

  else if (cString.indexOf('etsy ') > -1){
    cStringQuery = cString.replace('etsy ', '');
    openInNewTab("https://www.etsy.com/search?q=" + cStringQuery);
  }

  else if (cString.indexOf('amazon ') > -1){
    cStringQuery = cString.replace('amazon ', '');
    openInNewTab("http://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=" + cStringQuery);
  }

  else if (cString.indexOf('reddit ') > -1){
    cStringQuery = cString.replace('reddit ', '');
    openInNewTab("http://www.reddit.com/search?q=" + cStringQuery);
  }

  else if (cString.indexOf('tumblr ') > -1){
    cStringQuery = cString.replace('tumblr ', '');
    openInNewTab("https://www.tumblr.com/search/" + cStringQuery);
  }

  else if (cString.indexOf('facebook ') > -1){
    cStringQuery = cString.replace('facebook ', '');
    openInNewTab("https://www.facebook.com/search/more/?q=" + cStringQuery);
  }
  
  else if (cString.indexOf('twitter ') > -1){
    cStringQuery = cString.replace('twitter ', '');
    openInNewTab("https://twitter.com/search?q=" + cStringQuery);
  }

  else if (cString.indexOf('wolfram ') > -1){
    //may not work completely
    cStringQuery = cString.replace('wolfram ', '');
    cStringQuery = cString.replace('+', '--');
    openInNewTab("http://www.wolframalpha.com/input/?i=" + cStringQuery);
  }

  else if (cString.indexOf('ikea ') > -1){
    cStringQuery = cString.replace('ikea ', '');
    openInNewTab("http://www.ikea.com/us/en/search/?query=" + cStringQuery);
  }

  else if (cString.indexOf('github ') > -1){
    cStringQuery = cString.replace('github ', '');
    openInNewTab("https://github.com/search?q=" + cStringQuery);
  }

  else if (cString.indexOf('imgur ') > -1){
    cStringQuery = cString.replace('imgur ', '');
    openInNewTab("http://imgur.com/search?q=" + cStringQuery);
  }

  else if (cString.indexOf('urban ') > -1){
    cStringQuery = cString.replace('urban ', '');
    openInNewTab("http://www.urbandictionary.com/define.php?term=" + cStringQuery);
  }

  else if (cString.indexOf('urbandictionary ') > -1){
    cStringQuery = cString.replace('urbandictionary ', '');
    openInNewTab("http://www.urbandictionary.com/define.php?term=" + cStringQuery);
  }

  else if (cString.indexOf('flippa ') > -1){
    cStringQuery = cString.replace('flippa ', '');
    openInNewTab("https://flippa.com/buy/search?q=" + cStringQuery);
  }

  else if (cString.indexOf('stock ') > -1){
    cStringQuery = cString.replace('stock ', '');
    openInNewTab("http://finance.yahoo.com/lookup;_ylc=X3oDMTFwazVkanJnBGtleXcDeW8EbWlkA21lZGlhcXVvdGVzc2VhcmNoBHNlYwNnZXRxdW90ZXNidG4Ec2xrA2xvb2t1cA--?s=" + cStringQuery);
  }

  else if (cString.indexOf('weather') > -1){
    //cStringQuery = cString.replace('weather ', '');
    //openInNewTab("https://flippa.com/buy/search?q=" + cStringQuery);
    openInNewTab("https://weather.yahoo.com/");
  }

  else if (cString.indexOf('zillow ') > -1){
    cStringQuery = cString.replace('zillow ', '');
    //openInNewTab("https://flippa.com/buy/search?q=" + cStringQuery);
    openInNewTab("https://weather.yahoo.com/");
  }

  else if (cString.indexOf('visit ') > -1){
    cStringQuery = cString.replace('visit ', '');
    ///consider parsing!
    openInNewTab(cStringQuery);
  }

  else if (cString.indexOf('refresh') > -1){
    //refreshes everything??
    location.reload(true);
  }

  else if (cString.indexOf('reload') > -1){ //should reload masonry/isotope container
    //refreshes everything??
    location.reload(true);
  }

  else if (cString.indexOf('select ') > -1){
    //select by id or class
    cStringQuery = cString.replace('select ', '');
    if (cStringQuery.indexOf('all') > -1){
      cStringQuery = cStringQuery.replace('all', '.display ');
    }
    if (cStringQuery.indexOf('#') < 0 && cStringQuery.indexOf('.') < 0){
      cStringQuery = "#" + cStringQuery;
    }

    if ($(".highlight", cStringQuery).length > 0){
      $("div.highlight", cStringQuery).remove();
      for (var i = 0; i < selectedIds.length; i++){
        if (selectedIds[i] == $(cStringQuery).attr('id')){
          selectedIds.pop($(cStringQuery).attr('id')); 
        }
      }     
    }
    else{
      $(cStringQuery).prepend("<div class='highlight'> </div>");
      $(".highlight", cStringQuery).css({"border": "0px solid #f1c40f"}).animate({'borderWidth': '5px'}, 160, "linear")
      };
      selectedIds.push($(cStringQuery).attr('id'));  
  }  

  else if (cString.indexOf('toggle ids') > -1 || cString.indexOf('ids') > -1 || cString.indexOf('show ids') > -1){
    toggleIds();
  }

  else if (cString.indexOf('interact') > -1 || cString.indexOf('interaction') > -1){
    toggleInteractionMode();
  }

  else if (cString.indexOf('selection') > -1 || cString.indexOf('select') > -1){
    toggleSelectionMode();
  }

  else if (cString.indexOf('delete') > -1){
    deleteDisplay();
  }

  else if (cString.indexOf('gui') > -1){
    toggleGUI();
  }

  else if (cString.indexOf('console') > -1){
    toggleConsole();
  }

  else if (cString.indexOf('tab') > -1){ //just opens a blank tab, doesn't focus on it
    openBlankTab();
  }


 }

    //Don't go beneath this line...
    //=============================
        
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
