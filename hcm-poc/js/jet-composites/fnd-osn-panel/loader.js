define(['ojs/ojcore', 'text!./fnd-osn-panel.html', './fnd-osn-panel',
 'text!./fnd-osn-panel.json', 'css!./fnd-osn-panel', 'ojs/ojcomposite'],
 function(oj, view, viewModel, metadata, css)
 {
   oj.Composite.register('fnd-osn-panel', {
      view: {inline: view},
      viewModel: {inline: viewModel},
      metadata: {inline: JSON.parse(metadata)}
    });
 }

);
