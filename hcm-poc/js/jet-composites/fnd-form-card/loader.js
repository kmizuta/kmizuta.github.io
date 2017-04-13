define(['ojs/ojcore', 'text!./fnd-form-card.html', './fnd-form-card',
 'text!./fnd-form-card.json', 'css!./fnd-form-card.css', 'ojs/ojcomposite'],
 function(oj, view, viewModel, metadata, css)
 {
   oj.Composite.register('fnd-form-card', {
      view: {inline: view},
      viewModel: {inline: viewModel},
      metadata: {inline: JSON.parse(metadata)},
      css: {inline: css}
    });
 }
);