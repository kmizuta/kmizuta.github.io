define(['ojs/ojcore', 'text!./fnd-springboard.html', './fnd-springboard',
 'text!./fnd-springboard.json', 'css!./fnd-springboard', 'ojs/ojcomposite'],
 function(oj, view, viewModel, metadata, css)
 {
   oj.Composite.register('fnd-springboard', {
      view: {inline: view},
      viewModel: {inline: viewModel},
      metadata: {inline: JSON.parse(metadata)}
    });
 }

);
