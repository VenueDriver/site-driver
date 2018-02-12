import mdServer = require('@molecule-driver/server');

mdServer.config('routes','config/routes');
mdServer.config('storage','config/storage');
mdServer.config('formats','config/formats');
mdServer.config('client','config/client');

mdServer.listen(3001);
