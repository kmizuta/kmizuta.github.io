define(['knockout', 'ojs/ojcore', 'jquery',
    'jet-composites/fnd-fuse-overview/loader', 'jet-composites/fnd-navigator/loader',
    , 'ojs/ojselectcombobox'],
        function (ko, oj, $) {
            function fndSimpleUiShellModel(context) {
                var self = this;
                var propsPromise = context.props;
                self.isMobile = ko.observable(false);

                self.launchNavigator = function () {
                    var params = {
                        'bubbles': false
                    };
                    document.getElementsByTagName('fnd-navigator')[0].dispatchEvent(new CustomEvent('FND_Launch_Navigator', params));
                };

            }
            return fndSimpleUiShellModel;
        });