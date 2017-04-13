define(['ojs/ojcore', 'text!./fnd-panel-form.html', './fnd-panel-form', 'text!./fnd-panel-form.json',
    'css!./fnd-panel-form', 'ojs/ojcomposite'
],
        function (oj, view, viewModel, metadata, css)
        {
            oj.Composite.register('fnd-panel-form', {
                view: {inline: view},
                viewModel: {inline: viewModel},
                metadata: {inline: JSON.parse(metadata)}
            });
        }

);
