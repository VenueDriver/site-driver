## Molecule Driver
# Molecule
Basic interface all Molecules must ensure.


### _id : `String`
`Optional: no`

`Default: ''`

Unique key used to identify each molecule record.


### _name : `String`
`Optional: no`

`Default: ''`

String attribute used to name a molecule.


### _type : `String`
`Optional: no`

`Default: ''`

This attribute defines how this record should be handled.


### _value : `Any`
`Optional: no`

`Default: null`

Every molecule must provide a value field, but it doesn't have a defined type. You can provided strings, numbers, other molecules or objects.


## Examples

```javascript
class TestMolecule implements Molecule {

  _name : string = '';
  _id   : string = '';
  _type : string = '';
  _value : any = null;

  constructor(data : any){
    for(let key in data){
      this[key] = data[key];
    }
  }

}
```
