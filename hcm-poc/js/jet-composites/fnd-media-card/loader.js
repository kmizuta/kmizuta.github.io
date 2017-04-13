define(['ojs/ojcore', 'text!./fnd-media-card.html', './fnd-media-card',
 'text!./fnd-media-card.json', 'css!./fnd-media-card.css', 'ojs/ojcomposite'],
 function(oj, view, viewModel, metadata, css)
 {
   oj.Composite.register('fnd-media-card', {
      view: {inline: view},
      viewModel: {inline: viewModel},
      metadata: {inline: JSON.parse(metadata)},
      css: {inline: css}
    });
 }
);