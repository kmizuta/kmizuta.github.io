define(['ojs/ojcore', 'text!./fnd-fuse-overview.html', './fnd-fuse-overview',
 'text!./fnd-fuse-overview.json', 'css!./fnd-fuse-overview', 'ojs/ojcomposite'],
 function(oj, view, viewModel, metadata, css)
 {
   oj.Composite.register('fnd-fuse-overview', {
      view: {inline: view},
      viewModel: {inline: viewModel},
      metadata: {inline: JSON.parse(metadata)}
    });
 }

);