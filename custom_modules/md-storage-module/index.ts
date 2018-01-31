import { StorageModule } from './interface';

class TestStorage implements StorageModule {

  private query : Query;

  constructor(query){
    this.query = query;
  }

  get() : Promise<Molecule[]>{
    return new Promise((resolve,reject)=>{
      resolve("OK");
    });
  }

  post() : Promise<string>{
    return new Promise((resolve,reject)=>{
      resolve("OK");
    });
  }

  remove() : Promise<string>{
    return new Promise((resolve,reject)=>{
      resolve("OK");
    });
  }

}

module.exports = TestStorage;
