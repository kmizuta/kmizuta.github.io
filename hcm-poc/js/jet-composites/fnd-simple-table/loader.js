define(['ojs/ojcore', 'text!./fnd-simple-table.html', './fnd-simple-table',
 'text!./fnd-simple-table.json', 'css!./fnd-simple-table.css', 'ojs/ojcomposite'],
 function(oj, view, viewModel, metadata, css)
 {
   oj.Composite.register('fnd-simple-table', {
      view: {inline: view},
      viewModel: {inline: viewModel},
      metadata: {inline: JSON.parse(metadata)},
      css: {inline: css}
    });
 }
);
