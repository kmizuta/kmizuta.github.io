define(['knockout', 'ojs/ojcore', 'jquery',
    'ojs/ojknockout', 'ojs/ojtabs', 'jet-composites/fnd-springboard/loader', 'jet-composites/fnd-osn-panel/loader'],
        function (ko, oj, $) {
            function fndFuseOverviewModel(context) {
                var self = this;
                var propsPromise = context.props;
                self.stripNodeList = ko.observableArray();
                self.currenStriptNodeId = ko.observable();
                self.disclosedTabIndex = ko.observable(0); // default to 1st tab for now
                self.detailModuleName = ko.observable();
                self.detailParams = ko.observableArray();
                self.showDetail = ko.observable();
                self.selectedDashboard = ko.observable(-1);
                propsPromise.then(function (props) {
                    self.currenStriptNodeId(props.selectedNode);
                    self.showDetail(props.detailPage);
                    if(controllerModel.isMobileView()){
                        self.selectedDashboard(0);
                    }
//                    props.nodeList.map(function (data) {
//                        _evaluateNodeList(data);
//
//                    }); 
                });

                function _evaluateNodeList(data) {
                    if (data.hasOwnProperty('module') && _isNodeRendered(data)) {
                        if (data.module.length > 0) {
                            var removeitems = [];
                            data.module.map(function (shellTab, index) {
                                if (!_isNodeRendered(shellTab)) {
                                    removeitems.push(index);
                                }
                            });
                            for (var i = removeitems.length - 1; i >= 0; i--) {
                                data.module.splice(removeitems[i], 1);
                            }
                            self.stripNodeList.push(data);
                        }
                    }
                };
                
                function _isNodeRendered(data) {
                    if (data.hasOwnProperty('rendered')) {
                        return data.rendered
                    } else {
                        return true;
                    }
                }

                //property change events
                $(context.element).on('nodeList-changed', function (event) {
                    self.stripNodeList.removeAll();
                    self.disclosedTabIndex(0);
                    event.detail.value.map(function (data) {
                        _evaluateNodeList(data);

                    });
                });

                $(context.element).on('selectedNode-changed', function (event) {
                    self.currenStriptNodeId(event.detail.value);
                });

                //Storing the selected shell tab index while calling openMainTask - closeMainTask
                self._optionChangeHandler = function (event, data) {
                    if (this == event.target) {
                        console.log("optionChange: " + event.target.id + " data {" +
                                " previousValue: " + data.previousValue + "; value: " + data.value + "}");
                        // memorize the last disclosed tab, so that when returning from detail,
                        // we have the correct tab disclosed.
                        self.disclosedTabIndex(data.value);
                    }
                };

                context.element.addEventListener('FND_OpenMainTask', openMainTaskEventListener);
                context.element.addEventListener('FND_CloseMainTask', closeMainTaskEventListener);

                function openMainTaskEventListener(event) {
                    // tmak: TODO: hide filmstrip here
                    // The code below reuses no tab mode module to display detail module
                    var params = event.detail;
                    var detailModuleName = params['detailModuleName'];
                    var detailFlowParams = params['detailParams'];
                    if (detailModuleName != undefined && detailModuleName != null) {
                        //self.tabsRendered(false);
                        //self.tabsList.removeAll();
                        //self.tabsList.push({name: 'Customer', icon: 'demo-fuse-tabs-opportunities', module: detailModuleName}); 
                        //self.tabsList()[0] = {name: 'Customer', icon: 'demo-fuse-tabs-opportunities', module: detailModuleName};
                        self.detailModuleName(detailModuleName);
                        self.detailParams = detailFlowParams;
                        //Enable the detail module
                        self.showDetail(true);
                    }
                }

                function closeMainTaskEventListener(event) {
                    // tmak: TODO: show filmstrip here
                    var params = event.detail;
                    //self.noTabModule(detailModuleName);                   
                    self.showDetail(false);
                }

                //fnd-fuse-overview support for doing openMainTask
                self.openMainTaskCall = function (detailModuleName, detailParams) {
                    var eParams = {
                        'bubbles': true,
                        'detail': {
                            'detailModuleName': detailModuleName,
                            'detailParams': detailParams
                        }
                    };
                    var shellElements = document.getElementsByTagName('fnd-fuse-overview');
                    if (shellElements != undefined && shellElements != null) {
                        shellElements[0].dispatchEvent(new CustomEvent('FND_OpenMainTask', eParams));
                    }
                };

                //TODO: ROHITSI fnd-fuse-overview support for doing closeMainTask
                
                self.showSelectedDashboard = function(data, index){
                    self.selectedDashboard(data);
                    self.showDetail(false);
                };


            }
            return fndFuseOverviewModel;
        });