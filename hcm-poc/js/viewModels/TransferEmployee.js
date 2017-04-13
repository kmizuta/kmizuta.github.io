/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojcomposite', 'ojs/ojinputtext',
    'jet-composites/fnd-simple-panel/loader', 'jet-composites/fnd-panel-form/loader',
    'ojs/ojtrain', 'ojs/ojcollapsible', 'ojs/ojbutton', 'promise', 'ojs/ojlistview', 'ojs/ojarraytabledatasource', 'ojs/ojchart', 'ojs/ojtoolbar', 'ojs/ojtable'],
        function (oj, ko, $) {
            function TransferEmployeeViewModel() {
                var self = this;
                self.render = ko.observable(true);
                self.readOnly = ko.observable(true);
                self.currentStepValue = ko.observable('stp1');
                self.currentStepValue.subscribe(function (data) {
                    console.log(data);
                });
                self.stepArray = ko.observableArray([
                    {label: 'Employment', id: 'stp1'},
                    {label: 'Compensation', id: 'stp2'},
                    {label: 'Roles', id: 'stp3'},
                    {label: 'Review', id: 'stp4'}
                ]);
                self.empDetailsURL = ko.observable();
                self.title = ko.observable();
                self.userPhoto = ko.observable();
                self.salaryTab = ko.observable(0);

                function _findSelectedTabLabel(id) {
                    var selectedLabel = null;
                    self.stepArray().map(function (data) {
                        if (data.id === id) {
                            selectedLabel = data.label;
                        }
                    });
                    return selectedLabel;
                }

                self.currentStepLabel = ko.pureComputed(function () {
                    var returnVal = _findSelectedTabLabel(self.currentStepValue());
                    return returnVal;
                });

                self.getEmployeeTitle = function (param) {
                    var baseURL = 'http://mockrest/applcore/rest/employees';
                    self.empDetailsURL(baseURL + '/' + param);
                    console.log(self.empDetailsURL());
                    $.getJSON(self.empDetailsURL(), function (data) {
                        self.title('Transfer ' + data.partyName);
                        controllerModel.dummyName(data.partyName);
                        self.userPhoto(data.userImage);
                    });
                    return self.title();
                };
                self.closeDetail = function () {

                    self.render(false);
                };
                self.expanDetail = function () {

                    self.render(true);
                };
//                self.currentStepValueText = function () {
//                    return ($("#train").ojTrain("getStep", self.currentStepValue())).label;
//                };

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
                self.managerDetails;

                self.handleActivated = function (info) {
                    var dummyArray = ko.observableArray();
                    $.getJSON('http://mockrest/applcore/rest/employee/managerDetails', function (managerData) {
                        for (data in managerData.managers) {
                            dummyArray.push(managerData.managers[data]);
                        }
                    });

                    self.managerDetails = new oj.ArrayTableDataSource(dummyArray, {idAttribute: "Name"});
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
                self.handleAttached = function (info) {
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
                self.handleBindingsApplied = function (info) {
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
                self.handleDetached = function (info) {
                    // Implement if needed
                };

                self.beforeCollapse = function () {
                    if (window.matchMedia(oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY)).matches) {
                        return false;
                    }
                    return true;
                }

                self.disabledCollapse = function () {
                    return false;
                }

                self.cancelTransferEmployee = function () {
                    var eParams = {
                        'bubbles': true
                    };
                    var shellElements = document.getElementsByTagName('fnd-fuse-overview');
                    if (shellElements != undefined && shellElements != null) {
                        shellElements[0].dispatchEvent(new CustomEvent('FND_CloseMainTask', eParams));
                    }
                    self.currentStepValue = ko.observable('stp1');
                }


                /* toggle button variables */
                self.stackValue = ko.observable('off');
                self.orientationValue = ko.observable('vertical');

                /* chart data */
                var barSeries = [{name: "Amount", items: [29, 29]}];

                var barGroups = ["Current", "Proposed"];

                self.barSeriesValueSalary = ko.observableArray(barSeries);
                self.barGroupsValueSalary = ko.observableArray(barGroups);

                var constantLineY = {referenceObjects: [
                        {text: 'Maximum', type: 'line', value: 62, color: '#b20000', displayInLegend: 'on', lineWidth: 3, location: 'back', shortDesc: 'Sample Reference Line'},
                        {text: 'Mid point', type: 'line', value: 45, color: '#0042b2', displayInLegend: 'on', lineWidth: 3, location: 'back', shortDesc: 'Sample Reference Line'},
                        {text: 'Minimum', type: 'line', value: 30, color: '#b20000', displayInLegend: 'on', lineWidth: 3, location: 'back', shortDesc: 'Sample Reference Line'}
                    ]};

                self.yAxisData = ko.observable(constantLineY);

                var colorHandler = new oj.ColorAttributeGroupHandler();

                /* chart data History */
                var barSeries = [{name: "Percentage Change", items: [
                            {y: 0, z: 10},
                            {y: 0, z: 10},
                            {y: 0, z: 10},
                            {y: 0, z: 10},
                            {y: 3.63, z: 2, color: colorHandler.getValue(0)},
                            {y: 3.38, z: 2, color: colorHandler.getValue(0)},
                            {y: 3.5, z: 2, color: colorHandler.getValue(0)},
                            {y: -38.75, z: 2, color: colorHandler.getValue(0)},
                            {y: 1, z: 2, color: colorHandler.getValue(0)}
                        ]}];
                var barGroups = ["1999", "2001", "2003", "2005", "2007", "2009", "2011", "2013", "2015"];

                self.barSeriesValueHistory = ko.observableArray(barSeries);
                self.barGroupsValueHistory = ko.observableArray(barGroups);

                var converterFactory = oj.Validation.converterFactory('number');
                self.currencyConverter = converterFactory.createConverter({style: 'currency', currency: 'USD'});
                self.percentConverter = {
                    format: function (value) {
                        return value + '%';
                    }
                };

                /* chart data Growth Rate*/
                var barSeries = [{name: "Percentage Change", items: [
                            {y: 0.33, z: 50, label: "0.33%", color: colorHandler.getValue(0)},
                            {y: -6.44, z: 50, label: "-6.44%", color: colorHandler.getValue(0)},
                            {y: -1.82, z: 50, label: "-1.82%", color: colorHandler.getValue(0)},
                        ]}];
                var barGroups = ["1 Year", "3 Year", "5 Year", "10 Year"];

                self.barSeriesValueGrowthRate = ko.observableArray(barSeries);
                self.barGroupsValueGrowthRate = ko.observableArray(barGroups);


                self.lineTypeValue = ko.observable('stepped');

                /* chart data Salary History*/
                var lineSeries = [{name: "Salary History", items: [40, 40, 40, 40, 40, 40, 40, 40, 42, 43, 44, 45, 46, 47, 29, 29]}];

                var lineGroups = ["1999", "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15"];


                this.lineSeriesValue = ko.observableArray(lineSeries);
                this.lineGroupsValue = ko.observableArray(lineGroups);

                self.dualY = ko.observable('on');
                self.splitterValue = ko.observable(0.5);

                /* chart data comp-ratio*/
                var dualYSeries = [{name: "Salary History", items: [40, 40, 40, 40, 40, 40, 40, 40, 42, 43, 44, 45, 46, 47, 29, 29]},
                    {name: "Comp Ratio", items: [40, 40, 40, 40, 40, 40, 40, 40, 42, 43, 44, 45, 46, 47, 29, 29], assignedToY2: "on"}];

                var dualYGroups = ["1999", "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15"];

                self.lineSeriesDualValue = ko.observableArray(dualYSeries);
                self.lineGroupsDualValue = ko.observableArray(dualYGroups);

                /* Salary History */
                var deptArray = [
                    {
                        'RoleName': 'GSE PROCUREMENT UHP',
                        'Date': '04/22/16',
                        'Provision': 'External'
                    },
                    {
                        'RoleName': 'GSE WEBCLOCK UHP',
                        'Date': '03/18/16',
                        'Provision': 'External'
                    },
                    {
                        'RoleName': 'GSE ANALYTICS UHP',
                        'Date': '08/21/15',
                        'Provision': 'External'
                    },
                    {
                        'RoleName': 'GSE RECEIPTS UHP',
                        'Date': '08/20/15',
                        'Provision': 'External'
                    },
                    {
                        'RoleName': 'GSE DASHBOARD UHP',
                        'Date': '08/19/15',
                        'Provision': 'External'
                    }
                ];
                self.datasource = new oj.ArrayTableDataSource(deptArray, {idAttribute: 'RoleName'});

                var requestArray = [
                    {
                        'RoleName': 'GSE PRODMANAGEMENT UHP',
                        'Status': 'Pending',
                        'Date': '04/09/17',
                        'Provision': 'External'
                    }
                ];
                self.requestDatasource = new oj.ArrayTableDataSource(requestArray, {idAttribute: 'RoleName'});

                /*Other Compensation */
                var deptArray1 = [{Plan: 'Award', Option: 'Quality Award', StartDate: '02/02/17', EndDate: '', Value: 100, Units: 'US Dollar', AwardFrequency: 'Once', Status: 'New'}];
                self.datasource1 = new oj.ArrayTableDataSource(deptArray1, {idAttribute: 'StartDate'});

                self.nextStep = function () {
                    var next = $("#transferEmplyeeTrain").ojTrain("nextSelectableStep");
                    if (next != null)
                        self.currentStepValue(next);
                }

                self.previousStep = function () {
                    var prev = $("#transferEmplyeeTrain").ojTrain("previousSelectableStep");
                    if (prev != null)
                        self.currentStepValue(prev);
                }

//                self.trainStopHandler = function (event, data) {
//                    if (this == event.target) {
//                        console.log("optionChange: " + event.target.id + " data {" +
//                                " previousValue: " + data.previousValue + "; value: " + data.value + "}");
//                        // memorize the last disclosed tab, so that when returning from detail,
//                        // we have the correct tab disclosed.
//                        self.disclosedTabIndex(data.value);
//                    }
//                };

                self.commentsAdded = ko.observable(false);

                self.addComments = function () {
                    self.commentsAdded(true);
                }

            }
            /*
             * Returns a constructor for the ViewModel so that the ViewModel is constrcuted
             * each time the view is displayed.  Return an instance of the ViewModel if
             * only one instance of the ViewModel is needed.
             */
            return new TransferEmployeeViewModel();
        }
);
