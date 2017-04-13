define(['knockout', 'ojs/ojcore', 'jquery',
    'ojs/ojknockout', 'promise', 'ojs/ojdatagrid', 'ojs/ojtable', 'ojs/ojarraytabledatasource', 
    'ojs/ojcollectiontabledatasource', 'ojs/ojbutton', 'ojs/ojmodel',
    'ojs/ojcollectiondatagriddatasource', 'ojs/ojarraydatagriddatasource'
], function (ko, oj, $) {

    function cardModel(context) {
        var self = this;
        self.url = "";
        var options = [];
        var propsPromise = context.props;
        var element = context.element;
        self.flipFlag = ko.observable('front');
        var CARD_BACK = '#C_backSlot';

        propsPromise.then(function (props) {

        });

        /*
         * Checks for empty back facet
         */
        setTimeout(function () {
            if ($(CARD_BACK).children().length < 1) {
                self.flipFlag('empty');
            }
        }, 0);

        /*
         * card flip flag
         */
        self.cardFlipFlag = ko.computed(function () {
            return self.flipFlag();
        });

        /*
         * Card flip handler
         */
        self.cardFlipHandler = function (model, event) {
            $(element.childNodes[0]).toggleClass('flipped');
            if (self.flipFlag() == 'front') {
                self.flipFlag('back');
            } else {
                self.flipFlag('front');
            }
        }

        /*
         * Card title handler
         */
        self.cardTitleHandler = function (paramTitle) {
            //fire custom event
            var params = {
                'bubbles': true,
                'detail': {'cardTitle': paramTitle}
            };
            element.dispatchEvent(new CustomEvent('cardTitleClicked', params));
        }
    }
    return cardModel;
});