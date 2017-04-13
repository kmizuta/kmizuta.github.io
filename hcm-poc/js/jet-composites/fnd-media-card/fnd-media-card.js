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
        self.flipFlag = ko.observable('front');
        self.pcaFlag = ko.observable(false);
        self.cardWidth = ko.observable();
        var CARD_BACK = '#C_backSlot';
        
        self.pcaFlagRendered = function() {
            var isMobile = false;
            var mediaQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
            if (window.matchMedia(mediaQuery).matches){
                isMobile = true;
            }
            else{
                isMobile = false;
            }
            return isMobile || self.pcaFlag();
        }

        propsPromise.then(function (props) {
            /*
             * Checks for empty back facet
             */
            setTimeout(function () {
                if ($(CARD_BACK).children().length < 1) {
                    //self.flipFlag('empty');
                }
                if ($("#C_card") !== undefined) {
                    var width = $("#C_card").width() - 41;
                    self.cardWidth(width);
                }
                else{
                    self.cardWidth(props.width - 41);
                }
            }, 0);
            var mediaQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
            if (window.matchMedia(mediaQuery).matches){
                self.pcaFlag(true);
            }
        });

        

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
            //console.log($(element.childNodes[0].childNodes[5]));
            //$("#C_cardContainer").toggleClass('flipped');
            $(element.childNodes[0]).toggleClass('flipped');
            //$(element.childNodes[0].childNodes[5]).toggleClass('flipped');
            if (self.flipFlag() == 'front') {
                self.flipFlag('back');
            } else {
                self.flipFlag('front');
            }
        }
        
        /*
         * Hide PCA
         * @returns {none}
         */
        self.hidePCAHanlder = function () {
            self.pcaFlag(false);
        }
        
        /*
         * Show PCA
         * @returns {none}
         */
        self.showPCAHanlder = function () {
            self.pcaFlag(true);
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
