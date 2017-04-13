define(['ojs/ojcore', 'knockout', 'jquery',
    'ojs/ojknockout', 'promise', 'ojs/ojdatagrid', 'ojs/ojtable', 'ojs/ojarraytabledatasource',
    'ojs/ojcollectiontabledatasource', 'ojs/ojbutton', 'ojs/ojmodel', 'ojs/ojpopup', 'ojs/ojtabs',
    'ojs/ojcollectiondatagriddatasource', 'ojs/ojarraydatagriddatasource','ojs/ojdialog'
], function(oj, ko, $) {
    function actionModel(context) {
        var self = this;
        var propsPromise = context.props;
        
        self.tabSelected = ko.observable();
        self.defaultTab = ko.observable();

        propsPromise.then(function(props) {
            self.tabSelected(props.defaultTab);
        });

        self.callTabSelection = function(data) {
            self.tabSelected(data);
        };
        
        self.closePCAHandler = function() {
            $('#contextualActionPopup').ojPopup('close');
        }
        $(document).on( 'keydown', function ( e ) {
            if ( e.keyCode === 27 ) {
                self.closePCAHandler();
            }
        });
    }
    return actionModel;
});
