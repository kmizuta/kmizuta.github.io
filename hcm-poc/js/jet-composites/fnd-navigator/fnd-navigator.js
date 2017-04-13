define(['ojs/ojcore', 'knockout', 'jquery', 'hammerjs', 'ojs/ojjquery-hammer', 'ojs/ojpopup',
    'ojs/ojknockout', 'promise', 'ojs/ojoffcanvas', 'ojs/ojnavigationlist', 'ojs/ojmodule', 'ojs/ojbutton', 'ojs/ojarraytabledatasource'
], function (oj, ko, $, Hammer) {
    function navigatorModel(context) {
        var self = this;
        self.url = "";
        var options = [];
        var propsPromise = context.props;
        var element = context.element;
        self.rawModule = ko.observable();
        self.group = ko.observable();
        self.category = ko.observable('navigator');
        self.category1 = ko.observable('');
        self.navData = ko.observableArray([]);
        self.subItems = ko.observableArray([]);
        self.sortedItems = ko.observableArray([]);
        self.openInner = ko.observable();
        self.subItemPosition = ko.observable();
        self.currentModule = ko.observable('Home');
        self.clusterNavData = ko.observableArray([]);

        self.currentGridItemNodeId = ko.observable();
        
        //Function for toggle view of list and grid
        self.navLayoutBtn = ko.observable('listLayoutCount');
        self.ocajNavListview = ko.observable(true);
        self.ocajNavGridview = ko.observable(null);
        self.workAreaFlag = ko.observable(false);
        self.navDataFetched = ko.observable(false);
        self.navIconStyleClass = ko.pureComputed(function () {
            return self.navDataFetched();
        });
        self.homeAppears = ko.observable(false);
        var scrollPositionLevel2 = 0;
        self.navListView = function () {
            self.navLayoutBtn('listLayoutCount');
            self.ocajNavListview(true);
            self.ocajNavGridview(null);
            var elm = document.getElementsByTagName('html');
            if (elm[0].dir == 'rtl' || elm[0].style.direction == 'rtl') {
                $('#ocajNavListDiv').css({
                    'margin-right': '105px'
                });
                $('#navBtnlayoutSet').addClass("ocaj-nav-buttonset-listlayout").removeClass("ocaj-nav-buttonset-gridviewlayoutRtl").removeClass("ocaj-nav-buttonset-gridlayout").removeClass("ocaj-nav-buttonset-listviewlayout");
            } else {
                $('#ocajNavListDiv').css({
                    'margin-left': '300px'
                });
                $('#navBtnlayoutSet').addClass("ocaj-nav-buttonset-listlayout").removeClass("ocaj-nav-buttonset-gridviewlayout").removeClass("ocaj-nav-buttonset-gridlayout").removeClass("ocaj-nav-buttonset-listviewlayout");
            }

            if (self.workAreaFlag()) {
                $('#ocajNavListDiv').scroll();
                $("#ocajNavListDiv").animate({
                    scrollTop: sessionStorage.scrollTop
                }, 0);

                $('#drawer').scroll();
                $("#drawer").animate({
                    scrollTop: sessionStorage.scrollTopSorteditem
                }, 0);

            } else {
                $(".nav-popup").hide();
                var tempScrollTop1 = $("#ocajNavListDiv").scrollTop();
                $("#ocajNavListDiv").animate({
                    scrollTop: tempScrollTop1
                }, 0.001);

            }

        }
        self.navGridView = function () {
            self.navLayoutBtn('gridLayoutCount');
            self.ocajNavListview(null);
            self.ocajNavGridview(true);
            $(".nav-popup").hide();
            var elm = document.getElementsByTagName('html');
            if (elm[0].dir == 'rtl' || elm[0].style.direction == 'rtl') {
                $('#ocajNavGridDiv').css({
                    'margin-left': '0px'
                });
                $('#navBtnlayoutSet').addClass("ocaj-nav-buttonset-gridviewlayoutRtl").removeClass("ocaj-nav-buttonset-listviewlayout").removeClass("ocaj-nav-buttonset-gridlayout").removeClass("ocaj-nav-buttonset-listlayout");
            } else {
                $('#ocajNavGridDiv').css({
                    'margin-left': '0px'
                });
                $('#navBtnlayoutSet').addClass("ocaj-nav-buttonset-gridviewlayout").removeClass("ocaj-nav-buttonset-listviewlayout").removeClass("ocaj-nav-buttonset-gridlayout").removeClass("ocaj-nav-buttonset-listlayout");
            }


        }

        //offcanvas function
        self.drawerDisplayMode = "overlay";
        this.drawer = {
            "displayMode": self.drawerDisplayMode,
            "selector": "#drawer",
            "content": "#main"
        };

        this.toggleDrawer = function () {
            //flip of arrow button 
            $("#ocajnavArrow").delay(1200).fadeOut(1, function () {
                $("#ocajnavArrow").removeClass('ocaj-nav-close-nav-icon').addClass('ocaj-nav-close-nav-icon-flip');
            });
            var elm = document.getElementsByTagName('html');
            if (elm[0].dir == 'rtl' || elm[0].style.direction == 'rtl') {
                $('#ocajNavListDiv').show().delay(300);
                $('#ocajNavListDiv').animate({
                    'margin-right': '105px'
                }, 1000);

                $('#ocajNavGridDiv').show().delay(300);
                $('#ocajNavGridDiv').animate({
                    'margin-right': '0px'
                }, 1000);
            } else {
                $('#ocajNavListDiv').show().delay(500);
                $('#ocajNavListDiv').animate({
                    'margin-left': '300px'
                }, 1000);

                $('#ocajNavGridDiv').show().delay(300);
                $('#ocajNavGridDiv').animate({
                    'margin-left': '0px'
                }, 1000);
            }


            if (self.workAreaFlag()) {
                $('#ocajNavListDiv').scroll();
                $("#ocajNavListDiv").animate({
                    scrollTop: sessionStorage.scrollTop
                }, 0);

                $('#drawer').scroll();
                $("#drawer").animate({
                    scrollTop: sessionStorage.scrollTopSorteditem
                }, 0);

            } else {
                var tempScrollTop1 = $("#ocajNavListDiv").scrollTop();
                $("#ocajNavListDiv").animate({
                    scrollTop: tempScrollTop1
                }, 0.001);

            }



            return oj.OffcanvasUtils.toggle(self.drawer);
        };

        this.closeDrawer = function () {
            //flip of arrow button 
            $("#ocajnavArrow").delay(10).fadeOut(1, function () {
                $("#ocajnavArrow").removeClass('ocaj-nav-close-nav-icon-flip').addClass('ocaj-nav-close-nav-icon');
            });
            var elm = document.getElementsByTagName('html');
            if (elm[0].dir == 'rtl' || elm[0].style.direction == 'rtl') {
                //second level items animaton
                $('#ocajNavListDiv').animate({
                    'margin-right': '-200px'
                }, 900);

                $('#ocajNavGridDiv').animate({
                    'margin-right': '-' + (self.windowWidth()) + 'px'
                }, 900);
            } else {
                //second level items animaton
                $('#ocajNavListDiv').animate({
                    'margin-left': '0px'
                }, 1000);

                $('#ocajNavGridDiv').animate({
                    'margin-left': '-' + (self.windowWidth()) + 'px'
                }, 1000);
            }

            return oj.OffcanvasUtils.close(this.drawer);
        }

        setTimeout(function () {
            var elm = document.getElementsByTagName('html');
            if (elm[0].dir == 'rtl' || elm[0].style.direction == 'rtl') {
                $("#drawer").addClass("ocaj-nav-navigatorOuterDrawerRtl").removeClass("ocaj-nav-navigatorOuterDrawer");
            } else {
                $("#drawer").addClass("ocaj-nav-navigatorOuterDrawer").removeClass("ocaj-nav-navigatorOuterDrawerRtl");
            }
            $("#drawer").on("ojclose", function () {
                if (self.group() == undefined) {
                    $(".nav-popup").hide();
                }
                if (elm[0].dir == 'rtl' || elm[0].style.direction == 'rtl') {
                    $('#ocajNavListDiv').animate({
                        'margin-right': '-200px'
                    }, 900);

                    $('#ocajNavGridDiv').animate({
                        'margin-right': '-' + (self.windowWidth()) + 'px'
                    }, 900);
                } else {
                    //second level items animaton
                    $('#ocajNavListDiv').animate({
                        'margin-left': '0px'
                    }, 1000);

                    $('#ocajNavGridDiv').animate({
                        'margin-left': '-' + (self.windowWidth()) + 'px'
                    }, 1000);
                }
                //flip of arrow button 
                $("#ocajnavArrow").delay(10).fadeOut(1, function () {
                    $("#ocajnavArrow").removeClass('ocaj-nav-close-nav-icon-flip').addClass('ocaj-nav-close-nav-icon');
                });

            });
        }, 222);

        this.openDrawer = function () {
            return oj.OffcanvasUtils.open(this.drawer);
        };

        this.isRTL = function () {
            var dir = document.documentElement.getAttribute("dir");
            if (dir)
                dir = dir.toLowerCase();
            return (dir === "rtl");
        };

        //use hammer for swipe
        var mOptions = {
            "recognizers": [
                [Hammer.Swipe, {
                        "direction": Hammer["DIRECTION_HORIZONTAL"]
                    }]
            ]
        };

        $("#main")
                .ojHammer(mOptions)
                .on("swipeleft", function (event) {
                    event.preventDefault();
                    if (self.isRTL())
                        self.openDrawer();
                })
                .on("swiperight", function (event) {
                    event.preventDefault();
                    if (!self.isRTL())
                        self.openDrawer();
                });

        // Window size functions
        var win = $(window);
        var body = document.body;
        var html = document.documentElement;
        /**
         * these are also defined separately
         * in override under the media queries
         * 
         * change those definitions if you change these
         */
        self.calcAppWidth = function (width) {
            if (width >= 1440) {
                return 1420;
            } else if (width >= 1280) {
                return 1260;
            } else if (width >= 1024) {
                return 1004;
            } else {
                return width;
            }
        };
        self.windowWidth = ko.observable(win.width());
        self.windowHeight = ko.observable(win.height());
        self.appWidth = ko.observable(self.calcAppWidth(win.width()));
        self.appHeight = ko.observable(
                Math.max(body.scrollHeight, body.offsetHeight,
                        html.clientHeight, html.scrollHeight, html.offsetHeight)
                );

        function windowUpdate() {
            self.windowWidth(win.width());
            self.windowHeight(win.height());
            self.appWidth(self.calcAppWidth(win.width()));
            self.appHeight(
                    Math.max(body.scrollHeight, body.offsetHeight,
                            html.clientHeight, html.scrollHeight, html.offsetHeight)
                    );
        }
        windowUpdate();
        win.resize(windowUpdate);
        //registering listener for navigator launch event
        element.addEventListener('FND_Launch_Navigator', self.toggleDrawer);
         
        propsPromise.then(function (props) {
            self.themeColor = props.theme;
            
            //custom event funciton
            self.mainMenuEventHandler = function (groupId, focusViewId, webapp, itemId, taskMenuSource) {
                //fire custom event
                var params = {
                    'bubbles': true,
                    'detail': {
                        'taskMenuSource': taskMenuSource,
                        'focusViewId': focusViewId,
                        'itemId': itemId,
                        'webappName': webapp,
                        'groupNodeId': groupId
                    }
                };
                if (itemId !== 'Home') {
                    self.workAreaFlag(true);
                    sessionStorage.scrollTop = $('#ocajNavListDiv').scrollTop();
                    sessionStorage.scrollTopSubitem = $('#ocajNavPopupSubitem').scrollTop();
                    sessionStorage.scrollTopSorteditem = $('#drawer').scrollTop();
                    self.homeAppears(true);
                } else {
                    self.workAreaFlag(false);
                    scrollPositionLevel2 = 0;
                }
                self.currentModule(itemId);
                element.dispatchEvent(new CustomEvent('navigatorItemClicked', params));
                self.closeDrawer();
                self.group(groupId);
            }
            self.currentIndex = 0;
            //Function for using XML data 
            self.xmlData = null;
            self.subClusterData = null;
            self.subClusterDataRenderedTrue = ko.observableArray([]);
            //fucntion for using json data

            if (null != props.navigatorData) {
                self.navDataFetched(true);

                self.xmlData = props.navigatorData.restNavMenuNodes;
                var clusterItems = [];

                //function for populating whole navdata
                $(self.xmlData).each(function (topInd1) {
                    $top = $(this);
                    if ($top.prop('nodeType') === 'itemNode') {
                        var item = {
                            "label": $top.attr('label'),
                            "group": $top.attr('id'),
                            "id": "" + $top.attr('id'),
                            "iconid": "nvi_" + $top.attr('id'),
                            "type": 'toplevel',
                            "size": 60,
                            "icon": $top.attr('icon') == null ? 'grid_dot_cluster.png' : "grid_dot_" + $(this).attr('icon').split('.')[0],
                            "visible": $top.attr('rendered') === 'false' ? false : true,
                            "module": $top.attr('ojModulePath'),
                            "focusViewId": $top.attr('focusViewId'),
                            "webapp": $top.attr('webapp'),
                            "taskMenuSource": $top.attr('taskMenuSource'),
                            "cardIcon": $top.attr('cardIcon')
                        }
                        self.navData.push(item);
                    } else if ($top.prop('nodeType') === 'groupNode') {
                        var item1 = {
                            "label": $top.attr('label'),
                            "group": $top.attr('id'),
                            "id": "" + $top.attr('id'),
                            "iconid": "nvi_" + $top.attr('id'),
                            "type": 'cluster',
                            "size": 60,
                            "icon": 'null',
                            "visible": $top.attr('rendered') === 'false' ? false : true,
                            "module": $top.attr('ojModulePath'),
                            "focusViewId": $top.attr('focusViewId'),
                            "webapp": $top.attr('webapp'),
                            "taskMenuSource": $top.attr('taskMenuSource'),
                            "cardIcon": $top.attr('cardIcon')
                        }
                        self.navData.push(item1);
                        self.subClusterData = $top.prop('restNavMenuNode');
                        $(self.subClusterData).each(function (botInd) {
                            $bot = $(this);
                            var item2 = {
                                "label": $bot.attr('label'),
                                "group": $top.attr('id'),
                                "id": "" + $bot.attr('id'),
                                "iconid": "nvi_" + $bot.attr('id'),
                                "type": 'subcluster',
                                "size": 60,
                                "icon": $top.attr('icon') == null ? 'grid_dot_cluster.png' : "grid_dot_" + $(this).attr('icon').split('.')[0],
                                "visible": $bot.attr('rendered') === 'false' ? false : true,
                                "module": $bot.attr('ojModulePath'),
                                "focusViewId": $bot.attr('focusViewId'),
                                "webapp": $bot.attr('webapp'),
                                "taskMenuSource": $bot.attr('taskMenuSource'),
                                "cardIcon": $bot.attr('cardIcon')
                            }
                           /* if(item1.id === item2.group){
                                if(item2.visible){
                                    self.subClusterDataRenderedTrue.push(item2);
                                }
                            }*/
                            self.navData.push(item2);
                        });
                    }
                });

                self.mobileNavAction = function (module, type) {
                    var className = $(event.target).attr('class').match(/ocaj-nav-side-panel-group[^\ ]+/g);
                    if (type === 'cluster') {
                        $('.' + className).toggleClass('ocaj-nav-side-panel-hidden');
                    } else {
                        self.closeThenNavigate(module, type);
                    }
                };
                self.closeThenNavigate = function (module, type) {
                    if (module) {
                        $('.oj-popup-content').hide();
                        oj.OffcanvasUtils.toggle(self.drawer);
                    }
                };
                self.keepOpenInner = function (item) {
                    item.type = 'cluster';
                    self.openInner(item);
                };
                self.firstTime = ko.observable(true);
                self.openInner = function (item, data, checkFirst) {
                    $(".nav-popup").hide();
                    var scrollPosition = 0;
                    if (checkFirst) {
                        if (self.firstTime()) {
                            self.firstTime(false);
                        } else {
                            return;
                        }
                    }
                    if (item != null) {
                        var arrowId = document.getElementById('nav_arrow');
                        if (item.type == 'cluster') {
                            // initialize
                            $('.nav-popup-' + item.group).show().delay(300);
                            var elm = document.getElementsByTagName('html');
                            if (elm[0].dir == 'rtl' || elm[0].style.direction == 'rtl') {
                                $('.nav-popup-' + item.group).animate({
                                    'margin-right': '0px'
                                }, 1000);
                            } else {
                                $('.nav-popup-' + item.group).animate({
                                    'margin-left': '0px'
                                }, 1000);
                            }

                            if (!data) {
                                return;
                            }
                            // align items to middle of group
                            var itemPos = data.target.offsetTop;
                            scrollPositionLevel2 = itemPos;
                            var targetType = data.target.tagName;
                            if (targetType == 'DIV') {
                                itemPos = itemPos - 15;
                            }
                            var ulHeight = $('.nav-list-' + item.group).height();
                            // number of pixels between each li
                            var liHeight = 4;
                            var cols = ulHeight / liHeight;
                            // formula for calculating position to place ul
                            // floor is for aligning odds and evens
                            var ulPos = itemPos - Math.floor((cols - 1) / 2) * liHeight;
                            // edge case for when item extends to top of page
                            if (ulPos < 0) {
                                ulPos = 0;
                            } else if (ulPos >= self.windowHeight()) {
                                if (ulHeight > self.windowHeight()) {
                                    ulPos = 0;
                                } else {
                                    ulPos = ulPos - self.windowHeight();
                                }
                            }
                            scrollPosition = ulPos;
                            self.subItemPosition(ulPos);
                            $('.nav-list-' + item.group).css('position', 'relative').css('top', ulPos + 'px');

                        } else {
                            $(".nav-popup").hide();
                        }
                        if (self.workAreaFlag()) {
                            $('#ocajNavPopupSubitem').scroll();
                            $("#ocajNavPopupSubitem").animate({
                                scrollTop: sessionStorage.scrollTopSubitem
                            }, 0);
                        }
                    }
                };
                self.closeInner = function (item, data) {
                    // close other popups
                    $(".nav-popup").hide();
                };
                // sorts items by group
                self.sortedItems(self.navData()
                        .filter(function (item) {
                            return item.type !== 'subcluster';
                        })
                        // change each element to an array of itself and subelement
                        .map(function (item) {
                            return self.navData().filter(function (innerItem) {
                                if (item.group === 'nogroup') {
                                    return item.label === innerItem.label;
                                } else {
                                    return item.group === innerItem.group;
                                }
                            });
                        })
                        // flatten
                        .reduce(function (acc, cur) {
                            return acc.concat(cur);
                        }, [])
                        // add empty module
                        .map(function (item) {
                            if (!item.module) {
                                item.module = '';
                            }
                            return item;
                        })
                        );
                var subItemsObj = self.navData().filter(function (item) {
                    return item.type === 'subcluster';
                })
                        // build an object of navigator items
                        // mapped with index according to the group
                        .reduce(function (acc, cur) {
                            if (acc[cur.group] == null) {
                                acc[cur.group] = [];
                            }
                            acc[cur.group].push(cur);
                            return acc;
                        }, {});
                // convert to array
                self.subItems(Object.keys(subItemsObj)
                        .map(function (group) {
                            var groupObj = {};
                            groupObj.group = group;
                            groupObj.items = subItemsObj[group];
                            return groupObj;
                        }));
            }
//            $.ajax({
//                url: props.navigatorMenuJson,
//                type: 'GET',
//                async: true,
//                dataType: 'json',
//                success: function (data) {
//                    self.navDataFetched(true);
//                    navigatorMenuDataFunction(data)
//                    // added by tmak
//                    controllerModel.navigatorData = self.navData();
//                },
//                beforeSend: setHeader
//            });

//            function setHeader(xhr) {
//                xhr.setRequestHeader('Content-Type', 'application/json');
//                xhr.setRequestHeader('Authorization', 'Basic YXBwbGljYXRpb25fYWRtaW5pc3RyYXRvcjpXZWxjb21lMQ==');
//            }
            /* $.getJSON(props.navigatorMenuJson, function(rootMenuData) {
             navigatorMenuDataFunction(rootMenuData);
             }); */

        });

        $(context.element).on('selectedNodeNav-changed', function (event) {
                    self.currentModule(event.detail.value);
                    
        });
        $(context.element).on('selectedGroupNav-changed', function (event) {
                    self.group(event.detail.value);
                    
        });
        
        function parseCapLabel(label) {
            var rawLabel = label.match(/\.([A-Z_]+)\}/);
            rawLabel = rawLabel ? rawLabel[1] : label;
            var minorWords = ['a', 'an', 'and', 'of', 'or', 'the', 'to'];
            return rawLabel.toLowerCase().split('_').map(function (v, i) {
                if (v != "" && ((minorWords.indexOf(v) === -1) || i == 0)) {
                    v = v.split('');
                    v[0] = v[0].toUpperCase();
                    v = v.join('');
                }
                return v;
            }).join(' ');
        }

        function navGrpnodeRemvFunction(str) {
            var position = str.search(/Groupnode\s/i);
            if (position == 0) {
                var str = str.substring(str.indexOf(" ") + 1, str.length);
            }
            return str;
        }
    }
    return navigatorModel;
});