"use strict";

var slides = [];

(function() {
	
	var Carousel = {
		props:{
			current_slide:null,
			total_slides:null
		},
		init:function(){
			Carousel.bindEvents();
			
			//get the slides
			slides = document.getElementsByTagName("article");
			
			//initialize values
			Carousel.props["total_slides"] = slides.length;
			Carousel.props["current_slide"] = 0;
			
			Carousel.update();
		},
		bindEvents:function(){
			$(".carousel-next").on("click",function(){
				Carousel.next();
			});
			$(".carousel-prev").on("click",function(){
				Carousel.previous();
			});
		},
		next:function(){
			console.log ("next clicked");
			
			var idx = ++Carousel.props["current_slide"];
			
			if((idx < 0) || (idx >= Carousel.props["total_slides"])) {
				idx = 0;
			}
			
			Carousel.props["current_slide"] = idx;
			Carousel.update();
		},
		previous:function(){
			console.log ("previous clicked");
			
			var idx = --Carousel.props["current_slide"];
			
			if((idx < 0) || (idx >= Carousel.props["total_slides"])) {
				idx = (Carousel.props["total_slides"]-1);
			}
			
			Carousel.props["current_slide"] = idx;
			Carousel.update();
		},
		update:function(){
			console.log ("update");
			
			for(var x=0; x<Carousel.props["total_slides"]; x++) {
				slides[x].style.display = (x === Carousel.props["current_slide"]) ? "flex" : "none";
			}
		}
	}
	$(function(){
		Carousel.init();
	})

})(window);