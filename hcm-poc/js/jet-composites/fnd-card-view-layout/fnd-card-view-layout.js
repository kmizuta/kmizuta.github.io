define(['knockout', 'ojs/ojcore', 'jquery',
    'ojs/ojknockout', 'promise', 'ojs/ojtable', 'ojs/ojarraytabledatasource', 'ojs/ojcollectiontabledatasource', 
    'ojs/ojbutton', 'ojs/ojmodel', 'ojs/ojcollectiondatagriddatasource', 'ojs/ojarraydatagriddatasource', 'ojs/ojpagingcontrol',
    'ojs/ojpagingcontrol-model', 'ojs/ojpagingtabledatasource'
], function (ko, oj, $) {
 
    function cardListLayoutModel(context) {
        var self = this;
        self.url = "";
        var options = [];
        var propsPromise = context.props;
        var element = context.element;
        self.isDocElement = ko.observable(false);
        
        propsPromise.then(function (props) {
            
            if(navigator.userAgent.indexOf("Firefox") != -1 || navigator.userAgent.indexOf("Trident") != -1){
                self.isDocElement(true);
            }
            else{
                self.isDocElement(false);
            }
            
            setTimeout(function () {
               if(props.scrollPolicy === 'loadMoreOnScroll') {
                  //$('#CVL_listviewcard').ojListView({ "scrollPolicy": "loadMoreOnScroll" });   
               }
            }, 0); 
            
        });
        
        self.style = function () {
            var mediaQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
            if (window.matchMedia(mediaQuery).matches){
                return 'width:100%;min-height:100px;height:100vh;';
            }
            else{
                return 'width:100%;min-height:100px;';
            }
        }
    }
    return cardListLayoutModel;
});