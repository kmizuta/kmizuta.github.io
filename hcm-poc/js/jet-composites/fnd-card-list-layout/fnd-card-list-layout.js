define(['knockout', 'ojs/ojcore', 'jquery',
    'ojs/ojknockout', 'promise', 'ojs/ojtable', 'ojs/ojarraytabledatasource', 'ojs/ojcollectiontabledatasource', 'ojs/ojbutton', 
    'ojs/ojmodel', 'ojs/ojcollectiondatagriddatasource', 'ojs/ojarraydatagriddatasource', 'ojs/ojpagingcontrol',
    'ojs/ojpagingcontrol-model', 'ojs/ojpagingtabledatasource'
], function (ko, oj, $) {
 
    function cardListLayoutModel(context) {
        var self = this;
        self.url = "";
        var options = [];
        var propsPromise = context.props;
        var element = context.element;
        const LIST_VIEW_CONTAINER_ID = "CLL_listContainer";
        self.cardPageSize = ko.observable(15);
        self.selectedView = ko.observable();
 
        propsPromise.then(function (props) {
            self.selectedView(props.defaultView);
 
            if (props.pageSize != null) {
                self.cardPageSize(props.pageSize);
            }
            
            self.handleCardToggle = function (event, ui) {
                if (ui.option === "checked") {
                    if (ui.value == 'card') {
                        self.selectedView(props.cardViewTemplate);
                        //fire custom event
                        var params = {
                            'bubbles': true
                        };
                        element.dispatchEvent(new CustomEvent('cardViewClicked', params));
                    } else if (ui.value == 'list') {
                        self.selectedView(props.listViewTemplate);
                        var params = {
                            'bubbles': true
                        };
                        element.dispatchEvent(new CustomEvent('listViewClicked', params));
                    } else if (ui.value == 'table') {
                        self.selectedView(props.tableViewTemplate);
                    }
                }
            };
        });

        
 
        /*
         * Card view toggle handler
         */
        self.cardViewHandler = function () {
            self.selectedView('card');
 
            //fire custom event
            var params = {
                'bubbles': true
            };
            element.dispatchEvent(new CustomEvent('cardViewClicked', params));
        }
 
        /*
         * List view toggle handler
         */
        listViewHandler = function () {
            self.selectedView = 'list';
 
            //fire custom event
            var params = {
                'bubbles': true
            };
            element.dispatchEvent(new CustomEvent('listViewClicked', params));
        }
 
        /*
         * Handler for cardTitleClicked event
         */
        /*function cardTitleEventHandler(event) {
            var params = {
                'bubbles': true,
                'detail': {'value': event.detail.value}
            };
            element.dispatchEvent(new CustomEvent('cardTitleClicked', params));
        }*/
    }
    return cardListLayoutModel;
});