interface StorageGet{
  (source: Query) : Promise<Array<Molecule>>;
}


interface StorageModule{
  get : function
}
