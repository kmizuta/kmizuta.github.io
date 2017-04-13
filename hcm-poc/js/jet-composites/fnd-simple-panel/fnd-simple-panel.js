define(['knockout', 'ojs/ojcore', 'jquery',
    'ojs/ojknockout', 'ojs/ojbutton', 'ojs/ojconveyorbelt',
     'jet-composites/fnd-custom-toolbar-button/loader',
    'ojs/ojpopup' ], function (ko, oj) {

    function pageHeaderModel(context) {
 
        var self = this; 
        self.profileSlot = ko.observable(false);
        self.commonActionSlot = ko.observable(false);
        self.subHeaderSlot = ko.observable(false);
        self.seededButtonSlot = ko.observable(false);
        self.customButtonSlot = ko.observable(false);
        self.enabledButtons = ko.observableArray();
        self.moveWidth = ko.observable(0);
        self.mobileMargin = ko.observable();
        self.showPaddingDiv = ko.observable(false);
        self.paddingDivHeight = ko.observable('0px');

        var elementWidth = 0;
        var initPageHeaderTop = 0;
        var mediaQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
 
        self.stickyHeaderEnabled = ko.observable(false);
 
        //bindingsApplied event to listen to bindings and finding the slot counts
        self.bindingsApplied = function (context) {
            var propsPromise = context.props;
            var slotCount = context.slotNodeCounts;

            propsPromise.then(function (props) {

                //Map default to props 
                var defaultButtons = ["cancelRendered", "doneRendered", "saveRendered", "saveAndCloseRendered", "saveAndCreateAnotherRendered", "editRendered"] ;

                defaultButtons.map(function(data){
                    if(props.hasOwnProperty(data) && props[data] === true) {
                        self.enabledButtons.push(data);
                    }
                });

                self.stickyHeaderEnabled(props.stickyHeaderEnabled);
                
                //If on mobile
                if (window.matchMedia(mediaQuery).matches) {
                    self.stickyHeaderEnabled = ko.observable(false);

                    //Check if button count is greater than 2 and add ellipsis
                    if(self.enabledButtons().length > 2) {
                        //Check if the custom buttons are enabled and if they are enabled, add them to the popup
                        if(props.saveRendered && props.saveAndCloseRendered && (props.primarySave == 'saveAndClose' || props.primarySave == 'save')) {
                            $('.ocaj-simplepanel-custom-buttons').hide();

                            //Create normal buttons 
                            var buttons = '<button id="ocaj-save-button"></button>';
                            $(buttons).appendTo('.ocaj-simplepanel-buttonpopup');
                            $('#ocaj-save-button').ojButton({
                                label: 'Save'
                            });

                            var buttons1 = '<button id="ocaj-sac-button"></button>';
                            $(buttons1).appendTo('.ocaj-simplepanel-buttonpopup');
                            $('#ocaj-sac-button').ojButton({
                                label: 'Save and Close'
                            });
                        }

                        $('.ocaj-simplepanel-buttoncontainer').find('.ocaj-simplepanel-pagebuttons[ocaj-button-rendered=true]').appendTo('.ocaj-simplepanel-buttonpopup');
                    }

                    //If simple panel is on detail page, bring the title and train to content
                    if(props.detailPage){
                        $('.ocaj-simplepanel-train').prependTo('.ocaj-simplepanel-content');
                        $('.ocaj-simplepanel-fullpageheader').prependTo('.ocaj-simplepanel-content');
                        $('.ocaj-simplepanel-fullpageheader h2.oj-header').width('calc(100vw - 20px');
                    }
                }
     
                if (self.stickyHeaderEnabled()) {
                    $(window).on('resize', function () {
                        //Worry about resizing only above 767px. TODO: Change this to take parent height - Refactor!!!
                        if($(window).width() > 767) {
                            //Figure out the page-header container's width for sticky header to get relevant width each time screen resizes
                            elementWidth = $(context.element).width();

                            //Apply the newly calculated width to sticky header (If its present in the DOM)
                            $('.ocaj-simplepanel-sticky').css('width', elementWidth);

                            self.moveWidth(self.evaluateWidth());
                        }
                    });
     
                    //Sticky header
                    $(window).scroll(function () {
                        if (initPageHeaderTop == 0)
                            if($('.ocaj-simplepanel-container') !== undefined && $('.ocaj-simplepanel-container').offset() !== undefined){
                                initPageHeaderTop = $('.ocaj-simplepanel-container').offset().top;
                            }
     
                        if ($(window).scrollTop() >= initPageHeaderTop) {
                            $('.ocaj-simplepanel-container').addClass("ocaj-simplepanel-sticky");
                            $('.ocaj-simplepanel-sticky').css('width', elementWidth);
                            self.showPaddingDiv(true);
                            self.paddingDivHeight($('.ocaj-simplepanel-sticky').outerHeight( true ) + 'px');
                        } else {
                            $('.ocaj-simplepanel-sticky').css('width', 'initial');
                            $('.ocaj-simplepanel-container').removeClass("ocaj-simplepanel-sticky");
                            self.showPaddingDiv(false);
                            self.paddingDivHeight('0px');
                        }
                    });
                }

                self.updateMargin = function(margin){
                    self.mobileMargin(margin + 'px');
                }

                var desktopTitleWidth = 0;
                self.evaluateWidth = function(){
                    var centerWidth = 0;
                    var titleWidth = 0;
                    var spaceForTitle = 0;

                    //Find the width of the simple panel
                    var elementWidth = $(context.element).outerWidth();

                    //If on mobile, 
                    if (window.matchMedia(mediaQuery).matches) {

                        //If on detail page the title takes the width of the content area
                        if(props.detailPage){
                            return '100vw';
                        }
                        //Else, calculate the width for center alignment
                        else {
                            spaceForTitle = elementWidth - 30/* 30 for navigator icon */ - $('.ocaj-simplepanel-buttoncontainer').outerWidth( true );
                            
                            //Calculate the center of the space available for title
                            centerWidth = spaceForTitle/2;

                            //Calculate the width of the title
                            titleWidth = $('.ocaj-simplepanel-fullpageheader h2.oj-header').outerWidth();

                            //If the width of title is longer than available space, the available space becomes the width of the title
                            if(titleWidth > spaceForTitle) {
                                return (spaceForTitle + 'px');
                            }
                            //Else title starts from center minus the half of title width
                            else {
                                self.updateMargin( centerWidth - (titleWidth / 2) );
                                return (titleWidth + 'px') ;
                            }
                            
                        }
                    }
                    //If on desktop
                    else {
                        if(props.titleWidth !== undefined) {
                            return props.titleWidth;
                        }
                        else {
                            //Find the outer width of the button container to assign remaining width to the title
                            var buttonWidth = $(context.element).find('.ocaj-simplepanel-buttoncontainer').outerWidth( true );

                            //If-else loop is a temporary fix to adjust the pixel width of the title for the first time it loads
                            if(desktopTitleWidth == 0) {

                                //Subtract the button width from the total width of simple panel and the profile width and the left margin for title and profile slot (20px)
                                desktopTitleWidth = elementWidth - buttonWidth - parseInt(props.profileWidth) - 20;
                                desktopTitleWidth = desktopTitleWidth - 250;
                            }
                            else {

                                //Subtract the button width from the total width of simple panel and the profile width and the left margin for title and profile slot (20px)
                                desktopTitleWidth = elementWidth - buttonWidth - parseInt(props.profileWidth) - 20;
                            }
                            

                            return (desktopTitleWidth+'px');
                        }
                    } 
                };

                self.moveWidth(self.evaluateWidth());

            });


            self.openButtonPopup = function(){
                $('.ocaj-simplepanel-buttonpopup').ojPopup('open', 'body', {my: 'bottom', at: 'bottom'});

                //Bind the modal layer to close the popup. TODO: This should not be required. Need to check why modal popup is not cosing without this.
                $('.oj-component-overlay.oj-popup-layer').on('click', function(){
                    $('.ocaj-simplepanel-buttonpopup').ojPopup('close');
                });
            }
 
            //Figure out the page-header container's width for sticky header to get relevant width
            elementWidth = $(context.element).width();

            //Calculate slots used
            slotCount.then(function (data) {
                if (data['ocaj-simplepanel-profile-slot'] > 0) {
                    self.profileSlot(true);
                }
 
                if (data['ocaj-simplepanel-common-actions'] > 0) {
                    self.commonActionSlot(true);
                }
 
                if (data['ocaj-simplepanel-sub-header-slot'] > 0) {
                    self.subHeaderSlot(true);
                }
 
                if (data['ocaj-simplepanel-seeded-buttons'] > 0) {
                    self.seededButtonSlot(true);
                }
 
                if (data['ocaj-simplepanel-custom-buttons'] > 0) {
                    self.customButtonSlot(true);
                }
 
            });
        }
        
        self.launchNavigator = function (event) {
            var params = {
                'bubbles': false
            };
            document.getElementsByTagName('fnd-navigator')[0].dispatchEvent(new CustomEvent('FND_Launch_Navigator', params));
        };
    }

    return pageHeaderModel;
});