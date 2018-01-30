# Query

Query is the standard Class for interacting with the storage routes. Creating, updating, deleting and getting records is all made using this class. 

As the storage is pluggable we could find not just an SQL Database, NoSQL database, static file storage, API endpoint,etc. but we could find all of these at once. So Query allows to send a payload that every storage module must be able to handle.

If you are working with a custom storage module you can include additional attributes, but if you are not, these are the standard properties.

### name : `Array<String>`
`Optional: yes`

`Default: undefined`

Limits the matches of the query to elements which "_name" property matches any of the strings on the provided list.

### Type : `Array<String>`
`Optional: yes`

`Default: undefined`

Limits the matches of the query to elements which "_type" property matches any of the strings on the provided list.


 
