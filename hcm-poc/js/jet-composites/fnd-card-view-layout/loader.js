define(['ojs/ojcore', 'text!./fnd-card-view-layout.html', './fnd-card-view-layout',
 'text!./fnd-card-view-layout.json', 'css!./fnd-card-view-layout.css', 'ojs/ojcomposite'],
 function(oj, view, viewModel, metadata, css)
 {
   oj.Composite.register('fnd-card-view-layout', {
      view: {inline: view},
      viewModel: {inline: viewModel},
      metadata: {inline: JSON.parse(metadata)},
      css: {inline: css}
    });
 }
);