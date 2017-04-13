define(['knockout', 'ojs/ojcore', 'jquery',
    'ojs/ojknockout', 'promise', 'ojs/ojdatagrid',
    'ojs/ojcollectiondatagriddatasource', 'ojs/ojarraydatagriddatasource', 'ojs/ojselectcombobox', 'ojs/ojtoolbar', 'ojs/ojtable',
    'ojs/ojarraytabledatasource', 'ojs/ojcollectiontabledatasource', 'ojs/ojcheckboxset', 'ojs/ojdatetimepicker',
    'ojs/ojcollectiondatagriddatasource', 'ojs/ojarraydatagriddatasource', 'ojs/ojselectcombobox', 'ojs/ojinputtext',
    'ojs/ojslider', 'ojs/ojflattenedtreedatagriddatasource',
    'ojs/ojchart', 'ojs/ojaccordion'], function (ko, oj, $) {

    function facetedSearchModel(context) {

        var self = this;
        self.expanded = ko.observable(false);
        var propsPromise = context.props;
        self.facetData = ko.observableArray();
        self.keywordSearchValue = ko.observable();
        self.rangeSliderValue = ko.observableArray([]);
        //self.tableDataSource = ko.observable();
        self.tableData = ko.observableArray([]);
        self.selectedCheckboxValue = ko.observable("");
        self.cardCol = ko.observable();
        self.serviceURL = ko.observable();
        self.rangeMin = ko.observable();
        self.rangeMax = ko.observable();
        self.rangeStep = ko.observable();
        self.numberStart = ko.observable();
        self.numberEnd = ko.observable();
        self.dateStart = ko.observable();
        self.dateEnd = ko.observable();
        self.dateRangeButton = ko.observable(true);
        self.filterToolbars = ko.observableArray([]);
        self.isFilterHidden = ko.observable(false);
        self.currentMediaQuery = ko.observable();
        self.selectedButtonSet = ko.observable();

        var filtersMap = new Map(); //keep value of all filters currently active
        var attrLabelValueMap = new Map(); //filterAttr and headerText map
        self.valueArray = ko.observableArray([0, 150000]);
        
        self.stackValue = ko.observable('off');
        self.stackLabelValue = ko.observable('off');
        self.orientationValue = ko.observable('horizontal');
        self.labelPosition = ko.observable('center');

        self.innerDrawer =
                {
                    "displayMode": "overlay",
                    "selector": "#filterPanel",
                    "content": "#resultSection"
                };

        self.toggleInner = function ()
        {
            oj.OffcanvasUtils.toggle(this.innerDrawer);
        };

        propsPromise.then(function (props) {
            var facetSearchData = [];
            for (var i in props.facetList) {
                var facetInfo = props.facetList[i];
                var dataSliced = [];
                if (facetInfo.type === 'checkbox') {
                    if (facetInfo.jsonData.length > 10) {
                        dataSliced = facetInfo.jsonData;
                    } else if (facetInfo.jsonData.length <= 10) {
                        dataSliced = facetInfo.jsonData.slice(0, 5);
                    }
                } else {
                    dataSliced = facetInfo.jsonData;
                }
                
                facetSearchData.push({
                    jsonData: dataSliced,
                    jsonDataSize: facetInfo.jsonData.length,
                    isExpanded: false,
                    filterAttribute: facetInfo.filterAttribute,
                    headerText: facetInfo.headerText,
                    type: facetInfo.type,
                    clearFlag: facetInfo.clearFlag,
                    rangeEnabled: facetInfo.rangeEnabled,
                    min: facetInfo.min,
                    max: facetInfo.max,
                    step: facetInfo.step,
                    selectedValue: '',
                    rangeArray: [facetInfo.min, facetInfo.max],
                    barSeriesValue: facetInfo.barSeriesValue,
                    barGroupsValue: facetInfo.barGroupsValue
                });
                attrLabelValueMap.put(facetInfo.filterAttribute, facetInfo.headerText);
            }
            self.facetData(facetSearchData);
            /*self.serviceURL(props.serviceUrl);

            var model = oj.Model.extend({
                idAttribute: props.keyAttribute
            });
            self.dataCollection = new oj.Collection(null, {
                url: self.serviceURL(),
                model: model
            });*/

            self.cardCol(props.collectionData);
            //self.tableDataSource(new oj.CollectionTableDataSource(self.dataCollection));
            /*self.cardViewDataSource = ko.computed(function() {
                return self.tableDataSource(); //new oj.PagingTableDataSource(self.tableDataSource());
            });*/

            
            self.keyboardSearchHandler = function () {
                var filterList = [];
                var attrName = props.keywordSearchAttribute;
                var qString = new SearchObject(self.keywordSearchValue()[0]);
                filterList.push(qString);
                function SearchObject(name) {
                    this[attrName] = name;
                }
                JSON.stringify(filterList);
                var key = attrName + ':' + 'link';
                filtersMap.put(key, filterList);
                self.applyFiler();
            }
            
            /*
             * 
             * @param {type} event
             * @param {type} ui
             */
            self.buttonSetFilterOptionChange = function (event, ui) {
                if (ui.option === "checked") {
                    console.log(self.selectedButtonSet());
                    var selectedValue = self.selectedButtonSet();
                    var attrName = 'country';
                    var filterList = [];

                    var qString = new SearchObject(selectedValue);
                    filterList.push(qString);
                    function SearchObject(name) {
                        this[attrName] = name;
                    }

                    JSON.stringify(filterList);
                    var key = attrName + ':' + 'checkbox';
                    filtersMap.put(key, filterList);
                    self.applyFiler();
                }
            }
            
            /*
             * 
             * @param {type} event
             * @param {type} selectedData
             */
            self.barFilterOptionChange = function(event, selectedData) {
                console.log(selectedData.value[0].group);
                var selectedValue = selectedData.value[0].group;
                var attrName = 'jobTitle';
                var filterList = [];
                
                var qString = new SearchObject(selectedValue);
                filterList.push(qString);
                function SearchObject(name) {
                    this[attrName] = name;
                }
                
                JSON.stringify(filterList);
                var key = attrName + ':' + 'checkbox';
                filtersMap.put(key, filterList);
                self.applyFiler();
            }

            /*
             * 
             * @param {type} attrName
             * @param {type} event
             * @param {type} selectedData
             * Handler for checkbox type filters, filters collection and updates TableDataSource
             */
            self.checkboxFacetOptionChange = function (attrName, event, selectedData) {
                if (selectedData.option !== 'value') {
                    return;
                }
                if (selectedData.value.length === 0) {
                    //reset to original list
                    props.collectionDataSource = new oj.CollectionTableDataSource(self.cardCol());
                } else {
                    //apply filter
                    var index = 0;
                    var filterList = [];
                    for (index = 0; index < selectedData.value.length; index = index + 1) {
                        var qString = new SearchObject(selectedData.value[index]);
                        filterList.push(qString);
                        function SearchObject(name) {
                            this[attrName] = name;
                        }
                    }
                    JSON.stringify(filterList);
                    var key = attrName + ':' + 'checkbox';
                    filtersMap.put(key, filterList);
                    self.applyFiler();
                }
            }

            self.radioFacetOptionChange = function (attrName, event, selectedData) {
                if (selectedData.option !== 'value') {
                    return;
                }
                self.dateRangeButton(true);
                var key = attrName + ':' + 'datetime';
                var dataArray = [];
                var options = {pattern: 'yyyy-MM-dd'};
                var converterFactory = oj.Validation.converterFactory("dateTime");
                converter = converterFactory.createConverter(options);
                var today = new Date();
                if (selectedData.value === 'today') {
                    var formattedDate = converter.format(oj.IntlConverterUtils.dateToLocalIso(today));
                    dataArray.push(formattedDate);
                    dataArray.push(formattedDate);

                } else if (selectedData.value === 'week') {
                    var dateEarlier = new Date();
                    dateEarlier.setDate(today.getDate() - 7);
                    var formattedDateStart = converter.format(oj.IntlConverterUtils.dateToLocalIso(dateEarlier));
                    var formattedDate = converter.format(oj.IntlConverterUtils.dateToLocalIso(today));
                    dataArray.push(formattedDateStart);
                    dataArray.push(formattedDate);

                } else if (selectedData.value === 'month') {
                    var dateEarlier = new Date();
                    dateEarlier.setDate(today.getDate() - 30);
                    var formattedDateStart = converter.format(oj.IntlConverterUtils.dateToLocalIso(dateEarlier));
                    var formattedDate = converter.format(oj.IntlConverterUtils.dateToLocalIso(today));
                    dataArray.push(formattedDateStart);
                    dataArray.push(formattedDate);

                } else if (selectedData.value === 'year') {
                    var dateEarlier = new Date();
                    dateEarlier.setDate(today.getDate() - 365);
                    var formattedDateStart = converter.format(oj.IntlConverterUtils.dateToLocalIso(dateEarlier));
                    var formattedDate = converter.format(oj.IntlConverterUtils.dateToLocalIso(today));
                    dataArray.push(formattedDateStart);
                    dataArray.push(formattedDate);

                } else {
                    //self.dateRangeButton(false);
                }
                filtersMap.put(key, dataArray);
                self.applyFiler();
            }
            
            self.customRadioFacetOptionChange = function (event, selectedData) {
                if (selectedData.option !== 'value') {
                    return;
                }
                self.dateRangeButton(false);
            }

            self.customDateSearchHandler = function (attrName) {
                var key = attrName + ':' + 'datetime';
                var dataArray = [];
                var options = {pattern: 'yyyy-MM-dd'};
                var converterFactory = oj.Validation.converterFactory("dateTime");
                converter = converterFactory.createConverter(options);
                var formattedDateStart = new Date(self.dateStart());
                var formattedDateEnd = new Date(self.dateEnd());
                dataArray.push(formattedDateStart);
                dataArray.push(formattedDateEnd);
                filtersMap.put(key, dataArray);
                self.applyFiler();
            }

            /*
             * 
             * @param {type} startValue
             * @param {type} endValue
             * @param {type} event
             * @param {type} selectedData
             */
            self.rangeSliderFacetOptionChange = function (startValue, endValue, attrName, event, selectedData) {
                if (selectedData.option !== 'value') {
                    return;
                }
                var dataArray = [];
                dataArray.push(startValue);
                dataArray.push(endValue);
                var key = attrName + ":" + 'rangeSlider';
                filtersMap.put(key, dataArray);
                self.applyFiler();
            }

            /*
             * 
             * @param {type} event
             * @param {type} ui
             */
            self.chartOptionChange = function (event, ui) {
                var selectedData = ui.value[0]['group'];
                var dataArray = selectedData.split('-');
                var key = 'dealSize' + ':' + 'rangeSlider';
                self.valueArray.removeAll();
                self.valueArray.push(dataArray[0]);
                self.valueArray.push(dataArray[1]);
                filtersMap.put(key, dataArray);
                self.applyFiler();
            }

            /*
             * 
             * @param {type} selectedData
             * @param {type} attrName
             * @returns {undefined}
             */
            self.amountRangeFacetOptionChange = function (selectedData, attrName) {
                var dataArray = selectedData.split('-');
                var key = attrName + ':' + 'numRange';
                filtersMap.put(key, dataArray);
                self.applyFiler();
            }

            /*
             * 
             * @param {type} selectedData
             * @param {type} attrName
             */
            self.linkFacetOptionChange = function (selectedData, attrName) {
                var filterList = [];
                var qString = new SearchObject(selectedData);
                filterList.push(qString);
                function SearchObject(name) {
                    this[attrName] = name;
                }
                JSON.stringify(filterList);
                var key = attrName + ':' + 'link';
                filtersMap.put(key, filterList);
                self.applyFiler();
            }

            /*
             * 
             * @param {type} filterValue
             * Takes filterValue which is array of attr/value pair as input applies 
             * it to the collection
             */
            self.applyFiler = function () {
                var index = 0, filterType;
                var filteredModel = [];
                var tmpData = self.cardCol();
                for (index = 0; index < filtersMap.size(); index++) {
                    var item = filtersMap.entrys()[index];
                    var splittedString = item.key.split(':');
                    var filterType = splittedString[1];
                    if (filterType === 'link' || filterType === 'checkbox') {
                        filteredModel = tmpData.where(filtersMap.get(item.key));
                        var tmpCollection = new oj.Collection(filteredModel);
                        tmpData = tmpCollection;
                    } else if (filterType === 'numRange' || filterType === 'rangeSlider') {
                        var size = tmpData.size();
                        var modelArr = tmpData.slice(0, size);
                        var rangeindex = 0;
                        var rangeFilteredModel = [];
                        for (rangeindex = 0; rangeindex < size; rangeindex++) {
                            var obj = modelArr[rangeindex].previousAttributes();
                            var filterRangeArr = filtersMap.get(item.key);
                            var attrName = splittedString[0];
                            var dealSize = obj[attrName];
                            if ((Number(dealSize) >= Number(filterRangeArr[0])) && (Number(dealSize) <= Number(filterRangeArr[1]))) {
                                rangeFilteredModel.push(modelArr[rangeindex]);
                            }
                        }
                        var tmpCollection = new oj.Collection(rangeFilteredModel);
                        tmpData = tmpCollection;
                    } else if (filterType === 'datetime') {
                        var size = tmpData.size();
                        var modelArr = tmpData.slice(0, size);
                        var rangeindex = 0;
                        var rangeFilteredModel = [];
                        for (rangeindex = 0; rangeindex < size; rangeindex++) {
                            var obj = modelArr[rangeindex].previousAttributes();
                            var filterRangeArr = filtersMap.get(item.key);
                            var attrName = splittedString[0];
                            var attrValue = obj[attrName];
                            var date1 = new Date(filterRangeArr[0]);
                            var date2 = new Date(filterRangeArr[1]);
                            var options = {pattern: 'yyyy-MM-dd'};
                            var converterFactory = oj.Validation.converterFactory("dateTime");
                            converter = converterFactory.createConverter(options);
                            var convertedAttrValue = new Date(converter.format(attrValue));
                            if (convertedAttrValue.getTime() >= date1.getTime() && convertedAttrValue.getTime() <= date2.getTime()) {
                                rangeFilteredModel.push(modelArr[rangeindex]);
                            }
                        }
                        var tmpCollection = new oj.Collection(rangeFilteredModel);
                        tmpData = tmpCollection;
                    }
                }
                self.prepareFilteredArray();
                props.collectionDataSource = new oj.CollectionTableDataSource(tmpData);
                self.setClearFlag();
            }

            self.prepareFilteredArray = function () {
                /*var index = 0;
                self.filterToolbars.removeAll();
                for (index = 0; index < filtersMap.size(); index++) {
                    var item = filtersMap.entrys()[index];
                    var splittedString = item.key.split(':');
                    var filterAttr = splittedString[0];
                    var filterType = splittedString[1];
                    var filterValue = filtersMap.get(item.key);
                    var filterLOV = [];
                    if (filterType === 'link') {
                        filterLOV.push(filterValue[0][filterAttr]);
                        var headerText = attrLabelValueMap.get(filterAttr);
                        if (headerText === undefined || headerText === null) {
                            headerText = filterAttr;
                        }
                        self.filterToolbars.push({headerText, filterAttr, filterLOV, filterType});
                    } else if (filterType === 'checkbox') {
                        for (var i in filterValue) {
                            filterLOV.push(filterValue[i][filterAttr]);
                        }
                        var headerText = attrLabelValueMap.get(filterAttr);
                        self.filterToolbars.push({headerText, filterAttr, filterLOV, filterType});
                    } else if (filterType === 'numRange' || filterType === 'dateRange' || filterType === 'rangeSlider') {
                        var value = filterValue[0] + '-' + filterValue[1];
                        filterLOV.push(value);
                        var headerText = attrLabelValueMap.get(filterAttr);
                        self.filterToolbars.push({headerText, filterAttr, filterLOV, filterType});
                    }
                }
                self.checkForOverflow();*/
            }

            self.setClearFlag = function () {
                /* var facetSearchData = self.facetData();
                 var searchData = [];
                 for (var i in facetSearchData) {
                 var facetInfo = facetSearchData[i];
                 var isUpdated = false;
                 for (index = 0; index < filtersMap.size(); index++) {
                 var item = filtersMap.entrys()[index];
                 var splittedString = item.key.split(':');
                 var attrName = splittedString[0];
                 var filterType = splittedString[1];
                 if (filterType === 'numRange') {
                 filterType = 'number';
                 } else if (filterType === 'dateRange') {
                 filterType = 'date';
                 } else if (filterType === 'rangeSlider') {
                 filterType = 'range';
                 }
                 if (facetInfo.type === filterType && facetInfo.filterAttribute === attrName) {
                 facetInfo.clearFlag = true;
                 searchData.push(facetInfo);
                 isUpdated = true;
                 break;
                 }
                 }
                 if (isUpdated === false) {
                 facetInfo.clearFlag = false;
                 searchData.push(facetInfo);
                 }
                 }
                 self.facetData.removeAll();
                 self.facetData(searchData);*/
            }

            self.showMoreLessHandler = function () {
                var facetSearchData = self.facetData();
                var searchData = [];
                for (var i in facetSearchData) {
                    var facetInfo = facetSearchData[i];//props.facetList
                    if (facetInfo.type === 'checkbox') {
                        if (facetInfo.isExpanded === true) {
                            facetInfo.isExpanded = !facetInfo.isExpanded;
                            facetInfo.jsonData = props.facetList[i].jsonData.slice(0, 5);
                            searchData.push(facetInfo);
                        } else {
                            facetInfo.isExpanded = !facetInfo.isExpanded;
                            facetInfo.jsonData = props.facetList[i].jsonData;
                            searchData.push(facetInfo);
                        }
                        ;
                    } else {
                        searchData.push(facetInfo);
                    }
                }
                self.facetData.removeAll();
                self.facetData(searchData);
            }

            self.filterToolbarsWidth = function () {
                var element = $('.application-container-width');
                var width = element.width() - 550 + 'px';
                return width;
            }

            self.checkForOverflow = function () {
                var element = $('#filterItemContainer')
                        .clone()
                        .css({display: 'inline', width: 'auto', visibility: 'hidden'})
                        .appendTo('body');
                if (element.width() > $('#filterItemContainer').width()) {
                    $("#overflowicn").css({display: ''});
                } else {
                    $("#overflowicn").css({display: 'none'});
                }
                element.remove();
            }

            self.getPosition = function ()
            {
                return {'my': 'left top',
                    'at': 'start bottom',
                    'collision': 'none'};
            }

            self.clearAllHandler = function () {
                var index;
                for (index = 0; index < filtersMap.size(); index++) {
                    var item = filtersMap.entrys()[index];
                    filtersMap.remove(item.key);
                }
                self.selectedCheckboxValue('');
                self.keywordSearchValue(null);
                self.filterToolbars.removeAll();
                self.valueArray.removeAll();
               // self.valueArray.push(0);
               // self.valueArray.push(150000);
                $("#overflowicn").css({display: 'none'});
                props.collectionDataSource = new oj.CollectionTableDataSource(self.cardCol());
            }

            /*
             * 
             * @param {type} attrName
             * @param {type} filterType
             */
            self.clearHeaderSearch = function (attrName, filterType) {
                if (filterType === 'link') {
                    self.clearLinkFacetSearch(attrName);
                } else if (filterType === 'numRange') {
                    self.clearAmountFacetSearch(attrName);
                } else if (filterType === 'rangeSlider') {
                    self.clearRangeFacetSearch(attrName);
                } else if (filterType === 'checkbox') {
                    self.clearCheckboxFacetSearch(attrName);
                }
            }

            /*
             * 
             * @param {type} attrName
             */
            self.clearLinkFacetSearch = function (attrName) {
                var key = attrName + ':' + 'link';
                filtersMap.remove(key);
                self.applyFiler();
            }

            /*
             * 
             * @param {type} attrName
             */
            self.clearAmountFacetSearch = function (attrName) {
                var key = attrName + ':' + 'numRange';
                filtersMap.remove(key);
                self.applyFiler();
            }

            /*
             * 
             * @param {type} attrName
             */
            self.clearRangeFacetSearch = function (attrName) {
                var key = attrName + ':' + 'rangeSlider';
                filtersMap.remove(key);
                self.applyFiler();
            }

            /*
             * 
             * @param {type} attrName
             */
            self.clearCheckboxFacetSearch = function (attrName) {
                self.selectedCheckboxValue('');
                var key = attrName + ':' + 'checkbox';
                filtersMap.remove(key);
                self.applyFiler();
            }
        });

        function Map() {
            this.keys = new Array();
            this.data = new Object();

            this.put = function (key, value) {
                if (this.data[key] == null) {
                    this.keys.push(key);
                }
                this.data[key] = value;
            };

            this.get = function (key) {
                return this.data[key];
            };

            this.remove = function (key) {
                var index = this.keys.indexOf(key);
                this.keys.splice(index, 1);
                this.data[key] = null;
            };

            this.each = function (fn) {
                if (typeof fn != 'function') {
                    return;
                }
                var len = this.keys.length;
                for (var i = 0; i < len; i++) {
                    var k = this.keys[i];
                    fn(k, this.data[k], i);
                }
            };

            this.entrys = function () {
                var len = this.keys.length;
                var entrys = new Array(len);
                for (var i = 0; i < len; i++) {
                    entrys[i] = {
                        key: this.keys[i],
                        value: this.data[i]
                    };
                }
                return entrys;
            };

            this.isEmpty = function () {
                return this.keys.length == 0;
            };

            this.size = function () {
                return this.keys.length;
            };
        }

        function isScrolledTo(elem) {
            //console.log(elem);
            var docViewTop = $(window).scrollTop(); //num of pixels hidden above current screen
            var docViewBottom = docViewTop + $(window).height();
            var elemTop = elem.offset().top; //num of pixels above the elem
            var elemBottom = elemTop + $(elem).height();
            //console.log(elemTop+','+docViewTop);
            return ((elemTop <= docViewTop));
        }
        
        $(window).scroll(function() {
            var sticky = $('#filterPanelContent');
            var resultSection = $('#FS_result');
            var fs_root = $('#FS_root'); 
            var filtersTop = $('#FS_filtersTop'); 
            if (sticky.innerHeight() <= resultSection.innerHeight()) { //filter panel is less taller
                if (sticky !== undefined && sticky.offset() !== undefined) {
                    var posTop = sticky.offset().top;
                    var actualPosition = sticky.innerHeight() - ( 4 * posTop );
                    if ($(window).scrollTop() > 200 && $(window).scrollTop() >= actualPosition) {
                        sticky.css('position', 'fixed');
                        sticky.css('bottom', '10px');
                        sticky.css('width', '360px');
                    } else {
                        sticky.css('position', 'relative');
                        sticky.css('bottom', '0px');
                    }
                    var posTop = resultSection.offset().top;
                    var spHeight = $(".ocaj-simplepanel-container").innerHeight() ;
                    if ($(window).scrollTop() >= (posTop-spHeight)) {
                        filtersTop.addClass("ocaj-fs-stickey-filter");
                        filtersTop.css('top', (spHeight - 5) + 'px');
                        var width = '';
                        if(self.isFilterHidden()){
                           width = fs_root.width() -10 + 'px'; 
                        }
                        else{
                            width = fs_root.width() - 385 + 'px';
                        }
                        filtersTop.css('width', width);
                    } 
                    else{
                        filtersTop.removeClass("ocaj-fs-stickey-filter");
                        filtersTop.css('top', spHeight + 'px');
                    }
                }
            } 
        });

        self.closeFilterPanelMobile = function () {
            return oj.OffcanvasUtils.close(this.innerDrawer);
        }
        
        self.showHideCheckboxFacet = function () {
            if ($(".content2").attr('vis') == 'show') {
                $(".content2").slideUp();
                $(".content2").animate({height: '-=180'});
                $(".content2").attr('vis', 'hide');
            } else {
                $(".content2").slideDown();
                $(".content2").animate({height: '+=180'});
                $(".content2").attr('vis', 'show');
            }
        }

        self.showHideDateFacet = function () {
            if ($(".content3").attr('vis') == 'show') {
                $(".content3").slideUp();
                $(".content3").animate({height: '-=160'});
                $(".content3").attr('vis', 'hide');
            } else {
                $(".content3").slideDown();
                $(".content3").animate({height: '+=160'});
                $(".content3").attr('vis', 'show');
            }
        }

        self.showHideNumberFacet = function () {
            if ($(".content4").attr('vis') == 'show') {
                $(".content4").slideUp();
                $(".content4").animate({height: '-=160'});
                $(".content4").attr('vis', 'hide');
            } else {
                $(".content4").slideDown();
                $(".content4").animate({height: '+=160'});
                $(".content4").attr('vis', 'show');
            }
        }

        self.showHideRangeFacet = function () {
            if ($(".content5").attr('vis') == 'show') {
                $(".content5").slideUp();
                $(".content5").animate({height: '-=50'});
                $(".content5").attr('vis', 'hide');
            } else {
                $(".content5").slideDown();
                $(".content5").animate({height: '+=50'});
                $(".content5").attr('vis', 'show');
            }
        }

        self.showHideLinksFacet = function () {
            if ($(".content6").attr('vis') == 'show') {
                $(".content6").slideUp();
                $(".content6").animate({height: '-=160'});
                $(".content6").attr('vis', 'hide');
            } else {
                $(".content6").slideDown();
                $(".content6").animate({height: '+=160'});
                $(".content6").attr('vis', 'show');
            }
        }

        self.expandAllHandler = function () {
            $('#FS_colsDate').ojCollapsible("option", "expanded", true);
            $('#FS_colsCheckbox').ojCollapsible("option", "expanded", true);
            $('#FS_colsNumber').ojCollapsible("option", "expanded", true);
            $('#FS_colsRange').ojCollapsible("option", "expanded", true);
            $('#FS_colsLink').ojCollapsible("option", "expanded", true);
            /*$(".content6").slideDown();
            $(".content6").animate({height: '+=160'});
            $(".content6").attr('vis', 'hide');
            $(".content5").slideDown();
            $(".content5").animate({height: '+=50'});
            $(".content5").attr('vis', 'hide');
            $(".content4").slideDown();
            $(".content4").animate({height: '+=160'});
            $(".content4").attr('vis', 'hide');
            $(".content3").slideDown();
            $(".content3").animate({height: '+=160'});
            $(".content3").attr('vis', 'hide');
            $(".content2").slideDown();
            $(".content2").animate({height: '+=180'});
            $(".content2").attr('vis', 'hide');*/
        }

        self.collapseAllHandler = function () {
            $('#FS_colsDate').ojCollapsible("option", "expanded", false);
            $('#FS_colsCheckbox').ojCollapsible("option", "expanded", false);
            $('#FS_colsNumber').ojCollapsible("option", "expanded", false);
            $('#FS_colsRange').ojCollapsible("option", "expanded", false);
            $('#FS_colsLink').ojCollapsible("option", "expanded", false);
            /*$(".content6").slideUp();
            $(".content6").animate({height: '-=160'});
            $(".content6").attr('vis', 'hide');
            $(".content5").slideUp();
            $(".content5").animate({height: '-=50'});
            $(".content5").attr('vis', 'hide');
            $(".content4").slideUp();
            $(".content4").animate({height: '-=160'});
            $(".content4").attr('vis', 'hide');
            $(".content3").slideUp();
            $(".content3").animate({height: '-=160'});
            $(".content3").attr('vis', 'hide');
            $(".content2").slideUp();
            $(".content2").animate({height: '-=180'});
            $(".content2").attr('vis', 'hide');*/
        }

        /*
         * keyword search handler
         @param1 : context
         @param2: ui
         */
        self.keywordSearchEventHandler = function (context, ui) {
            var id = ui.value[0];
            var filterURL = self.restURL + "/" + id;

        }

        /*
         * Advance search handler
         * TODO // this part need relook regarding how saved searches will work
         * and how search is performed. As of now it just searches based on deal number
         */
        self.advanceSearchHandle = function (data, event) {


        }

        /*
         * Reset handler of advance filter panel
         * It will reset all the filter applied to the table
         */
        self.resetAdvanceSearchHandle = function (data, event) {

        }
        
        $(window).resize(function() {
            /*var small = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
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
            var resultSection = $('#FS_result');
            var fs_root = $('#FS_root');
            if (resultSection !== undefined && resultSection.offset() !== undefined) {
                if (self.isFilterHidden()) {
                    width = fs_root.width() + 'px';
                } else {
                    width = fs_root.width() - 360 + 'px';
                }
                resultSection.css('width', width);
            }*/
        });
        
        self.cardStyleClass = ko.computed(function() {
                if(self.currentMediaQuery() == 'XL'){
                    return (self.isFilterHidden() ? 'oj-flex-item oj-sm-12 oj-md-6 oj-lg-4 oj-xl-3' : 'oj-flex-item oj-sm-12 oj-md-12 oj-lg-6 oj-xl-4');
                }
                else if(self.currentMediaQuery() == 'LG'){
                    return (self.isFilterHidden() ? 'oj-flex-item oj-sm-12 oj-md-6 oj-lg-4 oj-xl-4' : 'oj-flex-item oj-sm-12 oj-md-12 oj-lg-6 oj-xl-6');
                }
                else if(self.currentMediaQuery() == 'MD'){
                    return (self.isFilterHidden() ? 'oj-flex-item oj-sm-12 oj-md-6 oj-lg-4 oj-xl-3' : 'oj-flex-item oj-sm-12 oj-md-12 oj-lg-6 oj-xl-4');
                }
                else if(self.currentMediaQuery() == 'SM'){
                    return (self.isFilterHidden() ? 'oj-flex-item oj-sm-12 oj-md-6 oj-lg-4 oj-xl-3' : 'oj-flex-item oj-sm-12 oj-md-12 oj-lg-6 oj-xl-4');
                }
                else{
                    return (self.isFilterHidden() ? 'oj-flex-item oj-sm-12 oj-md-6 oj-lg-4 oj-xl-3' : 'oj-flex-item oj-sm-12 oj-md-12 oj-lg-6 oj-xl-4');
                }
        });
        
        var filterFlag = 'n';
        self.toggleFilterHandler = function () {
            var mediaQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
            if (window.matchMedia(mediaQuery).matches){
                oj.OffcanvasUtils.toggle(this.innerDrawer);
                return;
            }
            var tableContainer = document.getElementById('FS_root');
            oj.Components.subtreeShown(tableContainer);
            if (filterFlag == 'n') {
                $('#filterPanel').animate({left: '0px'});
                $("#filterPanel").css("display", "flex");
                filterFlag = 'y';
                $("#filters").html("Hide Filters");
                self.isFilterHidden(false);
                //$("#FS_result").css("width", "100%");
            } else {
                filterFlag = 'n';
                self.isFilterHidden(true);
                $('#filterPanel').animate({left: '-340px'}, 1000);
                $("#filterPanel").css("display", "none");
                $("#filters").html("Show Filters");
                //$("#FS_result").css("width", "100%");
            }
            var resultSection = $('#FS_result');
            var fs_root = $('#FS_root');
            if (resultSection !== undefined && resultSection.offset() !== undefined) {
                if (self.isFilterHidden()) {
                    width = fs_root.width() + 'px';
                } else {
                    width = fs_root.width() - 360 + 'px';
                }
                resultSection.css('width', width);
            }
            var filterPanelChild = $('#filterPanelSection');
            var filterPanelParent = $('#filterPanelContent');
            if(filterPanelParent !== undefined && filterPanelChild !== undefined){
                var childHeight = filterPanelChild.height();
                filterPanelParent.height(childHeight+26);
            }
            return self.isFilterHidden();
        }
    }


    return facetedSearchModel;
});