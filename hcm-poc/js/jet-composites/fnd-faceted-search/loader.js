/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
define(['ojs/ojcore', 'knockout','jquery', 'text!./fnd-faceted-search-mobile.html', 'text!./fnd-faceted-search.html',
    './fnd-faceted-search', 'text!./fnd-faceted-search.json','css!./fnd-faceted-search.css', 'ojs/ojcomposite'],
 function(oj, ko, $, mobileTemplate, desktopTemplate, viewModel, metadata, css)
 {
   oj.Composite.register('fnd-faceted-search', {
      viewModel: {inline: viewModel},
      view: {inline: "<!-- ko template: {'nodes' : templateForView} --><!-- /ko -->"},
      metadata: {inline: JSON.parse(metadata)},
      css: {inline: css}
    });
    
    viewModel.prototype.activated = function(context) {
        var mediaQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
        if (window.matchMedia(mediaQuery).matches){
            this.templateForView = ko.utils.parseHtmlFragment(mobileTemplate);
        }
        else {
            this.templateForView = ko.utils.parseHtmlFragment(desktopTemplate);
        }        
    }; 
 }
);

