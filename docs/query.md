# Query

Query is the standard Class for interacting with the storage routes. Creating, updating, deleting and getting records is all made using this class. 

As the storage is pluggable we could find not just an SQL Database, NoSQL database, static file storage, API endpoint,etc. but we could find all of these at once. So Query allows to send a payload that every storage module must be able to handle.

If you are working with a custom storage module you can include additional attributes, but if you are not, these are the standard properties.

### Example 1: get all "Posts" from the "Pets Blog"
```javascript
let query = {
  name : ['Post'],
  format : 'original',
  where : {
  	_generator : {
  		_name : "Blog",
  		_options : {
  			_title : "Pets Blog"
  		}
  	}
  }
};
```

### Example 2: create or update a molecule record
```javascript
let query = {
  type : molecule.type,
  name : molecule._name,
  id   : molecule._id,
  data : molecule
};
```

### Example 3: remove a single molecule record
```javascript
let query = {
  data : molecule
};
```

### Example 4: remove all "Posts" from the "Pets Blog"
```javascript
let query = {
  name : ['Post'],
  format : 'original',
  where : {
  	_generator : {
  		_name : "Blog",
  		_options : {
  			_title : "Pets Blog"
  		}
  	}
  }
};
```

## Options

### data : `Object`
`Optional: yes`

`Default: undefined`

Only used for creating and updating molecule records.


### format : `String`
`Optional: no`

`Default: 'original'`

Limits the query results to the specified record format.


### id : `String`
`Optional: yes`

`Default: undefined`

Limits the query result to an element with a matching id.


### name : `Array<String>`
`Optional: yes`

`Default: undefined`

Limits the matches of the query to elements which "_name" property matches any of the strings on the provided list.

### type : `Array<String>`
`Optional: yes`

`Default: undefined`

Limits the matches of the query to elements which "_type" property matches any of the strings on the provided list.


### where : `Object`
`Optional: yes`

`Default: undefined`

An object including `Number` or `String` properties to be matched. It can also be used to performe deep searches of properties providing an `Object` value.

 
