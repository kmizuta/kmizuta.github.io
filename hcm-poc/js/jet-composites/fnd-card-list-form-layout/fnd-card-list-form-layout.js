define(['knockout', 'ojs/ojcore', 'jquery',
    'ojs/ojknockout', 'promise', 'ojs/ojtable', 'ojs/ojarraytabledatasource', 'ojs/ojcollectiontabledatasource', 'ojs/ojbutton', 
    'ojs/ojmodel', 'ojs/ojcollectiondatagriddatasource', 'ojs/ojarraydatagriddatasource', 'ojs/ojpagingcontrol',
    'ojs/ojpagingcontrol-model', 'ojs/ojpagingtabledatasource', 'ocaj-ccas/fnd-card-list-layout/loader', 
    'ocaj-ccas/fnd-card/loader', 'ocaj-ccas/fnd-form-card/loader', 
    'ocaj-ccas/fnd-card-view-layout/loader', 'ocaj-ccas/fnd-simple-table/loader'
], function (ko, oj, $) {

    function cardListFormLayoutModel(context) {
        var self = this;
        self.url = "";
        var options = [];
        var propsPromise = context.props;
        var element = context.element;
        self.tableDataSource = ko.observable();
        self.cardViewDataSource = ko.observable();
        self.keyAttr = ko.observable();
        self.listAttributes = ko.observableArray();
        self.serviceURL = ko.observable();
        self.cardPageSize = ko.observable(15);
        self.clickedCardId = ko.observableArray();
        self.frontColumnList = ko.observableArray();
        self.backColumnList = ko.observableArray();
        self.cardTitle = ko.observable();
        self.cardSubTitle = ko.observable();
        self.cardWidth = ko.observable();
        self.cardHeight = ko.observable();
        self.cardType = ko.observable();
        self.cardTheme = ko.observable();
        self.cardTitleClickable = ko.observable();
        
        //listening to events from CardListLayout and Card CCA
        element.addEventListener('cardTitleClicked', cardTitleEventHandler);
        element.addEventListener('cardViewClicked', cardViewEventHandler);
        element.addEventListener('listViewClicked', listViewEventHandler);

        propsPromise.then(function (props) {
            self.listAttributes = props.listViewAttributes;
            self.serviceURL = props.serviceUrl;
            self.keyAttr = props.keyAttribute;
            self.frontColumnList(props.cardFrontAttributes);
            self.backColumnList(props.cardBackAttributes);
            self.cardTitle(props.cardTitle);
            self.cardSubTitle(props.subTitle);
            self.cardWidth(props.width);
            self.cardHeight(props.height);
            self.cardTheme(props.theme);
            self.cardType(props.type);
            self.cardTitleClickable(props.titleClickable);

            //populate data from service URL
            var cardModel = oj.Model.extend({
                idAttribute: self.keyAttr
            });

            var cardCollection = new oj.Collection(null, {
                url: props.serviceUrl,
                model: cardModel
            });
            self.tableDataSource = new oj.CollectionTableDataSource(cardCollection);
            self.cardViewDataSource = new oj.PagingTableDataSource(self.tableDataSource);

            if (props.pageSize != null) {
                self.cardPageSize = props.pageSize;
            }

        });
        /*
         * Card view toggle handler
         */
        function cardViewEventHandler(event) {
            //fire custom event
            var params = {
                'bubbles': true
            };
            element.dispatchEvent(new CustomEvent('cardViewSelected', params));
        }

        /*
         * List view toggle handler
         */
        function listViewEventHandler(event) {
            //fire custom event
            var params = {
                'bubbles': true
            };
            element.dispatchEvent(new CustomEvent('listViewSelected', params));
        }

        /*
         * Handler for cardTitleClicked event
         */
        function cardTitleEventHandler(event) {
            var params = {
                'bubbles': true,
                'detail': {'cardTitle': event.detail.value}
            };
            element.dispatchEvent(new CustomEvent('cardClicked', params));
        }
    }
    return cardListFormLayoutModel;
});