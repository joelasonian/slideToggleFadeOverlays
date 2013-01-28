;(function($)
{
    var st = $.fn.slideToggle;  //Grab the orginal function
    $.fn.slideToggle = function()   //and overwrite our own
    {
        // settings container
        var s = {
            args: arguments,            //grab the arguments
            that: this,                 //keep the element available for the scope of functions
            d: (this.css('display')),   //element display property
            p: this.position(),         //element position object
            w: this.width(),            //element width
            h: this.height(),           //element height
            arrEls: [],                 //an Array to keep track of children that require animation
            tkr: 0,                     //tracker var
            argsRebuild: [],            //Array used to rebuild the arguments, so we can incorporate our own
            isFuncAdded: false          //boolean var to see if we have added a user function to the return arguments
        }
        //obtain all elements that are positioned absolutely
        var x = this.children().filter(function(){
        	return $(this).css('position') == 'absolute';
        });
        // If we are currently showing the element, then this will be sliding to display none.
        if (s.d=='block'){
            //if we have any children that are absoultely displayed...
	        if (x.length > 0){
                x.each(function(){
                    var thispos = $(this).position();
                    //If this element is laying outside of the boundries of the parent element...
                    if (((thispos.left + $(this).width()) > s.w ) || ((thispos.tkrop + $(this).height()) > s.h )) 
                    {
                        //add it to the array of elements that require animation
                        s.arrEls.push($(this));
                    }
                });
                //Fade out
                if (s.arrEls.length > 0){
                    s.tkr=0;
                    s.arrEls.forEach(function(value){
                        s.tkr++;
                        //if this is the last element we are fading out- return the orginal function on callback
                        if (s.tkr === s.arrEls.length){
                            value.fadeToggle('fast', function(){
                               return st.apply(s.that, s.args);
                            });
                        } else {
                            //otherwise just fade it out
                            value.fadeToggle('fast');
                        }                        
                    });
                } else {
                    return st.apply(s.that, s.args);
                }   
		    } else {
		    	return st.apply(this, s.args);
            }
		} else {
            //if we are currently hidden then we are sliding to display block. 
			x.css('display','none');
            //rebuild the arguments to include a callback to fade in the absolutely positioned children
			for(var i=0; i<s.args.length; i++){
				if (typeof(s.args[i]) == "string") {
					s.argsRebuild.push(s.args[i]);
				}
				if (typeof(s.args[i]) == "function"){
					var userFunc = s.args[i];
					var newf = function(){
						x.fadeToggle('fast');
						userFunc();
					}
					s.argsRebuild.push(newf);
					s.isFuncAdded = true;
				}
			}
            //if no user function folded in - just add a call back to fade in the absolutely positioned children
			if(!s.isFuncAdded){
				s.argsRebuild.push(function(){
					x.fadeToggle('fast');
				});
			}
            //return the new function along with 
			return st.apply(this, s.argsRebuild);
		}
    };
})(jQuery);