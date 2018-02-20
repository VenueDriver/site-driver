## Molecule Driver
# Text Molecule
Molecule Driver's client assets middleware.

### Implemented as any other middleware.
```javascript
import express = require('express');
import MD      = require('@molecule-driver/core');

express.use(MD.assets());
```

### matchRootRoute : `String`
`Optional: no`

`Default: 'molecule-assets'`

This route will search for molecule module assets inside node_modules.
e.g. the route '/molecule-assets/text-molecule/styles.css' would return the file located in 'your_project/node_modules/@molecule-driver/text-molecule/styles.css'.
