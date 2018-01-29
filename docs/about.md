# What is this?

Molecule Driver provides a standarized decoupled way of quickly creating and adapting data structures.The data is independent from its final implementation. This means that you can connect this data to any (and as many) internal or external component as you need, like an API, a website view, databases, static file storage, applications, services or any other system.
You can abstractly desing data structures that you can later on modify, extend, connect and implement thanks to a standarized set of rules and contracts that every part of the pipeline must ensure.


# Who is this for?

- Any application that often needs quick adaptation of their data. A good example of this is a multi-site CMS. If need to create a duplicated website with just some minor adjustments, you can fork a data structure without duplicating it and being able to tweak only the parts that you need to. If you later on need to update something in all the forked sites you can do it from the source.
- If you need inheritance or reuse data structures. You can define a structure for a "Product" with all the basic attributes like 'name','price',etc. And instead of adding extra attributes like "color" for clothes and "energy consumption" for electronics you could fork the original "Product" and create a new structure with those extra fields. This will keep all the basic information from a "Product" without having to ,for example, duplicate a "Products" database table or adding unwanted attributes to "Product".
- If you haven't decided yet your implementation but you need data to work with. You can start creating structures and populating instances that you could work with through a database, API, static files,etc. Then you can finally plugin your final choice of implementation to Molecule Driver or completely remove Molecule Driver and replace it with another tool.