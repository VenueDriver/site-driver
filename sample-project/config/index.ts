const config = Object.assign({},
  require('./settings'),
  require('./storage'),
  require('./formats')
);

export = config;
