# Storage

Molecule records are stored through [StorageRoutes](/storage-routes) (by default located in `/config/storage.js`). You can configure where files will be stored based on the given parameters.

One simple and common example is using a NoSQL database for storing the 'original' JSON format of molecules as it is faster and use other type of storage for the 'readable' format which is smaller and meant to be used on the implementation.


By default all routes use the [LocalStorage](/local-storage-module). This for granting a quick start without having to install database or other [StorageModules](/storage-module).

```javascript
const LocalStorage = require('../custom_modules/local-storage');
const rootStorageFolder = "_storage";

class StorageRoutes{

  constructor(query){
    this.query = query;
    let storageOptions = { root: rootStorageFolder , query : this.query };
    this.localStorage = new LocalStorage(storageOptions);
  }

  save(){
    return this.localStorage.post();
  }

  remove(){
    return this.localStorage.remove();
  }

  get(){
    return this.localStorage.get();
  }

}

module.exports = StorageRoutes;

```