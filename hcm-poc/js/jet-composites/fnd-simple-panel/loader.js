define(['ojs/ojcore', 'text!./fnd-simple-panel.html', './fnd-simple-panel',
    'text!./fnd-simple-panel.json', 'css!./fnd-simple-panel', 'ojs/ojcomposite',
    '../fnd-custom-toolbar-button/loader'],
        function (oj, view, viewModel, metadata, css) {
            oj.Composite.register('fnd-simple-panel', {
                view: {
                    inline: view
                },
                viewModel: {
                    inline: viewModel
                },
                metadata: {
                    inline: JSON.parse(metadata)
                }
            });
        }

);