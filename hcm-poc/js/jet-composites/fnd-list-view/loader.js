define(['ojs/ojcore', 'text!./fnd-list-view.html', './fnd-list-view',
 'text!./fnd-list-view.json', 'css!./fnd-list-view.css', 'ojs/ojcomposite'],
 function(oj, view, viewModel, metadata, css)
 {
   oj.Composite.register('fnd-list-view', {
      view: {inline: view},
      viewModel: {inline: viewModel},
      metadata: {inline: JSON.parse(metadata)},
      css: {inline: css}
    });
 }
);