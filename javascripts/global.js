/**
 * @author Parag Majum.
 */

var CoverFlow = {

	/**
	 * @desc Handle orientation change on iphone
	 */
	updateOrientation: function(){
		switch(window.orientation){
		   case 0:
			   document.getElementsByTagName('body')[0].id = 'portrait';
			   window.scrollTo(0,1);
			   this.reset();
		       break;
		  case -90:
		  case 90:
			  document.getElementsByTagName("body")[0].id = "landscape";
			  window.scrollTo(0,1);
		      break;
		}
	},
	
	
	/**
	 * @desc Reset position of the images to default symmetric positioning
	 */
	reset: function(){
		var flip = document.getElementById('flip');
		flip.querySelector('li:first-child').className = "left";
		flip.querySelector('li:nth-child(2)').className = "center";
		flip.querySelector('li:last-child').className = "right";
	},
	
	/**
	 * @desc event binder function
	 */
	bind: function(element, type, expression, bubbling){
		bubbling = bubbling || false;
		element.addEventListener(type, expression, bubbling);
		return true;
	},
	
	/**
	 * @desc find the next closest sibling
	 */
	nextOf : function(el) {
		do {
			el = el.nextSibling;
		} while(el && el.nodeType !== 1);
		return el || [];
	},
	
	/**
	 * @desc find the previous sibling
	 */
	prevOf : function(el) {
		do {
			el = el.previousSibling;
		} while(el && el.nodeType !== 1);
		return el || [];
	},
	
	/**
	 * @desc Coverflow animation
	 */
	coverFlow: function(el){
		var l1 = this.prevOf(el); 
		var l2 = this.prevOf(l1); 
		
		var r1 = this.nextOf(el);
		var r2 = this.nextOf(r1); 
		
		r2.className = "farright";
		r1.className = "right";
		el.className = "center";
		l2.className = "farleft";
		l1.className = "left";
			
	}
};

var setup = function($){
	// NOTE: '$' here is not jQuery ;)
	return function() {
		var flip = document.getElementById('flip');
		
		$.bind(flip, 'click', function(e){
			e.preventDefault();
			var target = e.target;
			while(target.nodeName !== 'LI') {
				target = target.parentNode;
			}
			$.coverFlow(target);
		});
	}

}(CoverFlow);


window.addEventListener('DOMContentLoaded', setup, false);
window.onload = function(){
	window.scrollTo(0,1);
	window.top.scrollTo(0,1);
}
