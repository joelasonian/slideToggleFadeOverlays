jQuery's slideToggle() extended fading absolutely positioned children
=====================================================================

jQuery's native slideToggle function generates an undesirable effect when applied to a DOM element containing absoultely positined children landing on or outside the parent's boundries.  jQuery hides the overflow of the element upon animating to achieve the animation.  This will appear to snap off any portion of any child element hanging outside of the borders of the parent.   This extension of the slideToggle function will first look for offending items amongst the children and quickly fade them out before performing the slide animation.   Likewise all absolutely positioned elements will be faded in a callback function.