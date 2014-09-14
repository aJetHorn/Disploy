$(document).ready( function () 
{

    var container = document.querySelector('#grid');
    var grid = $('#grid').packery();

    var clicked = false;
    var lineNumber = 5;

    var currentHistoryIndex = 0;

    var commandHistory = [];

    var mode = "interaction"; //selection or interaction
    var idBannersOn = false;
    
  var isActive = true;
  //var resize = "large";
  var marginSize = 1;
  //var split = false;
  var idNumber = 100;
  var items = 30; //def 30

  while (items-- > 0){
    appendDisplay("<div id='" + idNumber + "' class='display'></div>");
    idNumber++
  }

  function appendDisplay(content){
    $("#grid").append("" + content);
    $("#grid").packery('appended', content);
    bindDragabillyToElement('.display');
    reloadGrid();
  }

  function prependDisplay(content){
    $("#grid").prepend("" + content);
    $("#grid").packery('prepended', content);
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

  function reloadGrid(){
    grid.packery('destroy');
    grid.packery();
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

$( "#reload-masonry" ).on( "click",   function() { //rename
   reloadGrid();
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

  $("#what").on( "click", function() {
   if ($("#infotext").length>0){
       $("#infotext").remove();
    }
   prependDisplay("<div id='infotext' class='display'><h2>An API Playground. A Supercharged Search Bar.</h2><span>Disploy is an experimental web app designed to make your browsing experience more efficient. We crave access to information much faster than we can search and sort through it. Disploy puts everything in one place and provides powerful tools so you can find, organize, manipulate content exactly how you'd like to. Additional API support is rapidly being added, and, even if you don't know what an API is, Disploy will make your life (or at least your internet life, which happens to be a significant component of mine) easier.</span><h2>Display && Deploy == Disploy</h2><span>Using the Command Line Interface (CLI) facilitates rapid deployment of modules, called displays or display tiles. The content within tiles can be further manipulated using display commands. Disploy, the portmanteau of Display and Deploy, can be used to do even more including querying the search engines of about 50 different websites.</span><h2>Open Source and Free (For Everyone)</h2><span>The built-in search function was inspired by <a href=\"http://sparktab.net\">SparkTab</a>, a project completed by a group of legendary Lehigh students at Penn Apps. I am a proponent of open source and think it will be an important part of Disploy's ongoing development. Let's work together.</span><h1>Contact Me</h1><span>This might be the first time in my life where I can say 'we need to talk' and be taken seriously. Please excuse my sophmoric banter- we <i>should</i> talk if you're at all interested in this project or, for some miraculous reason, me. You can email me at TJO216@Lehigh.edu. Use a descriptive title- I receive an awful lot of unsolicited stock tips.</span></div>");
    $("#infotext").width(600 + (marginSize * 4));
    $("#infotext").height(600 + (marginSize * 5));

    reloadGrid();
  });
  
  $("#how").on( "click", function() {
   //var text = "Glad you asked."
   if ($("#infotext").length>0){
      $("#infotext").remove();
   }

   $("#grid").prepend("<div id='infotext' class='display'><h1>Disploy.</h1>");
    $("#infotext").width(590 + (marginSize * 4));
    $("#infotext").height(790 + (marginSize * 6));

    //$("#about").css('background-color', '#2C3E50');
    //t.masonry('reload');
    reloadGrid();
  });

  $("#fork").on( "click", function(){
   openInNewTab("https://github.com/aJetHorn/Disploy");
   logToConsole("Check Disploy out on GitHub!");
   logToConsole("To go back, try 'visit https://github.com/aJetHorn/Disploy'");
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
          logToConsole("Deselected " + "#" + $(this).attr('id'));
        }
      }     
    }
    else{
      $(this).prepend("<div class='highlight'> </div>");
      $(".highlight", this).css({"border": "0px solid #f1c40f"}).animate({'borderWidth': '2px'}, 160, "linear");
      selectedIds.push($(this).attr('id'));
      logToConsole("Selected " + "#" +  $(this).attr('id'));  
      }
    }  
        //css("border", "3px solid #9b59b6");
    //$(this).css("border-color", "#999");
  })
  
  function toggleIds(){
    var messageLogged = false; //this is sloppy, consider refactoring
    idBannersOn = !idBannersOn;
    $( "div.display" ).each(function( index ) {
      //appened class
      
      if ($("div.idBanner", this).length <= 0){
        if (!messageLogged){
          messageLogged = true;
          logToConsole("Ids shown");
        }
        $(this).prepend("<div class='idBanner'>" + $(this).attr('id') + "</div>");
      }
      else{
        if (!messageLogged){
          messageLogged = true;
          logToConsole("Ids hidden");
        }
        $("div.idBanner", this).remove();

      }
    });
  }

  function removeIdBanner(element){ //removes an id banner
    console.log("removeId called on " + element);
    $(element + ".idBanner").remove();
  }

  function refreshIds(){
    toggleIds();
    toggleIds();
  }

  function refreshIdBanner(element){
    var i = 2
    while (i-- > 0)
    if ($(element + ".idBanner").length <= 0){
        $(element).prepend("<div class='idBanner'>" + $(element).attr('id') + "</div>");
      }
      else{
        $(element + ".idBanner").remove();
      }

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
      //t.masonry('reload');
      reloadGrid();
    }
    selectedIds = [];
  }

  function split() { //FIND SPLIT HERE __
    for (var i = 0; i < selectedIds.length; i++){
      var currentId = "#" + selectedIds[i];
      if ($(currentId).length <= 0){
        alert("id doesn't exist");
      }
      else{
        logToConsole("Split " + currentId);
    var width = $(currentId).width();
    var height = $(currentId).height();
    removeIdBanner(currentId); //should remove id.. should eliminate problems
    var html = $(currentId).html() + "";
    var newHeight = (height - marginSize*2) / 2;
    var newWidth = (width - marginSize*2) / 2;

    $(currentId).remove();

    for (var j = 4; j > 0; j--){
      //$("#grid").prepend("<div id='" + idNumber + "' class='display'></div>");
      prependDisplay("<div id='" + idNumber + "' class='display'></div>");
      $("#" + (idNumber)).width(newWidth);
      $("#" + (idNumber)).height(newHeight);
      $("#" + (idNumber)).append(html);
      $("div.highlight", "#" + idNumber).remove();

      if ($("div.idBanner", "#" + idNumber).length > 0){
        $("div.idBanner", "#" + idNumber).remove();
        $("#" + idNumber).prepend("<div class='idBanner'>" + $("#" + idNumber).attr('id') + "</div>");
        logToConsole("Created " + idNumber);
      }

      idNumber++;
      reloadGrid();
      //refreshIds();
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
      if ($(currentId).length <= 0){ //fix this eventually
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
        reloadGrid();
      }
    }
    //$("#grid").prepend("<div id='" + idNumber + "' class='display'></div>");
    prependDisplay("<div id='" + idNumber + "' class='display'></div>");
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

      console.log("idNumber: " + idNumber);
      idNumber++;
      selectedIds = [];
      refreshIds();
      reloadGrid();
  }

  function deleteDisplay(){
    for (var i = 0; i < selectedIds.length; i++){
      var currentId = "#" + selectedIds[i];
      // if ($(currentId).length <= 0){ //exists, comment out
      //   alert(currentId + " not deleted");
      // }
      // else{
        $(currentId).remove();
        reloadGrid();
        logToConsole("Deleted " + currentId);
      //}
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

  commandHistory.push(cString); //note that we only want to push commands to the command history
  currentHistoryIndex = commandHistory.length;
  if (cString == ""){
    cString = "-No Command Entered-";
  }
  logToConsole(cString); 

  if (cString.length >= 6 && cString.substring(0,5) == "display"){
    alert("display");
    //do something..
  }
  else if (cString.length >= 6 && cString.substring(0,6) == "deploy"){ //create new tiles!
    cString = cString.substring(7);
    deployParser(cString);
  }
  else{ //these are default commands, notice disploy is not needed
    if (cString.length >= 6 && cString.substring(0,7) == "disploy"){
      //alert("cString before: " + cString);
      cString = cString.substring(8);
      //alert("cString After: " + cString);
    }
    disployParser(cString);
  }

 }

 function logToConsole(cString){ //logs a message to the console
  var spaceString = "&nbsp;&nbsp;&nbsp;";
  var leftMarginAmt = "0px";
  if (lineNumber > 999){
    leftMarginAmt = "-18px";
  }
  else if (lineNumber > 99){
    leftMarginAmt = "-12px";
  }
  else if (lineNumber > 9){
    leftMarginAmt = "-6px";
  }

  $("#console").append("<span style=\"margin-left:" + leftMarginAmt + "\">" + lineNumber++ + spaceString + cString +  "</span><br>");
  $("#console").scrollTop(1500); //this is a hack to auto scroll to bottom
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
    logToConsole("Searched Google for " + cStringQuery);
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
    logToConsole("Searched Bing for " + cStringQuery);
  }

  else if (cString.indexOf('dictionary ')  > -1){
    cStringQuery = cString.replace('dictionary ', '');
    openInNewTab("http://www.merriam-webster.com/dictionary/" + cStringQuery);
    logToConsole("Searched Merriam Webster Dictionary for " + cStringQuery);
  }

  else if (cString.indexOf('thesarus ')  > -1){
    cStringQuery = cString.replace('dictionary ', '');
    openInNewTab("http://www.merriam-webster.com/thesarus/" + cStringQuery);
    logToConsole("Searched Merriam Webster Thesarus for " + cStringQuery);

  }

  else if (cString.indexOf('medical ')  > -1){
    cStringQuery = cString.replace('medical ', '');
    openInNewTab("http://www.merriam-webster.com/medical/" + cStringQuery);
    logToConsole("Searched Merriam Webster Medical for " + cStringQuery);

  }

  else if (cString.indexOf('concise ')  > -1){
    cStringQuery = cString.replace('concise ', '');
    openInNewTab("http://www.merriam-webster.com/concise/" + cStringQuery);
    logToConsole("Searched Merriam Webster Concise for " + cStringQuery);
  }

  else if (cString.indexOf('youtube ')  > -1){
    cStringQuery = cString.replace('youtube ', '');
    openInNewTab("http://www.youtube.com/results?search_query=" + cStringQuery);
    logToConsole("Searched Youtube for " + cStringQuery);
  }

  else if (cString.indexOf('pandora ')  > -1){
    cStringQuery = cString.replace('pandora ', '');
    openInNewTab("http://www.pandora.com/search/" + cStringQuery);
    logToConsole("Searched Pandora for " + cStringQuery);
  }

  else if (cString.indexOf('wiki ')  > -1){
    cStringQuery = cString.replace('wiki ', '');
    openInNewTab("http://en.wikipedia.org/w/index.php?t&search=" + cStringQuery);
    logToConsole("Searched Wikipedia for " + cStringQuery);
  }

  else if (cString.indexOf('wikipedia ')  > -1){
    cStringQuery = cString.replace('wikipedia ', '');
    openInNewTab("http://en.wikipedia.org/w/index.php?t&search=" + cStringQuery);
    logToConsole("Searched Wikipedia for " + cStringQuery);
  }

  else if (cString.indexOf('etsy ') > -1){
    cStringQuery = cString.replace('etsy ', '');
    openInNewTab("https://www.etsy.com/search?q=" + cStringQuery);
    logToConsole("Searched Etsy for " + cStringQuery);
  }

  else if (cString.indexOf('amazon ') > -1){
    cStringQuery = cString.replace('amazon ', '');
    openInNewTab("http://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=" + cStringQuery);
    logToConsole("Searched Amazon for " + cStringQuery);
  }

  else if (cString.indexOf('reddit ') > -1){
    cStringQuery = cString.replace('reddit ', '');
    openInNewTab("http://www.reddit.com/search?q=" + cStringQuery);
    logToConsole("Searched Reddit for " + cStringQuery);
  }

  else if (cString.indexOf('tumblr ') > -1){
    cStringQuery = cString.replace('tumblr ', '');
    openInNewTab("https://www.tumblr.com/search/" + cStringQuery);
    logToConsole("Searched Tumblr for " + cStringQuery);
  }

  else if (cString.indexOf('facebook ') > -1){
    cStringQuery = cString.replace('facebook ', '');
    openInNewTab("https://www.facebook.com/search/more/?q=" + cStringQuery);
    logToConsole("Searched Facebook for " + cStringQuery);

  }
  
  else if (cString.indexOf('twitter ') > -1){
    cStringQuery = cString.replace('twitter ', '');
    openInNewTab("https://twitter.com/search?q=" + cStringQuery);
    logToConsole("Searched Twitter for " + cStringQuery);

  }

  else if (cString.indexOf('wolfram ') > -1){
    //may not work completely
    cStringQuery = cString.replace('wolfram ', '');
    cStringQuery = cString.replace('+', '--');
    openInNewTab("http://www.wolframalpha.com/input/?i=" + cStringQuery);
    logToConsole("Performed operation on Wolfram Alpha: " + cStringQuery);

  }

  else if (cString.indexOf('ikea ') > -1){
    cStringQuery = cString.replace('ikea ', '');
    openInNewTab("http://www.ikea.com/us/en/search/?query=" + cStringQuery);
    logToConsole("Searched Ikea for " + cStringQuery);
  }

  else if (cString.indexOf('github ') > -1){
    cStringQuery = cString.replace('github ', '');
    openInNewTab("https://github.com/search?q=" + cStringQuery);
    logToConsole("Searched GitHub for " + cStringQuery);
  }

  else if (cString.indexOf('imgur ') > -1){
    cStringQuery = cString.replace('imgur ', '');
    openInNewTab("http://imgur.com/search?q=" + cStringQuery);
    logToConsole("Searched Imgur for " + cStringQuery);
  }

  else if (cString.indexOf('urban ') > -1){
    cStringQuery = cString.replace('urban ', '');
    openInNewTab("http://www.urbandictionary.com/define.php?term=" + cStringQuery);
    logToConsole("Searched Urban Dictionary for " + cStringQuery);
  }

  else if (cString.indexOf('urbandictionary ') > -1){
    cStringQuery = cString.replace('urbandictionary ', '');
    openInNewTab("http://www.urbandictionary.com/define.php?term=" + cStringQuery);
    logToConsole("Searched Urban Dictionary for " + cStringQuery);
  }

  else if (cString.indexOf('flippa ') > -1){
    cStringQuery = cString.replace('flippa ', '');
    openInNewTab("https://flippa.com/buy/search?q=" + cStringQuery);
    logToConsole("Searched Flippa for " + cStringQuery);
  }

  else if (cString.indexOf('stock ') > -1){
    cStringQuery = cString.replace('stock ', '');
    openInNewTab("http://finance.yahoo.com/lookup;_ylc=X3oDMTFwazVkanJnBGtleXcDeW8EbWlkA21lZGlhcXVvdGVzc2VhcmNoBHNlYwNnZXRxdW90ZXNidG4Ec2xrA2xvb2t1cA--?s=" + cStringQuery);
    logToConsole("Searched Yahoo Finance for Symbol " + cStringQuery);
  }

  else if (cString.indexOf('weather') > -1){
    //cStringQuery = cString.replace('weather ', '');
    //openInNewTab("https://flippa.com/buy/search?q=" + cStringQuery);
    openInNewTab("https://weather.yahoo.com/");
    logToConsole("Looked up the weather on Yahoo");
  }

  else if (cString.indexOf('zillow ') > -1){
    cStringQuery = cString.replace('zillow ', '');
    //openInNewTab("https://flippa.com/buy/search?q=" + cStringQuery);
    openInNewTab("https://zillow.com/homes/" + cStringQuery + "_rb");
    logToConsole("Searched Zillow for " + cStringQuery);
  }

  else if (cString.indexOf('visit ') > -1){
    cStringQuery = cString.replace('visit ', '');
    ///consider parsing!
    openInNewTab(cStringQuery);
    logToConsole("Visited " + cStringQuery);
  }

  else if (cString.indexOf('refresh') > -1){
    //refreshes everything??
    location.reload(true);
    logToConsole("Refreshed the page");
  }

  else if (cString.indexOf('reload') > -1){ //should reload masonry/isotope container
    //refreshes everything??
    location.reload(true);
    logToConsole("Reloaded the page");
  }

  else if (cString.indexOf('select ') > -1){
    //select by id or class
    cStringQuery = cString.replace('select ', ''); //this will just contain ids now
    if (cStringQuery.indexOf('all') > -1){
      cStringQuery = cStringQuery.replace('all', '.display ');
    }
    while (cStringQuery.trim().length > 0){
      var currentElementTemp = cStringQuery.split(" ")[0];
      var currentElement = currentElementTemp;

    if (currentElement.indexOf('#') < 0 && currentElement.indexOf('.') < 0){ //defaults to id if not specified
      currentElement = "#" + currentElement;
    }

    if ($(".highlight", currentElement).length > 0){
      $("div.highlight", currentElement).remove();
      for (var i = 0; i < selectedIds.length; i++){
        if (selectedIds[i] == $(currentElement).attr('id')){
          selectedIds.pop($(currentElement).attr('id')); 
          logToConsole("Deselected " + currentElement);
        }
      }     
    }
    else{
      if ($(currentElement).length > 0){
        $(currentElement).prepend("<div class='highlight'> </div>");
        $(".highlight", currentElement).css({"border": "0px solid #f1c40f"}).animate({'borderWidth': '2px'}, 160, "linear");
        logToConsole("Selected " + currentElement);
      }
      else{
        logToConsole("Unable to select " + currentElement);
      }
      
      }
      selectedIds.push($(currentElement).attr('id'));  //this doesn't work for "all"


      cStringQuery = cStringQuery.replace(currentElementTemp, '');
      cStringQuery = cStringQuery.trim();
    }
  }  

  else if (cString.indexOf('toggle ids') > -1 || cString.indexOf('ids') > -1 || cString.indexOf('show ids') > -1){
    toggleIds(); //good
  }

  else if (cString.indexOf('interact') > -1 || cString.indexOf('interaction') > -1){
    toggleInteractionMode();
    logToConsole("Entered Interaction Mode");
  }

  else if (cString.indexOf('selection') > -1 || cString.indexOf('select') > -1){
    toggleSelectionMode();
    logToConsole("Entered Selection Mode");
  }

  else if (cString.indexOf('delete') > -1 || cString.indexOf('del') > -1 || cString.indexOf('remove') > -1 || cString.indexOf('rm') > -1){
    deleteDisplay(); //good
  }

  else if (cString.indexOf('gui') > -1){
    toggleGUI();
    logToConsole("Toggled GUI");
  }

  else if (cString.indexOf('console') > -1){
    toggleConsole();
    logToConsole("Toggled GUI");
  }

  else if (cString.indexOf('tab') > -1){ //just opens a blank tab, doesn't focus on it
    openBlankTab();
  logToConsole("Opened new tab");
  }

  else if (cString.indexOf('split') > -1 || cString.indexOf('spl') > -1){ //just opens a blank tab, doesn't focus on it
    split();
  }

  else if (cString.indexOf('merge') > -1){ //Mergem
    cString = cString.replace('merge', '');
    if (cString.indexOf('m') > -1 || cString.indexOf('mult') > -1 || cString.indexOf('multiply') > -1){
      logToConsole("Merged by multiplying tile dimensions");
      merge("Multiply");
    }
    else{ // Mergel
      logToConsole("Merged and preserved largest tile dimensions");
      merge("Largest");
    }
  }
 } //end of function

 function deployParser(cString){
  var prepend = true;
  var tileType = "default";
  var id = idNumber;
  var content = "<div id='" + id + "' class='display'></div>";
  var width = 200;
  var height = 200;

  if (cString.indexOf('help') > -1){
    logToConsole("How to Deploy new tiles:");
    logToConsole("deploy {[append] | [prepend]} {tile | photo URL | iframe URL | youtube URL} [#id] {[width/height] | [width] [height]}");
    logToConsole("Type deploy, then type \'append\' if you'd like the tile to appear in the front, or \'prepend\'' if you'd like it to be added to the end (this is optional)");
    logToConsole("Next, think about what type of tile you'd like to deploy. Tile is a blank one while photo, iframe, and youtube require URLS");
    logToConsole("If you'd like to add a non-sequential id, type an id, starting with #");
    logToConsole("You can also specify dimensions. Default is 200 * 200. Specify one number for a square with all sides that length, or two for a rectangle");
    logToConsole("Feel free to change any of this later using the \'display\' command!");
  }
  if (cString.indexOf('append') > -1){
    prepend = false;
    cString = cString.replace('append ', '');
  }
  else if (cString.indexOf('prepend') > -1){
    cString = cString.replace('prepend ', '');
  }
  if (cString.indexOf('tile') > -1){
    cString = cString.replace('tile ', '');
    var tokens = cString.split(" ");
    var currentToken = tokens[0];
    if (currentToken.charAt(0) == '#'){
      id = currentToken.substring(1);
      content = "<div id='" + id + "' class='display'></div>";
      cString = cString.replace(currentToken, '');
      cString = cString.trim();
      console.log(cString);
      tokens = cString.split(" ");
    }
    if (tokens.length == 2){ //create it with certain dimensions
      width = tokens[0];
      height = tokens[1];
      console.log(tokens[0]);
      console.log(tokens[1]);
    }
    else if (tokens.length == 1){
      console.log(tokens[0]);
      width = tokens[0];
      height = width;
    }
    else if (tokens.length != 0){
      logToConsole(tokens.length);
      logToConsole(cString);
      logToConsole("Too many arguments");
    }
    content = "<div id='" + id + "' style='width: " + width + "px; height: " + height + "px;' class='display'></div>";
    //console.log(content);
    //logToConsole("content:" + content);

  }
  else if (cString.indexOf('photo') > -1){ //as more are added, they will be more specialized
    cString = cString.replace('photo', '');
    tileType = "photo";
  }
  else if (cString.indexOf('img') > -1){
    cString = cString.replace('img', '');
    tileType = "photo";
  }
  else if (cString.indexOf('iframe') > -1){
    cString = cString.replace('iframe', '');
    tileType = "iframe";
  }
  else if (cString.indexOf('youtube') > -1){
    cString = cString.replace('youtube', '');
    tileType = "youtube";
  }

  if (prepend){
    prependDisplay(content); 
  }
  else{ //append
    appendDisplay(content);
  }
  if (idBannersOn){
      $("#" + id).prepend("<div class='idBanner'>" + $("#" + id).attr('id') + "</div>");
    } 
  idNumber++;
 

 }

})
