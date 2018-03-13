import Plugin = require('@molecule-driver/plugin');

const cellBuilder = new Plugin({
  ngModule : 'src/app/cell-builder/module#CellBuilderModule',
  route : '/cell-builder'
});

export = cellBuilder.export();
