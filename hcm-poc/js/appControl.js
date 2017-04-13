/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
var controllerModel;
define(['ojs/ojcore', 'knockout', 'jet-composites/fnd-simple-ui-shell/loader', 'libs/mockjs/MockRestModel'],
        function (oj, ko) {
            function ControllerViewModel() {
                var self = this;
                self.navigatorData = ko.observable();
                self.selectedNodeId = ko.observable();
                //rohitsi: hardcoded values for now but needs to come from another JSON
                self.landingPageDashboards = ko.observableArray([
                    {id: 'HCM_Infolets', moduleId: 'HCM_Infolets', rendered: true}
                ]);
                self.nodeList = ko.observableArray();
                self.detailPage = ko.observable(false);

                // Header
                self.userLogin = ko.observable("lisa.jones@oracle.com");

                self.isMobileView = ko.computed(function () {
                    var mediaQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
                    if (window.matchMedia(mediaQuery).matches) {
                        return true;
                    } else {
                        return false;
                    }
                });

                self.selectedGroupNodeId = ko.observable();
                
                /**
                 * tmak: Function for getting url parameters
                 */
                self.urlParams = ko.pureComputed(
                        function () {
                            var vars = [], hash;
                            var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
                            for (var i = 0; i < hashes.length; i++)
                            {
                                hash = hashes[i].split('=');
                                vars.push(hash[0]);
                                vars[hash[0]] = hash[1];
                            }
                            console.log(vars);
                            return vars;
                        }
                );

                self.fndPageParams = ko.observableArray();
                if (self.urlParams().length > 0) {
                    for (var i = 0; i < self.urlParams().length; i++) {
                        self.fndPageParams.push(self.urlParams()[i]);
                        self.fndPageParams()[self.urlParams()[i]] = self.urlParams()[self.urlParams()[i]];
                    }
                }
                // tmak: TODO: need to add code for checking if urlParams contains fndGlobalItemNodeId parameter,
                // if yes, then call rest service API for getting taskmenu meta data and populate shellTabs.
                // Below is hard-coded values for shellTabs
                self._invokeTaskMenuRestService = function (taskUrl) {
                    var shellTabArray = [];
                    //annambhia : TODO - Use Promise to handle the callback instead of having async as false.
                    var deferredObj = $.ajax(
                            {
                                url: taskUrl,
                                type: 'GET',
                                dataType: 'json',
                                async: false,
                                cache: false,
                                success: function (data)
                                {
                                    $.each(data.itemNodeList, function (index, value)
                                    {
                                        if (value.taskType === "defaultMain") {
                                            var taskLabel = value.label;
                                            var taskIcon = value.icon;
                                            var taskModule = value.module;
                                            var taskRendered = true;
                                            shellTabArray.push({name: taskLabel, icon: taskIcon, rendered: taskRendered, module: taskModule});
                                        }
                                    });
                                },
                                failure: function (errMsg)
                                {
                                    alert(errMsg);
                                },
                                beforeSend: function (xhr)
                                {
                                    xhr.setRequestHeader('Content-Type', 'application/json');
                                    xhr.setRequestHeader('Authorization', 'Basic YXBwbGljYXRpb25fYWRtaW5pc3RyYXRvcjpXZWxjb21lMQ==');
                                }
                            });
                    return shellTabArray;
                };

                if ('fndGlobalItemNodeId' in self.urlParams()) {
                    var fndGlobalItemNodeId = self.urlParams()['fndGlobalItemNodeId'];
                    var taskEntry;
                    var directAccessNode;
                    if (self.navigatorData != undefined) {
                        directAccessNode = self.navigatorData.filter(function (item) {
                            return (item.id.indexOf(fndGlobalItemNodeId) > -1);
                        })

                    }
                    if (directAccessNode != undefined) {
                        taskEntry = directAccessNode.taskMenuSource;
                    } else {
                        taskEntry = '/WEB-INF/menus/oracle/apps/fnd/applcore/fndsetup/ui/page/CustomizationSetMigration_taskmenu.xml';
                    }
                    var restURL = 'http://adc00cee:7101/fndSetup/navMenuRESTService/taskMenuService/getTaskMenuItemNodes?taskMenuSource=' + taskEntry;
                    var jsonData = 'js/data/taskmenu1.json';
                    var shellTabArray = self.invokeTaskMenuRestService(taskEntry);
                }
                ;


                /* cca related event
                 *var navigatorCCA = document.getElementById("ocaj-navigator"); // commented out by tmak
                 * tmak: it needs to get an element that's parent of navigator CCA
                 */
                var navigatorCCA = document.getElementById("_FAshell");
                if (navigatorCCA != undefined && navigatorCCA != null) {
                    //listening tonavigator click event
                    navigatorCCA.addEventListener('navigatorItemClicked', mainMenuClickedEventHandler);
                }

                var faShell = document.getElementById("_FAshell");
                if (faShell != undefined && faShell != null) {
                    //listening tonavigator click event
                    faShell.addEventListener('navigatorItemClicked', mainMenuClickedEventHandler);
                }

                self.launchNavigator = function (event) {
                    var params = {
                        'bubbles': false
                    };
                    document.getElementsByTagName('fnd-navigator')[0].dispatchEvent(new CustomEvent('FND_Launch_Navigator', params));
                }

                /* 
                 * ROHITSI: make the below call a promise
                 * Navigator Data fetch call.
                 **/
                $.ajax({
                    url: 'js/data/NavigatorData.json',
                    type: 'GET',
                    async: false,
                    dataType: 'json',
                    success: function (data) {
//                        self.navDataFetched(true);
                        for (i = 0; i < data.restNavMenuNodes.length; i++) {
                            if (data.restNavMenuNodes[i].hasOwnProperty('cardIcon')) {
                                data.restNavMenuNodes[i].cardIcon = data.restNavMenuNodes[i].cardIcon.replace('.png', '');
                            } else if (data.restNavMenuNodes[i].hasOwnProperty('restNavMenuNode')) {
                                var nodeChildren = data.restNavMenuNodes[i].restNavMenuNode;
                                if (nodeChildren.constructor === Array) {
                                    data.restNavMenuNodes[i]['cardIcon'] = data.restNavMenuNodes[i].restNavMenuNode[0].cardIcon.replace('.png', '');
                                } else {
                                    data.restNavMenuNodes[i]['cardIcon'] = data.restNavMenuNodes[i].restNavMenuNode.cardIcon.replace('.png', '');
                                }
                            }
                            if (data.restNavMenuNodes[i].hasOwnProperty('restNavMenuNode') && data.restNavMenuNodes[i].restNavMenuNode.constructor === Array) {
                                for (j = 0; j < data.restNavMenuNodes[i].restNavMenuNode.length; j++) {
                                    if (data.restNavMenuNodes[i].restNavMenuNode[j].hasOwnProperty('cardIcon')) {
                                        data.restNavMenuNodes[i].restNavMenuNode[j].cardIcon = data.restNavMenuNodes[i].restNavMenuNode[j].cardIcon.replace('.png', '');
                                    }
                                }
                            } else if (data.restNavMenuNodes[i].hasOwnProperty('restNavMenuNode') && data.restNavMenuNodes[i].restNavMenuNode.hasOwnProperty('cardIcon')) {
                                data.restNavMenuNodes[i].restNavMenuNode.cardIcon = data.restNavMenuNodes[i].restNavMenuNode.cardIcon.replace('.png', '');
                            }
                        }
                        self.navigatorData(data);

                    },
                    beforeSend: _setHeader
                });

                function _setHeader(xhr) {
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.setRequestHeader('Authorization', 'Basic YXBwbGljYXRpb25fYWRtaW5pc3RyYXRvcjpXZWxjb21lMQ==');
                }

                /*
                 * Handler for navTitleClicked event
                 */
                function mainMenuClickedEventHandler(event) {
                    var selectedStripItem = event.detail.itemId;
                    var taskMenuSource = event.detail.taskMenuSource;
                    var webApp = event.detail.webappName; //still to be used later
                    var destViewId = event.detail.focusViewId;
                    var groupNodeId = event.detail.groupNodeId;

                    if (destViewId == 'FndOverview.html') {
                        var filmstripMemberList;
                        // only need to prepare data for filmstrip when the selected entry is JET
                        if (groupNodeId != undefined && groupNodeId != null && groupNodeId.length > 0) {
                            filmstripMemberList = self.navigatorData().restNavMenuNodes.filter(function (item) {
                                return (item.id == groupNodeId);
                            })
                        }

                        // tmak: has only configured 'itemNode_tmakg1_item1' for now ROHITSI: To be checked only for the selected Tab
                        if (selectedStripItem != undefined && taskMenuSource != undefined) {
                            // call method for getting taskMenuSource meta data here, and re-populate shellTabs
                            var taskDataArray = self._invokeTaskMenuRestService(taskMenuSource);
                            var filmstripArray = [];
                            for (var i = 0; i < filmstripMemberList[0].restNavMenuNode.length; i++) {
                                var navNode = filmstripMemberList[0].restNavMenuNode[i];
                                filmstripArray.push({id: navNode.id, name: navNode.label, icon: navNode.icon, rendered: true, module: taskDataArray});
                            }
                            //ROHITSI/Abhilash: springboard navigation
                            var springboard = document.getElementsByTagName('fnd-springboard')[0];
                            if (null !== springboard && springboard !== undefined) {
                                springboard.setAttribute('filmstrip-mode', 'strip');
                                springboard.navigateExternal(selectedStripItem);
                            }
                            self.selectedNodeId(selectedStripItem);
                            self.nodeList.removeAll()
                            self.nodeList(filmstripArray);
                            //self.disclosedTabIndex(0); // reset back to 1st tab for now. tmak TODO: add logic to check disclosed for each defaultMain
                            self.selectedGroupNodeId(groupNodeId);
                        }
                    } else {
                        var adfPageUrl = null;
                        if (webApp != null && webApp.endsWith("/") && destViewId != null &&
                                destViewId.indexOf('.html') == -1)
                        {
                            adfPageUrl = webApp + "faces" + destViewId;
                        }
                        if (adfPageUrl != null && (destViewId == '/FndOverview' || destViewId == '/FuseOverview')) {
                            adfPageUrl = adfPageUrl + "?fndGlobalItemNodeId=" + globalItemNodeId;
                        }
                        if (adfPageUrl != null)
                            window.location.href = adfPageUrl;
                    }
                }

                self.gridSelectionCallback = function (taskMenuSource, focusViewId, itemId, webappName, groupNodeId) {
                    var params = {
                        'detail': {
                            'taskMenuSource': taskMenuSource,
                            'focusViewId': focusViewId,
                            'itemId': itemId,
                            'webappName': webappName,
                            'groupNodeId': groupNodeId
                        }
                    };
                    var springboard = document.getElementsByTagName('fnd-springboard')[0];
                    if (null !== springboard && springboard !== undefined) {
                        springboard.setAttribute('filmstrip-mode', 'strip');
                        mainMenuClickedEventHandler(params);
                    }
                }

                self.navigateFromInfolets = function (taskMenuSource, focusViewId, itemId, webappName, groupNodeId) {
                    var params = {
                        'detail': {
                            'taskMenuSource': taskMenuSource,
                            'focusViewId': focusViewId,
                            'itemId': itemId,
                            'webappName': webappName,
                            'groupNodeId': groupNodeId
                        }
                    };
                    mainMenuClickedEventHandler(params);
                }

                self.resetToHomeGrid = function () {
                    self.selectedNodeId('');
                    self.selectedGroupNodeId('');
                    self.nodeList([]);
                    var springboard = document.getElementsByTagName('fnd-springboard')[0];
                    if (null !== springboard && springboard !== undefined) {
                        springboard.setAttribute('filmstrip-mode', 'grid');
                    }
                    var fndOverview = document.getElementsByTagName('fnd-fuse-overview')[0];
                    if (null !== fndOverview && fndOverview !== undefined) {
                        fndOverview.showSelectedDashboard(-1,1);
                    }
                }
                
                self.dummyName = ko.observable('');

            }
            controllerModel = new ControllerViewModel();
            return controllerModel;
        }

);
