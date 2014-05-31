;
(function () {

    "use strict";
    
    $("#prey-container").icoolscrap({
    	siteUrl: 'https://www.icoolhunt.com', //the base url for preys and tag links
    	tagSearchUrl: '/explore?f.q=', //the tag search query url
    	dataUrl: '../icoolhunt.json', //the data where we can retrieve the json
    	templateElem: '#item-template > li', //The template to use to format our json preys
    	infoElem: '#elem-info', //the footer element where we'll display the active prey info
    	mouseOverDelay: 400
    });
}());