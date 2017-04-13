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
        self.unique = context.unique;
        self.pcaFlag = ko.observable(false);
        self.cardWidth = ko.observable();
        self.selectedItem = ko.observable();
        self.isDocElement = ko.observable(false);
        
        self.isMobile = function () {
            var isMobile = false;
            var mediaQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
            if (window.matchMedia(mediaQuery).matches){
                isMobile = true;
            }
            else{
                isMobile = false;
            }
            return isMobile;
        }

        propsPromise.then(function (props) {
            if(navigator.userAgent.indexOf("Firefox") != -1 || navigator.userAgent.indexOf("Trident") != -1){
                self.isDocElement(true);
            }
            else{
                self.isDocElement(false);
            }
        });
        
        self.style = function () {
            var mediaQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
            if (window.matchMedia(mediaQuery).matches){
                return 'width:100%; height: 100vh;';
            }
            else{
                return 'width:100%;';
            }
        }

        /*
         * Hide PCA
         * @returns {none}
         */
        self.hidePCAHanlder = function (selectedItem) {
            self.pcaFlag(false);
            self.selectedItem(selectedItem);
        }
        
        /*
         * Show PCA
         * @returns {none}
         */
        self.showPCAHanlder = function (selectedItem) {
            self.pcaFlag(true);
            self.selectedItem(selectedItem);
        }
        
        /*
         * Raises card PCA event
         * @returns {none}
         */
        self.launchCardPCAHanlder = function (pcaAlingId, keyAttr) {
            var params = {
                'bubbles': true,
                'detail': {'alignId': pcaAlingId, 'keyAttribute': keyAttr}
            };
            element.dispatchEvent(new CustomEvent('cardContexualEvent', params));
        }
        
        /*
         * Raises card actions menu event
         * @param {type} alignId
         * @returns {none}
         */
        self.launchCardActionsMenuHanlder = function (alignId) {
            var params = {
                'bubbles': true,
                'detail': {'alignId': alignId}
            };
            element.dispatchEvent(new CustomEvent('cardActionsMenuEvent', params));
        }

        /*
         * Card title handler
         */
        self.cardTitleHandler = function (paramTitle) {
            //fire custom event
            var params = {
                'bubbles': true,
                'detail': {'keyAttribute': paramTitle}
            };
            element.dispatchEvent(new CustomEvent('cardTitleClicked', params));
        }
    }
    return cardModel;
});