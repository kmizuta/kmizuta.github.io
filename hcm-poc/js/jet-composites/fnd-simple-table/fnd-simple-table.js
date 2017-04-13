define(['knockout', 'ojs/ojcore', 'jquery',
    'ojs/ojknockout', 'promise', 'ojs/ojdatagrid', 'ojs/ojtable', 'ojs/ojarraytabledatasource', 'ojs/ojcollectiontabledatasource', 'ojs/ojbutton', 'ojs/ojmodel',
    'ojs/ojcollectiondatagriddatasource', 'ojs/ojarraydatagriddatasource', 'ojs/ojtabs', 'ojs/ojconveyorbelt',
    'ojs/ojchart', 'ojs/ojflattenedtreedatagriddatasource',
    'ojs/ojjsontreedatasource', 'ojs/ojradioset', 'ojs/ojcheckboxset',
    'ojs/ojrowexpander', 'ojs/ojselectcombobox',
    'ojs/ojselectcombobox', 'ojs/ojinputtext'
], function (ko, oj, $) {



    function simpleTableModel(context) {

        var self = this;
        self.url = "";
        var options = [];
        var propsPromise = context.props;
        self.column_attr = ko.observableArray();
        self.serviceURL = ko.observable();
        self.tableDS = ko.observable();
        
        

        propsPromise.then(function (props) {
            self.column_attr(props.columnsList);
            self.serviceURL(props.serviceUrl);
            
            if(props.dataSource !=  undefined){
               self.tableDS(props.dataSource); 
            }
            else{
               var cardModel = oj.Model.extend({
                    idAttribute: props.keyAttribute
               });

               var cardCollection = new oj.Collection(null, {
                    url: self.serviceURL(),
                    model: cardModel
               });
               self.tableDS(new oj.CollectionTableDataSource(cardCollection)); 
            }
            
            self.tableStyle = function () {
                var style = 'width: 100%; border-top:1px solid #d6dfe6;';
                var table = document.getElementById('clcca');
                var tableTop = table.getBoundingClientRect().top + 60;
                var windowHeight = $(window).height();
                if(tableTop > windowHeight){
                    tableTop = 270;
                }
                var height = windowHeight - tableTop + 'px;';
                style = style + 'height:' + height;
                return style;
            }
        });

        /*
         * Method exposed by the simpleTable CCA which can be invokded
         * by CCA consumers
         */
        self.simpleTableFilterMethod = function (param) {
            var ObjOjModel = oj.Model.extend({urlRoot: self.serviceURL, idAttribute: 'dealId'});
            var myObject = new ObjOjModel();
            var ObjectCollection = oj.Collection.extend({url: self.serviceURL(), model: myObject});

            var ObjectCol = new ObjectCollection();
        }
    }
    return simpleTableModel;
});