define(['ojs/ojcore', 'text!./fnd-card-list-layout.html', './fnd-card-list-layout',
 'text!./fnd-card-list-layout.json', 'css!./fnd-card-list-layout.css', 'ojs/ojcomposite'],
 function(oj, view, viewModel, metadata, css)
 {
   oj.Composite.register('fnd-card-list-layout', {
      view: {inline: view},
      viewModel: {inline: viewModel},
      metadata: {inline: JSON.parse(metadata)},
      css: {inline: css}
    });
 }
);