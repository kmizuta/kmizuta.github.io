define(['knockout', 'jquery', 'ojs/ojcore',
    'ojs/ojknockout', 'ojs/ojconveyorbelt'], function (ko, $) {
    function fndSpringboardModel(context) {

        var self = this;
        self.url = "";
        var propsPromise = context.props;

        //Initialize values
        var dir_rtl = false;
        self.filmstripEnabled = ko.observable(false);
        self.showFilmstrip = ko.observable(true);
        self.auxgrid = ko.observable();

        var grid = true;
        var containerW;
        var currIndex = 0;
        var currName = "";
        var $nav = {};

        var colCount;

        //Default values for width and height of each cluster
        var cellWidth = 153;
        var cellHeight = 153;

        //Variable to help determine the resizing thresholds
        var prevScreenThreshold;

        //Value initialized for grid position from top
        var y = 0;

        /*       var psl = AdfPage.PAGE.findComponent("pt1:atkfr1:0:grid:0:pgridl");
         var prop = psl.getProperty("rootMenuData");
         prop = JSON.parse(prop);*/
        // var rootMenuData = { 'items' :  prop};

        injectSVG = function(){
            // inject svg icons
            var icons = document.querySelectorAll('.suiicon');
            suiicons.inject(icons);
        }

        createFilmstrip = function (item) {
            var group = item.attr('group');
            var left = 0;
            var initFilmstripLeft = 0;

            var filmstripMid;
            var filmstripItemsMid;
            var middleFilmstripItem;
            var filmstripItemsCount;

            var filmstripItemsLength;
            var filmstripLength = 0;

            //Fade out and remove all other items that won't be animated
            $('.app-nav-item[group!=' + group + ']').fadeOut(function(item){
                this.remove();
            });
            $('.app-nav-item[group=' + group + '][type=groupNode]').fadeOut(function(item){
                this.remove();
            });

            //Don't proceed further if item is toplevel
            if (group === 'nogroup') {
                $('.app-nav-item[group=' + group + ']').fadeOut();
                return 0;
            }
            //Find out the items to be animated
            var $animatableItems = $('.app-nav-item[group=' + group + '][type=itemNode]');

            filmstripItemsCount = $animatableItems.length;
            filmstripItemsLength = $animatableItems.length * 115;

            //Reset the width of the app navigation div to 100% so that filmstrip occupies to the parent's width
            $(self.auxgrid()).find('#app-navigation').animate({
                'width': '100%'
            }, {
                queue: false,
                duration: 750,
                complete: function(){
                    filmstripLength = $(self.auxgrid()).width();
                    if (filmstripLength > filmstripItemsLength) {
                        filmstripMid = filmstripLength / 2;
                        filmstripItemsMid = filmstripItemsLength / 2;
                        middleFilmstripItem = filmstripItemsCount / 2;
                        initFilmstripLeft = filmstripMid - (middleFilmstripItem * 115);
                    }
                }
            });

            
            //animate the items to the top
            $animatableItems.each(function (index) {

                $(this).animate({
                    top: '0px',
                    left: initFilmstripLeft + index * 115,
                    marginTop: '10px'

                }, {
                    duration: 750,
                    queue: false,
                    complete: function () {
                        $(this).addClass('ocaj-half-opaque');
                        //Change css for container
                        $nav.css({
                            height: '125px',
                            width: '100%',
                            left: 0,
                            display: 'flex'
                        });
                        $(item).removeClass('ocaj-half-opaque');
                        $(item).css({'margin-top': '3px'});
                        $nav.ojConveyorBelt({'rootAttributes': {'style': 'position: relative'}});
                        $animatableItems.css({
                            position: 'static'
                        });

                        var node = $nav.ojConveyorBelt("getNodeBySubId", {'subId': 'oj-conveyorbelt-end-overflow-indicator'});
                        if ($(node).hasClass('oj-helper-hidden')) {
                            //console.log("im here");
                            $('.oj-conveyorbelt-content-container').css({
                                'justify-content': 'center'
                            });
                        }
                    }
                });

                $(this).find('.app-nav-label').animate({'top': '53px'}, {queue: false})
            });

            //$(item).find('.app-nav-label').animate({'top': '67px'}, {queue: false});

            // $(self.auxgrid()).animate({
            //     width: '100%'
            // },{
            //     queue: false,
            //     duration: 750
            // });

            //item.addClass('ocaj-svg-selected');
            self.filmstripEnabled(true);
        }

        filmstripAnimations = function (item) {

            //Revert previously selected item
            $('.ocaj-svg-selected').addClass('ocaj-half-opaque');
            $('.ocaj-svg-selected').css({marginTop: '18px'});
            $('.ocaj-svg-selected').find('.app-nav-label').animate({'top': '53px'}, {queue: false});
            $('.ocaj-svg-selected').removeClass('ocaj-svg-selected');

            //Change the sizes of the new item
            item.addClass('ocaj-svg-selected');
            $(item).find('.app-nav-label').animate({'top': '61px'});
            $(item).animate({'margin-top': '3px'}, {queue: false});
            item.removeClass('ocaj-half-opaque');
        }

        self.navigateExternal = function (id) {
            var node = $('#' + id);
            var group = node.attr('group');
            $('.app-nav-item[type=itemNode][group=' + group + ']').css('display', 'inline-block');
            clickCard(node, true);
        }

        clickCard = function (itemNode, external) {
            /*var hiddenButton = AdfPage.PAGE.findComponentByAbsoluteId("pt1:hidden");
             var adfCustomEvent = new AdfCustomEvent(hiddenButton, "iconClicked", {
             itemNodeId: itemNode.attr('id')
             }, false);
             adfCustomEvent.queue(false);*/
            if (self.actionCallback && typeof (self.actionCallback) == 'function') {
                if (self.showFilmstrip() && !self.filmstripEnabled()) {
                    createFilmstrip(itemNode);
                }

                if (self.filmstripEnabled()) {
                    filmstripAnimations(itemNode);
                }

                if(!external)
                    self.actionCallback(itemNode.attr('page'), itemNode.attr('focus'), itemNode.attr('id'), itemNode.attr('webapp'), itemNode.attr('group'));
            }
        }

        calcColCount = function () {
            /**
             * responsive design for number of columns
             */
            var containerW = window.innerWidth;

            /* use this if you wnat it to be responsive upto mobile */
            /*if (containerW < 768) {
                colCount = 2;
            } else if (containerW < 1024) {
                colCount = 3;
            } else if (containerW < 1280) {
                colCount = 4;
            } else if (containerW < 1440) {
                colCount = 5;
            } else {
                colCount = 6;
            }*/

            if (containerW < 1280) {
                colCount = 4;
            } else if (containerW < 1440) {
                colCount = 5;
            } else {
                colCount = 6;
            }

        }


        movefilmstripup = function (index) {
            /*var $app = $("#app-watermark")*/
            //var $nav = $("#app-navigation");
            /*var $hdr = $("#app-header");*/
            currIndex = index;

            var $items = $nav.find('.app-nav-item[type!=itemNode]');
            var num_items = $items.length;

            //calcColCount();

            var gridBottomPadding = 10;
            var clustername = $nav.find('.app-nav-item[type=groupNode][categoryindex=' + index + ']');

            var movedistance = parseInt($('.cluster-container[name=' + clustername.attr('group') + ']').css('height'));
            var h = (Math.ceil(num_items / colCount)) * cellHeight + gridBottomPadding - movedistance;
            $nav.css({
                "height": h
            });

            $nav.find('.app-nav-item[type!=itemNode]').each(function (i) {

                if ($(this).attr('categoryindex') > (parseInt(index / colCount) * colCount + colCount - 1)) {
                    var position = y + parseInt($(this).attr('categoryindex') / colCount) * cellHeight;

                    $(this).animate({
                        'top': position
                    }, 300)

                }

            });

            $nav.find('.app-nav-item[type!=itemNode]').each(function (i) {
                $(this).css({
                    "opacity": "1"
                });
            });

        }

        movefilmstripdown = function (index, name) {
            /*var $app = $("#app-watermark");*/
            //var $nav = $("#app-navigation");
            /*var $hdr = $("#app-header");*/
            currIndex = index;
            currName = name;
            //alert('move down');
            var $items = $nav.find('.app-nav-item[type!=itemNode]');
            var num_items = $items.length;

            calcColCount();

            //If number of items is less than or equal to 9, override the column count to 3 irrespective of the threshold
            if (num_items <= 9) {
                colCount = 3;
                cellWidth = 178;
            }

            var clustername = $nav.find('.app-nav-item[type=groupNode][categoryindex=' + index + ']');
            var movedistance = parseInt($('.cluster-container[name=' + clustername.attr('group') + ']').css('height'));

            var h = (Math.ceil(num_items / colCount)) * cellHeight + y + movedistance;
            $nav.css({
                "height": h
            });

            var clickedRow = parseInt(index / colCount) * colCount + colCount - 1;
            var reqMoveDist = 0;

            $nav.find('.app-nav-item[type!=itemNode]').each(function (i) {

                if ($(this).attr('categoryindex') > 0) {
                    var position = y + parseInt($(this).attr('categoryindex') / colCount) * cellHeight;

                    if ($(this).attr('categoryindex') <= clickedRow) {
                        reqMoveDist = 0;
                    } else {
                        reqMoveDist = movedistance;
                    }

                    $(this).animate({
                        'top': position + reqMoveDist
                    }, 300)

                }
            });

            $nav.find('.app-nav-item[type!=itemNode]').each(function (i) {
                if (index != i) {
                    $(this).css({
                        "opacity": "0.3"
                    });
                }
            });

        }

        arrangeNavigationElementsOnHomePage = function () {

            $('#app-navigation').show();

            // $('#infolets_container').show();

            // $('.belt-indicator-container').hide();
            app_state = "Home Page";
            $('.cluster-container').fadeOut(250);

            /*var $app = $(".application-container-width");*/
            //var $nav = $("#app-navigation");
            /*var $hdr = $("#app-header");*/

            var $items = $nav.find('.app-nav-item[type!=itemNode]');
            var num_items = $items.length;

            /**
             * responsive design for number of columns
             */
            var containerW = window.innerWidth;

            var colCount, subClusterItemCount;
            var subClusterCellWidth
            /*
             // not sure what this is for, but replacing all 150s with this variable
             var cellWidth = 158;
             
             var cellHeight = 153;*/

            //If the number of items in the springboard are less than 9, fix the grid to a 3xn grid always
            if (num_items <= 9) {
                colCount = 3;
                subClusterColCount = 4;
                subClusterCellWidth = 118;
                cellWidth = 178;
            } else {
                //The sub cluster column count is always one more than the cluster column count
                //Fixing the width of suncluster to 132 so that porper number of subcluster icons can fit inside the cluster container
                
                //use this to make the springboard fully responsive
                /*if (containerW < 768) {
                    colCount = 2;
                    subClusterColCount = 3;
                    subClusterCellWidth = 100;
                    prevScreenThreshold = 360;
                } else if (containerW < 1024) {
                    colCount = 3;
                    subClusterColCount = 4;
                    subClusterCellWidth = 108;
                    prevScreenThreshold = 768;
                } else */

                if (containerW < 1280) {
                    colCount = 4;
                    subClusterColCount = 5;
                    subClusterCellWidth = 118;
                    prevScreenThreshold = 1024;
                } else if (containerW < 1440) {
                    colCount = 5;
                    subClusterColCount = 6;
                    subClusterCellWidth = 127;
                    prevScreenThreshold = 1280;
                } else {
                    colCount = 6;
                    subClusterColCount = 7;
                    subClusterCellWidth = 132;
                    prevScreenThreshold = 1440;
                }
            }

            /*var appW = $app.width();
             var appH = $app.height();
             var hdrH = $hdr.height();*/



            /*var navW = $nav.width();*/


            /*var navH = appH - hdrH;*/
            var clusterposition = {};

            // these are the initial positions for top and left
            var x = 15;
            //y = 20;

            var h = (Math.ceil(num_items / colCount)) * cellHeight + y;
            var w = colCount * cellWidth;

            $nav.css({
                "height": h,
                "width": w,
                "position": "relative"
            });

            $items.each(
                    function (i) {
                        $item = $(this);
                        $item.removeClass('selected');
                        if (dir_rtl == false) {
                            $item.animate({
                                "opacity": 1,
                                "left": x + (i % colCount) * cellWidth,
                                "top": y + parseInt(i / colCount) * cellHeight
                            }, 600);
                        } else {
                            $item.animate({
                                "opacity": 1,
                                "right": x + (i % colCount) * cellWidth,
                                "top": y + parseInt(i / colCount) * cellHeight
                            }, 600);
                        }

                        $cluster = $nav.find(".cluster-container");
                        $clustercontainer = "";
                        if ($cluster.length > 0) {
                            $clustercontainer = $nav.find(".cluster-container[name='" + $(this).attr('group') + "']");
                        }
                        if ($clustercontainer.length > 0) {
                            subClusterItemCount = $nav.find('.app-nav-item[type=itemNode][group=' + $(this).attr('group') + ']').length;
                            var clustercontainerheight = parseInt((subClusterItemCount) / subClusterColCount) + 1;

                            if ((subClusterItemCount % subClusterColCount) === 0)
                                clustercontainerheight--;

                            $clustercontainer.css({
                                "top": y + parseInt(i / colCount) * cellHeight + 120,
                                "height": clustercontainerheight * 100 + 30,
                                "width": cellWidth * (colCount - 1) + 2 * x
                            });

                            if (dir_rtl == false) {
                                $clustercontainer.children('.cluster-inner-container').css({
                                    "margin-left": (i % colCount) * cellWidth + 35
                                });
                            } else {
                                $clustercontainer.children('.cluster-inner-container').css({
                                    "margin-right": (i % colCount) * cellWidth + 35
                                });
                            }


                        }



                        clusterposition[$(this).attr('group')] = i;

                    }
            );

            $clusteritems = $nav.find('.app-nav-item[type=groupNode]');

            var grouparray = new Array();

            $clusteritems.each(
                    function (i) {
                        if (grouparray.indexOf($(this).attr('group')) == -1) {
                            grouparray.push($(this).attr('group'));

                        }

                    });

            for (var a = 0; a < grouparray.length; a++) {

                //find all the elements of the group
                $groupcluster = $nav.find('.app-nav-item[type=itemNode][group=' + grouparray[a] + ']');

                var positionx = x + (clusterposition[grouparray[a]] % colCount) * cellWidth;

                var positiony = parseInt(clusterposition[grouparray[a]] / colCount) * cellHeight + y;

                //If the column count is less than the number of items in the cluster, center align the sub-cluster items
                if ($groupcluster.length < subClusterColCount) {
                    //For center aligning, first find out the the current cluster's position
                    currentClusterPos = $nav.offset().left + positionx;

                    //The mid element of the subcluster should be in the middle of the current cluster
                    midSubClusterElmnt = $groupcluster.length / 2;

                    //Using the above calc, find out the position of the first sub cluster element.
                    //The last division is added to make sure that the center of the midSubClusterElmnt aligns correctly with the cluster element
                    firstSubclusterElmntPos = currentClusterPos - (midSubClusterElmnt * subClusterCellWidth) + (subClusterCellWidth / 2);

                    //If the position of the first element is beyond the offset of app-navigation div, start from the left position of app-navigation
                    (firstSubclusterElmntPos < $nav.offset().left) ? firstSubclusterElmntPos = 20 : firstSubclusterElmntPos = (firstSubclusterElmntPos - $nav.offset().left);

                    //Also, find out last sub cluster element's position
                    lastClusterElmntPos = $nav.offset().left + (colCount * cellWidth);

                    lastSubClusterElmntPos = $nav.offset().left + firstSubclusterElmntPos + (subClusterCellWidth * $groupcluster.length);

                    //If the last sub-cluster element position is greater than the last cluster element position, subtract the offset from the first sub cluster element's position
                    if (lastSubClusterElmntPos > lastClusterElmntPos) {
                        firstSubclusterElmntPos = firstSubclusterElmntPos - (lastSubClusterElmntPos - lastClusterElmntPos);
                    }

                    $groupcluster.each(
                            function (i) {
                                //$(this).children('.label').css('color', '#1d4a6d')
                                $item = $(this);
                                $item.fadeOut();
                                $item.removeClass('selected');
                                if (dir_rtl == false) {
                                    $item.animate({
                                        "opacity": 1,
                                        "left": firstSubclusterElmntPos + (i * subClusterCellWidth),
                                        "top": parseInt(i / subClusterColCount) * 100 + positiony + cellHeight
                                    }, 600);
                                } else {
                                    $item.animate({
                                        "opacity": 1,
                                        "right": firstSubclusterElmntPos + (i * subClusterCellWidth),
                                        "top": parseInt(i / subClusterColCount) * 100 + positiony + cellHeight
                                    }, 600);
                                }
                            }
                    );
                }
                // else left align the cluster items
                else {
                    $groupcluster.each(
                            function (i) {
                                //$(this).children('.label').css('color', '#1d4a6d')
                                $item = $(this);
                                $item.fadeOut();
                                $item.removeClass('selected');
                                if (dir_rtl == false) {
                                    $item.animate({
                                        "opacity": 1,
                                        "left": x + (i % subClusterColCount) * subClusterCellWidth,
                                        "top": parseInt(i / subClusterColCount) * 100 + positiony + cellHeight
                                    }, 600);
                                } else {
                                    $item.animate({
                                        "opacity": 1,
                                        "right": x + (i % subClusterColCount) * subClusterCellWidth,
                                        "top": parseInt(i / subClusterColCount) * 100 + positiony + cellHeight
                                    }, 600);
                                }
                            }
                    );
                }
            }
        }

        bindNavItems = function () {
            //var $nav = $("#app-navigation");
            $clusteritems = $nav.find('.app-nav-item[type=itemNode]');
            var grouparray = new Array();
            $clusteritems.each(
                    function (i) {
                        if (grouparray.indexOf($(this).attr('group')) == -1) {
                            grouparray.push($(this).attr('group'))
                        }
                    });
            for (var a = 0; a < grouparray.length; a++) {
                $nav.find('.app-nav-item[type=itemNode][group=' + grouparray[a] + ']').not("#nav-reports-and-analytics, #nav-scheduled-processes, #nav-worklist").bind('click',
                        function (item) {
                            $('.cluster-container').fadeOut();
                            var animate = true;
                            clickCard($(this), false);
                        });
            }
            var check;
            $('#app-navigation').on('click', function () {

                $('.cluster-container').each(function (i) {
                    check = $(this).css('display');
                    if (check == 'block') {
                        //movefilmstripup(currIndex);
                        return false;
                    }
                });

            });

            $nav.find('.app-nav-item[type=groupNode]').on('click', function (i) {

                //Fadeout any open cluster containers
                $('.cluster-container[name!=' + $(this).attr('group') + ']').fadeOut();

                //Fadeout any subclusters inside the cluster containers
                $nav.find('.app-nav-item[type=itemNode][group!=' + $(this).attr('group') + ']').fadeOut();

                //Change the opacity of other clusters and top level icons so that selected cluster is highlighted
                $nav.find('.app-nav-item[type!=itemNode]').each(function (i) {
                    index = $(this).attr('categoryindex');
                    if (index != i) {
                        $(this).css({
                            "opacity": "0.3"
                        });
                    } else {
                        $(this).css({
                            "opacity": "1"
                        });
                    }
                });

                //Now, if cluster is already open, hide it else open it
                if ($('.cluster-container[name=' + $(this).attr('group') + ']').css('display') == 'block') {
                    $('.cluster-container[name=' + $(this).attr('group') + ']').hide();
                    $nav.find('.app-nav-item[type=itemNode][group=' + $(this).attr('group') + ']').fadeOut();
                    //check="none";
                    movefilmstripup($(this).attr('categoryindex'));
                } else {
                    $('.cluster-container[name=' + $(this).attr('group') + ']').show();
                    $nav.find('.app-nav-item[type=itemNode][group=' + $(this).attr('group') + ']').slideDown();
                    movefilmstripdown($(this).attr('categoryindex'), $(this).attr('group'));
                }
            });

            $nav.find('.app-nav-item[type=topitemNode]').bind('click',
                    function (i) {
                        $('.cluster-container').fadeOut();
                        var animate = true;
                        clickCard($(this), false);
                    });


        }

        generateHomeGrid = function (data) {
            //nav_data = data;
            //$nav = $('#app-navigation');
            var html = "";
            var clusterhtml = '';
            var clustercontainerhtml = '';
            var checkgroup = '';
            var count = 0;
            var categorycount = 0;

            //Use the data from root menu to create soringboard and sort them into clusters, subcluste and toplevel items
            $.each(data.restNavMenuNodes,
                    function (i, item) {
                        var itemvisible = '';

                        var id = item.id;

                        if (item.visible == false)
                            return;

                        var filmstrip = "filmstrip-item";

                        var itemlabel = '';
                        var itemicon = '';
                        itemlabel = item.label;

                        if (item.hasOwnProperty('restNavMenuNode')) {
                            html += "<div style='position: absolute; opacity:0' " +
                                    "id='" + item.id + "'" +
                                    "class='app-nav-item " + "' focus='" + itemlabel + "' page='" + item.url + "' index=" + i + " type='" + item.nodeType + "' " + " group='" + item.id + "' " + " categoryindex='" + categorycount++ + "'>" +
                                    "<div class='svg-nav svg-cluster-show suiicon' data-icon='navi_" + item.cardIcon + "'>" + "</div>" +
                                    "<a class='app-nav-label top-nav-label' href='#'>" + item.label + "</a>" +
                                    "</div>";

                            clustercontainerhtml += '<div class="cluster-container"' + ' name="' + item.id + '"><div class="cluster-inner-container"></div></div>';

                            $.each(item.restNavMenuNode, function (i, node) {
                                if (node !== null) {
                                    clusterhtml += "<div style='position:absolute;opacity:0; z-index:100' " +
                                            "id='" + node.id + "' " +
                                            "class='app-nav-item " + "' focus='" + node.focusViewId + "' page='" + node.taskMenuSource + "' index=" + i + " type='" + node.nodeType + "' " + " group='" + id + "' webapp='" + node.webapp + "'>" +
                                            "<div class='svg-nav-cluster suiicon' data-icon='navi_" + node.cardIcon + "'>" + "</div>" +
                                            "<a class='app-nav-label' href='#'>" + node.label + "</a>" +
                                            "</div>";
                                }
                            });

                        } else if (item.showOnHomeGrid === 'true') {
                            html += "<div style='position:absolute;opacity:0' " +
                                    "id='" + item.id + "'" +
                                    "class='app-nav-item " + "' focus='" + item.focusViewId + "' page='" + item.taskMenuSource + "' index=" + i + " type='top" + item.nodeType + "' " + " group='nogroup' " + " categoryindex='" + categorycount++ + "'>" +
                                    "<div class='svg-nav svg-shortcut-show suiicon' data-icon='navi_" + item.cardIcon + "' webapp='" + item.webapp + "'>" + "</div>" +
                                    "<a class='app-nav-label top-nav-label' href='#'>" + item.label + "</a>" +
                                    "</div>";
                        }
                    });

            //insert the created html into app-navigation container
            $nav.html(html);
            $nav.append(clusterhtml);
            $nav.append(clustercontainerhtml);

            //bind the springboard items to click
            bindNavItems();

            arrangeNavigationElementsOnHomePage();

        }
        
        restoreHomeGrid = function(data){
            $nav.remove();
            self.filmstripEnabled(false);
            $(context.element).prepend('<div class="ocaj-springboard-main-container" id="app-navigation"></div>');
            $nav = $('#app-navigation');
            generateHomeGrid(data);
            injectSVG();
        }

        window.onresize = function () {
            if (!self.filmstripEnabled()) {
                //Calculate the screen width
                var screenWidth = window.innerWidth;

                //No change necessary if the screen width is less than 1024px. Else, check the previous threshold and call sprinboard arranging function if the screen width crosses thresholds
                if (screenWidth < 1024)
                    return;
                else {
                    switch (prevScreenThreshold) {
                        /* use this for full responsivenes upto mobile
                        /*case 360:
                            if (screenWidth > 767) {
                                console.log("Resize function called");
                                arrangeNavigationElementsOnHomePage();
                            }
                            break;*/
                        
                        case 1024:
                            if (screenWidth > 1279 || screenWidth < 1024) {
                                arrangeNavigationElementsOnHomePage();
                            }
                            break;

                        case 1280:
                            if (screenWidth > 1439 || screenWidth < 1280) {
                                arrangeNavigationElementsOnHomePage();
                            }
                            break;

                        case 1440:
                            if (screenWidth < 1439) {
                                arrangeNavigationElementsOnHomePage();
                            }
                            break;

                        default:
                            break;

                    }
                }
            }
        }

        propsPromise.then(function (props) {

            self.auxgrid(context.element);
            self.actionCallback = props.actionCallback;
            self.showFilmstrip(props.filmstripEnabled);
            //console.log(props.data);
            self.attached = function (context) {
                $nav = $('#app-navigation');
                //console.log($nav);
                generateHomeGrid(props.data);

                injectSVG();
                
                //Set externalNavigation-changed event
                self.auxgrid().addEventListener('filmstripMode-changed', function(event){
                    console.log(event.detail.value);
                    if(event.detail.value == 'grid')
                        restoreHomeGrid(props.data);
                });
            }
        });
    }

    return fndSpringboardModel;
});
