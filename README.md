# Disploy
=======

Aims to facilitate the display, deployment, and aggregation of web content in a dashboard populated with responsive tiles that can be manipulated and customized via a command-line interface.


###[Visit Disploy.com](Disploy.com)

Website synced with gh-pages branch at [aJetHorn.github.io/Disploy](aJetHorn.github.io/Disploy)

####Version Notes
This is a pre-launch, proof-of-concept version of Disploy. It has basic functionality but requires a significant overhaul before it is suitable for large-scale development. Development has stalled and will resume over my Thanksgiving break.

## A Project by Tim O'Hearn

![Mou icon](https://avatars3.githubusercontent.com/u/3619262?v=2&s=180)

## Disploy Guide

Disploy commands fall under three categories: 

* Display: For modifying existing tiles
* Deploy: For creating new tiles
* Disploy: For meta commands

### Notes on Usage

Tiles, or displays, can also be manipulated by clicking and dragging them. Displays with responsive elements such as YouTube videos and Google Maps are not draggable by default. You'll have to enter Interaction mode.

## Current APIs
####This is a list of APIs currently supported:

* [Quandl API](https://www.quandl.com/>)
	* Stock market data
	* Bitcoin data
	* More coming soon

## TODO
* Modularization
* Parser
* Objects
* Polish UI


## Disploy Commands
#### Description:
Disploy commands don't clearly fit into tile manipulation or deployment. There are a number of extremely useful functions here. Being meta commands, the disploy prefix is optional.
####List:

* Refresh (reloads the page)
* Reload (currently no difference)
* Select #id #id #id
	* Toggles selection on one or more ids
	* '#' can be omitted
	* Can select classes- "all" isn't functioning properly
* toggle ids | show ids | id
	* shows/hides all ids of display tiles
* Interact | Interaction
	* Enters interaction mode
* Select | Selection 	
	* Enters selection mode
* Delete | del | Remove | rm
	* Deletes selected tiles 
* GUI
	* Toggles GUI which is left over from testing long ago, feel free to add to it though
* Tab (opens new tab)
* Merge (merges selected tiles)
	* Merge m multplies tile dimensions
	* Merge l sets tile to the largest dimension 
	* Currently, the largest tile's source is preserved

####Search Queries:
These command will open search results in a new tab
Syntax is just <'command'> <'query'>

* Google
	* search (default)
	* image | images
	* video | videos
	* shopping
	* apps
	* book | books
	* map | maps
* Bing
	* search (default)
	* image | images
	* video | videos
	* news
	* map | maps
* Dictionary
* Thesarus
* Medical
* Concise
* Youtube
* Pandora
* Wiki | Wikipedia
* Etsy
* Amazon
* Reddit
* Tumblr
* Facebook
* Twitter
* Wolfram (could use work)
* Ikea
* GitHub
* Imgur
* Urban | Urbandictionary
* Flippa
* Stock (Yahoo Finance)
* Weather (no query required)
* Zillow
* Visit <'url'> (opens a URL in a new tab)

##Deploy
#### Description:
Deploy commands are used to create new tiles. The Deploy prefix is required.

####List:
General form: 

	Deploy {append | prepend} <type> [length | (width && height)]

* help (displays some help commands)
* Current tile types: Tile, Stock
* Examples:
	* deploy append tile 300 200
		* Appends a blank tile 300 * 200 to the end of the dashboard
	* deply prepend tile 500
		* Prepends a blank tile 500 * 500 to the front of the dashboard
	* deploy stock aapl 
		* Prepends 200 * 200 apple stock tile
		
####Coming Soon:

* Photo
* iFrame
* YouTube
* Maps
* Facebook
* Imgur
* Clock / Timing

##Display
#### Description:
Use display commands to edit the contents and appearance of existing tiles. Currently under development

####List:
General form:

	Display {selected | target(s)} <attribute> <mod(s)>
	
##Notes on development:

I encourage you to collaborate with me on this project. I think it has the potential to revolutionize the way we access information. It is very difficult to consistently develop while being a student working a part-time job but I am very satisfied with the early work that has been done and the contributions from my close friends. 

You can contact me at TJO216@Lehigh.edu