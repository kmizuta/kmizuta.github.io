define(['knockout', 'ojs/ojcore', 'jquery',
    'ojs/ojknockout', 'promise', 'ojs/ojdatagrid', 'ojs/ojtable', 'ojs/ojarraytabledatasource', 'ojs/ojcollectiontabledatasource', 'ojs/ojbutton', 'ojs/ojmodel',
    'ojs/ojcollectiondatagriddatasource', 'ojs/ojarraydatagriddatasource'
], function (ko, oj, $) {

    function formCardModel(context) {
        var self = this;
        self.url = "";
        var options = [];
        var propsPromise = context.props;
        var element = context.element;
        self.cardAttributes = ko.observable();
        self.rowData = ko.observable();

        propsPromise.then(function (props) {
            self.cardAttributes(props.formCardAttributes);
            self.rowData(props.rowData);
        });
    }
    return formCardModel;
});