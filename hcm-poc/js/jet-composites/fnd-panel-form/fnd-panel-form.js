define(['knockout', 'ojs/ojcore', 'ojs/ojknockout', 'ojs/ojdatetimepicker',
    'ojs/ojinputtext', 'ojs/ojradioset', 'ojs/ojselectcombobox',
    'ojs/ojdialog',
    'ojs/ojtimezonedata', 'ojs/ojcheckboxset', 'ojs/ojinputnumber'],
        function (ko) {
            function formCCAViewModel(context) {
                var self = this;
                self.values = {};
                self.fields = ko.observableArray([]);
                self.propsPromise = context.props;
                self.propsPromise.then(function (props) {
                    if( null !==props.dataUrl){
                    $.getJSON(props.dataUrl, function (fieldData) {
                        if (null !== props.describeDataUrl) {
                            $.getJSON(props.describeDataUrl, function (describeData) {
                                _parseData(fieldData, describeData);
                            });
                        }
                    });
                    }
                });
                function _parseData(fieldData, describeData) {
                    for (name in fieldData) {
                        var value = ko.observable(fieldData[name]);
                        var list = [];
                        var component = 'ojInputText';
                        var text = null;
                        var labelRendered = true;
                        var selectedValue = null;
                        var details = null;
                        if (describeData[name] == 'Date') {
                            component = 'ojInputDate';
                        } else if (describeData[name] == 'number'){
                            component = 'ojInputNumber';
                        }else if (null != describeData[name] && describeData[name].hasOwnProperty('lov')) {
                            var listItem = [];
                            for (item in describeData[name].lov) {
                                listItem.push({
                                    'val': item,
                                    'label': describeData[name].lov[item]
                                });
                                list.push(listItem);
                            }
                            component = 'ojSelect'
                        }else if (null != describeData[name] && describeData[name].hasOwnProperty('combobox')) {
                            var listItem = [];
                            for (item in describeData[name].combobox) {
                                listItem.push({
                                    'val': item,
                                    'label': describeData[name].combobox[item]
                                });
                                list.push(listItem);
                            }
                            component = 'ojCombobox'
                        }
                        else if (null != describeData[name] && describeData[name].hasOwnProperty('checkbox')) {
                                    text = describeData[name].checkbox.text;
                                    labelRendered = (describeData[name].checkbox.label == 'FND_NO_LABEL') ? false : true;
                                    selectedValue = describeData[name].checkbox.value;
                                    component = 'ojCheckboxset';
                        }

                        if (null != describeData[name] && describeData[name].hasOwnProperty('details')) {
                            details = describeData[name].details;
                        }

                        var info = null;
                        if (null != describeData[name] && describeData[name].hasOwnProperty('info')) {
                            info = describeData[name].info;
                        }


                        if (describeData[name] != null) {
                            self.fields.push({
                                'name': name,
                                'label': camelToRegular(name),
                                'component': component,
                                'list': list,
                                'value': value,
                                'required': false,
                                'text': text,
                                'labelRendered': labelRendered,
                                'selectedValue': selectedValue,
                                'details': details,
                                'info': info
                            });
                        }


                    }
                    self.values = self.fields().reduce(function (values, field) {
                        values[field.name] = field.value;
                        return values;
                    }, {});
                    // default list of values
                    self.resetValues = [];
                    for (name in self.values) {
                        self.resetValues[name] = self.values[name]();
                    }
                }

                function camelToRegular(str) {
                    return str
                            // insert a space before all caps or numbers
                            .replace(/([A-Z0-9])/g, ' $1')
                            // uppercase the first character
                            .replace(/^./, function (str) {
                                return str.toUpperCase();
                            })
                            .trim();
                }
                /*
                 * Card title handler
                 */
                self.cardTitleHandler = function (paramTitle) {
                    // TODO: fix title handler to implement new code for drill down
                    var params = {
                        'bubbles': true,
                        'detail': {'keyAttribute': paramTitle}
                    };
                    element.dispatchEvent(new CustomEvent('cardTitleClicked', params));
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


                self.showContextpop = function (name) {
                    // console.log(name);
                    $('.ocaj-triangle > #' + name).show();
                };

                self.hideContextpop = function () {
                    $('.ocaj-func-contextpop-orange-20').hide();
                };

                cancelChanges = function () {
                    for (name in self.values) {
                        self.values[name](self.resetValues[name]);
                    }
                };
                saveChanges = function () {
                    for (name in self.values) {
                        self.resetValues[name] = self.values[name]();
                    }
                };
                getValues = function () {
                    var values = {};
                    for (name in self.values) {
                        values[name] = self.values[name]();
                    }
                    return values;
                };
            }

            return formCCAViewModel;
        });
