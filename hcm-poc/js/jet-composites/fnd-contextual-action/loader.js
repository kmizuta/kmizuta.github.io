define(['ojs/ojcore', 'knockout', 'text!./fnd-contextual-action-mobile.html', 'text!./fnd-contextual-action.html', './fnd-contextual-action',
 'text!./fnd-contextual-action.json', 'css!./fnd-contextual-action.css', 'ojs/ojcomposite'],
 function(oj, ko, mobileTemplate, desktopTemplate, viewModel, metadata, css)
 {
   oj.Composite.register('fnd-contextual-action', {
      view: {inline: "<!-- ko template: {'nodes' : templateForView} --><!-- /ko -->"},
      viewModel: {inline: viewModel},
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