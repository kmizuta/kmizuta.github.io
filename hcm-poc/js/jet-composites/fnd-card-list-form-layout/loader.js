define(['ojs/ojcore', 'text!./fnd-card-list-form-layout.html', './fnd-card-list-form-layout',
 'text!./fnd-card-list-form-layout.json', 'css!./fnd-card-list-form-layout.css', 'ojs/ojcomposite'],
 function(oj, view, viewModel, metadata, css)
 {
   oj.Composite.register('fnd-card-list-form-layout', {
      view: {inline: view},
      viewModel: {inline: viewModel},
      metadata: {inline: JSON.parse(metadata)},
      css: {inline: css}
    });
 }
);