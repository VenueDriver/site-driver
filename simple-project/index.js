"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mdServer = require("@molecule-driver/server");
mdServer.config('routes', 'config/routes');
mdServer.config('storage', 'config/storage');
mdServer.config('formats', 'config/formats');
mdServer.config('client', 'config/client');
mdServer.listen(3001);
//# sourceMappingURL=index.js.map