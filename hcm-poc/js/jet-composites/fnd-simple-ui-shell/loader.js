define(['ojs/ojcore', 'text!./fnd-simple-ui-shell.html', './fnd-simple-ui-shell',
    'text!./fnd-simple-ui-shell.json', 'css!./fnd-simple-ui-shell', 'ojs/ojcomposite'],
        function (oj, view, viewModel, metadata, css) {
            oj.Composite.register('fnd-simple-ui-shell', {
                view: {inline: view},
                viewModel: {inline: viewModel},
                metadata: {inline: JSON.parse(metadata)}
            });
        }

);