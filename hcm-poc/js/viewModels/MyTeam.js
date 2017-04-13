/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout','jquery', 'ojs/ojcore', 
    'ojs/ojknockout', 'promise', 'ojs/ojtable', 'ojs/ojarraytabledatasource', 'ojs/ojcollectiontabledatasource', 'ojs/ojbutton', 
    'ojs/ojmodel', 'ojs/ojcollectiondatagriddatasource', 'ojs/ojarraydatagriddatasource', 'ojs/ojpagingcontrol',
    'ojs/ojpagingcontrol-model', 'ojs/ojpagingtabledatasource', 'jet-composites/fnd-card-list-layout/loader', 'jet-composites/fnd-faceted-search/loader',
    'jet-composites/fnd-media-card/loader', 'jet-composites/fnd-form-card/loader',  'jet-composites/fnd-simple-panel/loader',
    'jet-composites/fnd-card-view-layout/loader', 'jet-composites/fnd-simple-table/loader', 'jet-composites/fnd-list-view/loader','ojs/ojpopup','jet-composites/fnd-contextual-action/loader','ojs/ojdialog'],
 function(oj, ko, $) {
  
    function DashboardViewModel() {
                var self = this;
                self.isFilterHidden = ko.observable(true);
                self.currentMediaQuery = ko.observable();
                self.selectedEmployee = ko.observable();
                self.columnList = [
                    {"column": 'accountName', "headerText": 'Account'},
                    {"column": 'city', "headerText": 'Location'},
                    {"column": 'country', "headerText": 'Country'},
                    {"column": 'assignment', "headerText": 'Assignment'},
                    {"column": 'worker', "headerText": 'Worker'},
                    {"column": 'HireDate', "headerText": 'Hire Date'}
                    ];
                    
                self.tableColumnList = [
                    {"column": 'partyName', "headerText": 'Name'},
                    {"column": 'jobTitle', "headerText": 'Designation'},
                    {"column": 'accountName', "headerText": 'Account'},
                    {"column": 'city', "headerText": 'Location'},
                    {"column": 'country', "headerText": 'Country'}
                    ];    

                self.frontColumnList = [{"column": "email", "headerText": 'Email'},
                    {"column": 'accountName', "headerText": 'Account'},
                    {"column": 'phoneNumber', "headerText": 'Phone Number'},
                    {"column": 'city', "headerText": 'City'}];

                self.backColumnList = [
                    {"column": 'worker', "headerText": 'Worker'},
                    {"column": 'accountName', "headerText": 'Account'},
                    {"column": 'HireDate', "headerText": 'Hire Date'}];
                
                var dateFilters = [{"label": "Closing today", "value": 'today'},
                    {"label": 'Closing this week', "value": 'week'},
                    {"label": 'Closing this month', "value": 'month'},
                    {"label": 'Closing this year', "value": 'year'}];

                var amountFilters = [{"label": "Under $50,000", "value": '0-50000'},
                    {"label": '$50,000 - $200,000', "value": '50000-200000'},
                    {"label": '$200,000 - $1,000,000', "value": '200000-1000000'},
                    {"label": 'Custom Range', "value": '1'}];

                var checkboxFilters = [{"label": "Pinnacle Technologies", "value": 'Pinnacle Technologies'},
                    {"label": 'Apex Solutions', "value": 'Apex Solutions'},
                    {"label": 'ABC Info Systems', "value": 'ABC Info Systems'},
                    {"label": 'Nucleas Research', "value": 'Nucleas Research'},
                    {"label": 'Kenya Airways', "value": 'Kenya Airways'},
                    {"label": 'Gartner Corporations', "value": 'Gartner Corporations'}];

                var linkFilters = [{"label": "London", "value": 'London GB'},
                    {"label": 'Redwood City', "value": 'Redwood City'},
                    {"label": 'Chicago', "value": 'Chicago'},
                    {"label": 'San Francisco', "value": 'San Francisco'},
                    {"label": 'Hyderabad', "value": 'Hyderabad'},
                    {"label": 'Bangalore', "value": 'Bangalore'},
                    {"label": 'Shanghai', "value": 'Shanghai'}];
                
                var buttonSetFilters = [{"label": "US - Unites States", "count": '32', "value": 'US'},
                    {"label": 'CA - Canada', "count": '3', "value": 'CA'},
                    {"label": 'UK - United Kingdom', "count": '5', "value": 'UK'},
                    {"label": 'IN - India', "count": '9', "value": 'IN'}];
                
                /* chart data */
                self.reportedTimeChart = ko.observable([{
                        name: "Job Role",
                        items: [{
                                y: 7, label: '7',
                                color: '#267DB3'
                            },
                            {
                                y: 9, label: '9',
                                color: '#68C182'
                            },
                            {
                                y: 12, label: '12',
                                color: '#FAD55C'
                            },
                            {
                                y: 9, label: '9',
                                color: '#ED6647'
                            },
                            {
                                y: 13, label: '13',
                                color: '#8561C8'
                            }
                        ]
                    }]);
                self.reportedTimeGroup = ko.observable(["Director", "Line Manager", "Project Manager", "Administrator", "Developer"]);

                self.facetData = [
                    {"jsonData": checkboxFilters, "filterAttribute": "accountName", "headerText": 'Account', "type": "checkbox"},
                    {"jsonData": buttonSetFilters, "filterAttribute": "country", "headerText": 'Location', "type": "buttonSet"},
                    {"jsonData": linkFilters, "filterAttribute": "city", "headerText": 'Location', "type": "link"},
                    {"jsonData": amountFilters, "filterAttribute": "dealSize", "headerText": 'Salary', "type": "number", "rangeEnabled": true},
                    {"jsonData": dateFilters, "filterAttribute": "closeDate", "headerText": 'Hire Date', "type": "date", "rangeEnabled": true}
                    
                    ];
                self.recentItems = ko.observableArray([
                    {value: "CDRM_35016", label: "CDRM_35016"},
                    {value: "CDRM_31516", label: "CDRM_31516"}]);
                self.savedSearches = ko.observableArray([
                    {value: "My open deals", label: "My open deals"},
                    {value: "Top open deals", label: "Top open deals"},
                    {value: "Deals where I am on the team", label: "Deals where I am on the team"}]);
                self.keywordSearch = ko.observableArray([
                    {   groupId: "recent_search",
                        groupName: "Recent Items",
                        items: self.recentItems()
                    },
                    {   groupId: "saved_searches",
                        groupName: "Saved Search",
                        items: self.savedSearches()
                    }
                ]);
                self.tableData = ko.observable();
                self.cardCol = ko.observable();
                //function for getting position for popup
                  self.getPosition = function ()
                  {
                    return {'my' : 'center center',
                            'at' : 'start center',
                            'collision' : 'none'};
                  }

                //changing URL to mock rest service, removed in prod env
                self.datasource = ko.observable();

                self.serviceURL = 'http://mockrest/applcore/rest/employees';
                self.parseCardList = function (response) {
                    return response;
                };
                self.cardListModel = oj.Model.extend({
                    urlRoot: self.serviceURL,
                    idAttribute: 'partyId'
                });

                self.cardList = new self.cardListModel();
                self.CardListCollection = oj.Collection.extend({
                    url: self.serviceURL + "?limit=65",
                    model: self.cardList,
                    comparator: "partyId"
                });

                self.cardCol(new self.CardListCollection());
                
                self.tableData(new oj.CollectionTableDataSource(self.cardCol()));
                
                self.tableDataSource = ko.computed(function() {
                    return self.tableData();
                });
                self.listDataSource = ko.computed(function() {
                    return self.tableData();
                });
                self.cardViewDataSource = ko.computed(function() {
                    return new oj.PagingTableDataSource(self.tableData());
                });
                //self.cardViewDataSource = new oj.PagingTableDataSource(self.tableDataSource); 
                
                //ready event handler of fnd-card-list-layout CCA
                self.cardListCCAReadyHandler = function (viewmodel, event) {
                    var targetCCA = event.target.id;
                    if (event.type === 'ready') {
                        if (targetCCA === 'clcca') {
                            $('#CVL_listviewcard').ojListView('refresh');
                            self.isFilterHidden(true);
                            var cardListCCA = document.getElementById("clcca");
                            if (cardListCCA !== undefined && cardListCCA !== null) {
                                //listening to cardViewClicked event
                                cardListCCA.addEventListener('cardContexualEvent', cardContexualEventHandler);
                                cardListCCA.addEventListener('cardTitleClicked', cardTitleClickedHandler);
                                cardListCCA.addEventListener('cardActionsMenuEvent', cardActionsMenuEventHandler);
                            }
                        }
                    }
                };   
        
        /*
        * Handler for cardContexual event
        */
        function cardContexualEventHandler(event){
            var mediaQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
            if (window.matchMedia(mediaQuery).matches){
                setTimeout(function () {  
                self.selectedEmployee(event.detail.keyAttribute);
                var bodyAligned = document.getElementsByTagName("BODY")[0];
                $('#contextualActionPopup').ojPopup('open', '#toggleCardFltr' , {'my' : 'center center',
                            'at' : 'start center',
                            'collision' : 'none'});
                //$('#contextualActionPopup').ojPopup('open');    
                self.getTeamDetailsSpecificId(event.detail.keyAttribute);                      
            }, 0); 
            }
            else {
                setTimeout(function () {    
                    var alignId = event.detail.alignId;
                    self.selectedEmployee(event.detail.keyAttribute);
                    $('#contextualActionPopup').ojPopup('open', document.getElementById(alignId),
                                          self.getPosition());
                    self.getTeamDetailsSpecificId(event.detail.keyAttribute);                      
                }, 0);
            }
        }
        
        function closePCAFunction(){
            var facetPCA = document.getElementById("contextualActionPopup");
            facetPCA.closePCAHandler();
        }
        
        function cardActionsMenuEventHandler(event){
            //alert("Card-list actions menu align ID:"+event.detail.alignId);
        }
        
        function cardTitleClickedHandler(event){
            //alert("Card-list clicked card ID:"+event.detail.keyAttribute);
        }
        
        self.toggleFilter = function (){
            var facetSearch = document.getElementById("fndfs");
            self.isFilterHidden(facetSearch.toggleFilterHandler());
        }
        
        jQuery(window).resize(function($){
            var small = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
            var medium = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.MD_ONLY);
            var large = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.LG_ONLY);
            if (window.matchMedia(small).matches){
                self.currentMediaQuery('SM');
            }
            else if (window.matchMedia(medium).matches){
                self.currentMediaQuery('MD');
            }
            else if (window.matchMedia(large).matches){
                self.currentMediaQuery('LG');
            }
            else {
                self.currentMediaQuery('XL');
            }
            var resultSection = jQuery('#FS_result');
            var fs_root = jQuery('#FS_root');
            if (resultSection !== undefined && resultSection.offset() !== undefined) {
                if (self.isFilterHidden()) {
                    width = fs_root.width() + 'px';
                } else {
                    width = fs_root.width() - 360 + 'px';
                }
                resultSection.css('width', width);
            }
        });
        
        self.cardStyleClass = ko.computed(function() {
                    console.log(self.isFilterHidden());
                if(self.currentMediaQuery() === 'XL'){
                    return (self.isFilterHidden() ? 'oj-flex-item oj-sm-12 oj-md-6 oj-lg-4 oj-xl-3' : 'oj-flex-item oj-sm-12 oj-md-12 oj-lg-6 oj-xl-4');
                }
                else if(self.currentMediaQuery() === 'LG'){
                    return (self.isFilterHidden() ? 'oj-flex-item oj-sm-12 oj-md-6 oj-lg-4 oj-xl-4' : 'oj-flex-item oj-sm-12 oj-md-12 oj-lg-6 oj-xl-6');
                }
                else if(self.currentMediaQuery() === 'MD'){
                    return (self.isFilterHidden() ? 'oj-flex-item oj-sm-12 oj-md-6 oj-lg-4 oj-xl-3' : 'oj-flex-item oj-sm-12 oj-md-12 oj-lg-6 oj-xl-4');
                }
                else if(self.currentMediaQuery() === 'SM'){
                    return (self.isFilterHidden() ? 'oj-flex-item oj-sm-12 oj-md-6 oj-lg-4 oj-xl-3' : 'oj-flex-item oj-sm-12 oj-md-12 oj-lg-6 oj-xl-4');
                }
                else{
                    return (self.isFilterHidden() ? 'oj-flex-item oj-sm-12 oj-md-6 oj-lg-4 oj-xl-3' : 'oj-flex-item oj-sm-12 oj-md-12 oj-lg-6 oj-xl-4');
                }
        });
        
        self.calcTime = function (timezone) {
            // create Date object for current location
            var d = new Date();
            var offset = '0';
            var zone = 'PST';
            if(timezone === 'Chicago' || timezone === 'DALLAS' || timezone === 'Redwood City'){
                offset = '-7.0';
            }
            else if(timezone === 'Shanghai' || timezone === 'Wuhan Shi'){
                offset = '+8.0';
                zone = 'CST';
            }
            else{
                offset = '0';
                zone = 'GMT';
            }
            var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
            var nd = new Date(utc + (3600000*offset));
            var mins = nd.getMinutes() + '';
            if(mins.length === 1){
                mins = '0' + mins;
            }
            var time= nd.getHours() + ':' + mins + ' ' + zone;
            return time;    
        }

      // Below are a subset of the ViewModel methods invoked by the ojModule binding
      // Please reference the ojModule jsDoc for additionaly available methods.
 
      /**
       * Optional ViewModel method invoked when this ViewModel is about to be
       * used for the View transition.  The application can put data fetch logic
       * here that can return a Promise which will delay the handleAttached function
       * call below until the Promise is resolved.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @return {Promise|undefined} - If the callback returns a Promise, the next phase (attaching DOM) will be delayed until
       * the promise is resolved
       */
      self.handleActivated = function(info) {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @param {boolean} info.fromCache - A boolean indicating whether the module was retrieved from cache.
       */
      self.handleAttached = function(info) {
        // Implement if needed
      };


      /**
       * Optional ViewModel method invoked after the bindings are applied on this View. 
       * If the current View is retrieved from cache, the bindings will not be re-applied
       * and this callback will not be invoked.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       */
      self.handleBindingsApplied = function(info) {
        // Implement if needed
      };

      /*
       * Optional ViewModel method invoked after the View is removed from the
       * document DOM.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @param {Array} info.cachedNodes - An Array containing cached nodes for the View if the cache is enabled.
       */
      self.handleDetached = function(info) {
        // Implement if needed
      };
      self.empUrl = ko.observable();
      self.headerTitlePCA = ko.observable();
      self.jobTitlePCA = ko.observable();
      self.imageSourcePCA = ko.observable();
      self.emailPCA = ko.observable();
      self.phoneNumberPCA = ko.observable();
      self.AddressLine1PCA = ko.observable();
      self.cityPCA = ko.observable();
      self.postalCodePCA = ko.observable();
      self.statePCA = ko.observable();
      self.countryPCA = ko.observable();
      self.actionsTabData = ko.observableArray();
      self.tabContent = ko.observable();
      self.actionTabSelected = ko.observable();
      self.actionsUrl = ko.observable();
      self.navigationTabData = ko.observableArray();
      self.navigationUrl = ko.observable();
      self.empPrInfoData = ko.observableArray();
      self.accountNamePCA = ko.observable();
      self.addressLine2PCA = ko.observable();
      self.getTeamDetailsSpecificId = function(id){
          self.empUrl('http://mockrest/applcore/rest/employees/'+id);
          $.getJSON(self.empUrl(), function (data) {
              self.empPrInfoData.push(data);
              self.headerTitlePCA(data.firstName +" "+data.lastName);
              self.jobTitlePCA(data.jobTitle);
              self.imageSourcePCA(data.userImage);
              self.emailPCA(data.email);
              self.phoneNumberPCA(data.WorkPhonecountryCode +'-'+data.WorkPhoneAreaCode+'-'+data.WorkPhoneNumber);
              self.AddressLine1PCA(data.addressLine1);
              self.cityPCA(data.city);
              self.postalCodePCA(data.PostalCode);
              self.statePCA(data.state);
              self.countryPCA(data.country);
              self.accountNamePCA(data.accountName);
              self.addressLine2PCA(data.addressLine2);
          });
          self.actionsUrl('http://mockrest/applcore/rest/employee/actions');
          $.getJSON(self.actionsUrl(), function (data) {
              self.actionsTabData(data.items);
              self.actionTabSelected(0);
              self.tabContent(data.items[0].actions);
          });
          self.navigationUrl('http://mockrest/applcore/rest/employee/tabs');
          $.getJSON(self.navigationUrl(), function (data) {
                self.navigationTabData(data.items);
            });
      }
      
      self.contentSelection = function(data) {
            self.tabContent(self.actionsTabData()[data].actions);
            self.actionTabSelected(data);
      };
      
      self.pcaContentWidth = function () {
          var mediaQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
          if (window.matchMedia(mediaQuery).matches){
              return 310;
          }
          else{
                return 400;
          }
      }
      
      self.goToTransferEmployee = function () {
            var eParams = {
                'bubbles': true,
                'detail': {
                    'detailModuleName': 'TransferEmployee',
                    'detailParams': self.selectedEmployee()
                }
            };
            var shellElements = document.getElementsByTagName('fnd-fuse-overview');
            if (shellElements != undefined && shellElements != null) {
                shellElements[0].dispatchEvent(new CustomEvent('FND_OpenMainTask', eParams));
            }
        }
    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constrcuted
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new DashboardViewModel();
  }
);
