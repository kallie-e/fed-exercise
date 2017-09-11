"use strict";

var slides = [];

(function() {
	
	var Carousel = {
		props:{
			current_slide:null,
			total_slides:null
		},
		
		/**********************************
		 * 
		 * init()
		 * 
		 * initialize the values to be used in the slider
		 *
		 **********************************/
		init: function() {
			Carousel.bindEvents();
			
			//get the slides
			slides = document.getElementsByTagName("article");
			
			//initialize values
			Carousel.props.total_slides = slides.length;
			Carousel.props.current_slide = 0;
			
			Carousel.update();
		},
		
		/**********************************
		 * 
		 * bindEvents()
		 *
		 * attach events to the next and prev "buttons"
		 *
		 **********************************/
		bindEvents: function() {
			// bind "next" to div with class "carousel-next"
			$(".carousel-next").on("click", function() {
				Carousel.next();
			});
			
			// bind "previous" to div with class "carousel-prev"
			$(".carousel-prev").on("click", function() {
				Carousel.previous();
			});
		},
		
		/**********************************
		 * 
		 * next()
		 *
		 * user clicks on next button.  slider transitions to next slide
		 * if no more slides, transitions to the first
		 *
		 **********************************/
		next: function() {
			console.log ("next clicked");
			
			//up the counter.  we're now working with the new slide
			var idx = ++Carousel.props.current_slide;
			
			// if the new slide is less than zip (dunno how, but you know....), or (more realistically)
			// the new slide is past the list, then let's use the first one
			if((idx < 0) || (idx >= Carousel.props.total_slides)) {
				idx = 0;
			}
			
			// now that the actual index is decided, apply it to our curr_s var
			Carousel.props.current_slide = idx;
			
			// update the sucker
			Carousel.update();
		},
		
		/**********************************
		 * 
		 * previous()
		 *
		 * user clicks on prev button.  slider transitions to previous slide
		 * if no previous, transitions to last slide
		 *
		 **********************************/
		previous: function() {
			console.log ("previous clicked");
			
			//up the counter.  we're now working with the new slide
			var idx = --Carousel.props.current_slide;
			
			// if the new slide is less than zip (dunno how, but you know....), or (more realistically)
			// the new slide is past the list, then let's use the first one
			if((idx < 0) || (idx >= Carousel.props.total_slides)) {
				idx = (Carousel.props.total_slides-1);
			}
			
			// now that the actual index is decided, apply it to our curr_s var
			Carousel.props.current_slide = idx;

			// update the sucker
			Carousel.update();
		},
		
		/**********************************
		 * 
		 * update()
		 * 
		 * once the slide has transitioned, what the user sees needs to be updated per CSS
		 *
		 **********************************/
		update: function() {
			console.log ("update");
			
			// rotate thru the slides.  the current slide is now "active". otherwise not			
			for(var x=0; x<Carousel.props.total_slides; x++) {
				slides[x].className = (x === Carousel.props.current_slide) ? "item active" : "item";
			}
			
			// note ... the follow would have been my preferred method.  however, resulted in:
			// jQuery.Deferred exception: slides.map is not a function TypeError: slides.map is not a function
			// console.log (slides);			
			/*slides = slides.map( function(obj, idx) {
				obj.className = (idx === Carousel.props.current_slide) ? "item active" : "item";
				return obj;
			});
			
			UPDATE: after some reseasrch, evidently NodeLists are NOT arrays, and require conversion ....
			which coincidentally look a LOT like the previously mentioned for loop above *ahem*
			With that, the for loop stays.  Trying to be fancy not an option for this particular case.  Can't blame me for trying....
			*/
		}
	}
	
	$(function() {
		Carousel.init();
	})

}) (window);