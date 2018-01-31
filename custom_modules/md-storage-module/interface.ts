export interface StorageModule{
  get() : Promise<any | Molecule[]>,
  post() : Promise<any>,
  remove() : Promise<any>
}
