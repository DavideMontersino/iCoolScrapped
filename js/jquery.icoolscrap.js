;(function($){
    $.fn.extend({
        icoolscrap: function(options) {
            this.defaultOptions = {
            	siteUrl: 'https://www.icoolhunt.com', //the base url for preys and tag links
            	tagSearchUrl: '/explore?f.q=', //the tag search query url
            	dataUrl: '../icoolhunt.json', //the data where we can retrieve the json
            	templateElem: '#item-template > li', //The template to use to format our json preys
            	infoElem: '#elem-info', //the footer element where we'll display the active prey info
            	mouseOverDelay: 400
            };

            var settings = $.extend({}, this.defaultOptions, options),
            	timer;

			function populateTemplate(cloned, value){
				var $this = this;
		    	// We fill the template
		    	// I could do something "sleeker" - like iterating over dom nodes properties and prey's properties data-attr-<dom prop>="<prey prop>";
		    	// Another option could be use something like handlebars: http://handlebarsjs.com/
		    	
		    	$('[data-attr-src]',cloned).attr('src', value.image);
		    	$('[data-attr-text="description"]',cloned)[0].childNodes[0].nodeValue = value.description; 
				$('[data-attr-href="prey_link"]',cloned).attr('href',this.settings.siteUrl + value.prey_link);
				$('[data-attr-text="user_name"]',cloned).text('@' + value.user_name);
				$('[data-attr-href="user_link"]',cloned).attr('href',this.settings.siteUrl + value.user_link);
				
				// we populate tags.. soomehow dirty as there's html in javascript:
				$('[data-child-from="tag_name"]',cloned).each(function(index){
					for (var i =0; i<value.tag_name.length; i=i+1){
						$(this).append($('<li><a href="' + $this.settings.siteUrl + $this.settings.tagSearchUrl + value.tag_name[i] + '" class="label secondary radius">' + value.tag_name[i] + '</a></li>'));
					}
				});
		    }

            return this.each(function() {
                var $this = $(this);
                	preyContainer = $this;

                $this.settings = settings;
		        $.getJSON( settings.dataUrl, function( data ) {
		    	var template = $(settings.templateElem),
		    		tags = Array();

			    $.each(data,function(index, value){
			    	
			    	$.each(value.tag_name,function(vIndex,vValue){
						if (!$.inArray(vValue,tags) <= 0){
							tags.push(vValue);
			    			}
			    	});
			    	
			    	var cloned = template.clone();

			    	$.proxy(populateTemplate,$this,cloned,value)();

			    	preyContainer.append(cloned);

			    	cloned.mouseover(function(){
						var	$this = $(this),
							div = $(this).find('> div'),
			    			siblingsDiv,
			    			infoDiv = $(settings.infoElem),
			    			clonedInfo;
						
			    		// I used a timer to let people click on tags at the bottom of the page (well, ehm, if they're fast enough..)
			    		if(this.timer) {
							clearTimeout(this.timer);
							this.timer = null
						} 

						this.timer = setTimeout(function() {
					
							infoDiv.html('');
							clonedInfo = $('.item-info',$this)
								.clone()
								.appendTo(infoDiv)
								.removeClass('hide');

				    		$this.siblings().each(function(){
				    			$(this).removeClass('active');
				    		});

				    		$this.addClass('active');

							}, settings.mouseOverDelay);

				    	}).mouseout(function(){ //we do not want mouseover event to fire if we are not on the prey anymore
				    		if(this.timer) {
								clearTimeout(this.timer);
								this.timer = null
							} 
				    	}).click(function(event){ //this allows touch devices to 'emulate' mouseover
				    		if(!$(this).hasClass('active')){
				    			event.preventDefault();
				    		}
				    	});
			    	}); // End $.each(value.tag_name,function(vIndex,vValue)
				}); // End getJson
        	});
        }
    });
})(jQuery);
