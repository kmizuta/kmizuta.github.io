/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojcomposite',
    'jet-composites/fnd-simple-panel/loader', 'ojs/ojmasonrylayout', 'ojs/ojchart'],
        function (oj, ko, $) {

            function HcmInfoletsViewModel() {
                var self = this;
                var pieSeries123 = [{items: [0.3]},
                    {items: [6]},
                    {items: [5]},
                    {items: [1]},
                    {items: [4]}];

                self.pieSeriesValueInstallBase1 = ko.observableArray(pieSeries123);
                var pieSeries1234 = [{items: [3.8]},
                    {items: [0.4]},
                    {items: [0.8]},
                    {items: [0.4]},
                    {items: [8]},
                    {items: [1]},
                    {items: [1]},
                    {items: [3.8]},
                ];

                self.pieSeriesValueInstallBase2 = ko.observableArray(pieSeries1234);
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
                self.handleActivated = function (info) {
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

                self.navigateToMyTeam = function () {
                    var detail = {
                                taskMenuSource: 'js/data/taskmenu1.json',
                                focusViewId: 'FndOverview.html',
                                itemId: 'PER_HCMPEOPLETOP_FUSE_MY_TEAM',
                                webappName: '',
                                groupNodeId: 'groupNode_manager_resources'
                            };
                    controllerModel.navigateFromInfolets(detail.taskMenuSource, detail.focusViewId, detail.itemId, detail.webappName, detail.groupNodeId);

                };
            }

            /*
             * Returns a constructor for the ViewModel so that the ViewModel is constrcuted
             * each time the view is displayed.  Return an instance of the ViewModel if
             * only one instance of the ViewModel is needed.
             */
            return new HcmInfoletsViewModel();
        }
);
