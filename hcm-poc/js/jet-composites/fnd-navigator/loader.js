define(['ojs/ojcore', 'text!./fnd-navigator.html', './fnd-navigator',
 'text!./fnd-navigator.json', 'css!./fnd-navigator', 'ojs/ojcomposite'],
 function(oj, view, viewModel, metadata, css)
 {
   oj.Composite.register('fnd-navigator', {
      view: {inline: view},
      viewModel: {inline: viewModel},
      metadata: {inline: JSON.parse(metadata)}
    });
 }

);
