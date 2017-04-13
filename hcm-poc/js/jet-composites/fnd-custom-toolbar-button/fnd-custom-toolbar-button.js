define(['knockout', 'ojs/ojcore', 'jquery',
         'ojs/ojknockout', 'ojs/ojbutton','ojs/ojpopup'], function (ko) {
    function splitButtonModel(context) {

        var self = this;

        self.openSplitButtonPopup = function(){             
        	var tag = $(context.element).prop("tagName");
        	tag = tag.toLowerCase();
        	$(tag + ' #ocaj-split-button-popup').ojPopup('open','#ocaj-split-button-dropdown',{"my": "end top", "at": "end bottom", 'collision':'none'}); 
        }     
    }

    return splitButtonModel;
});