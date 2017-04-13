define(['ojs/ojcore', 'text!./fnd-custom-toolbar-button.html', './fnd-custom-toolbar-button',
 'text!./fnd-custom-toolbar-button.json', 'css!./fnd-custom-toolbar-button', 'ojs/ojcomposite'],
    function (oj, view, viewModel, metadata) {
        oj.Composite.register('fnd-custom-toolbar-button', {
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