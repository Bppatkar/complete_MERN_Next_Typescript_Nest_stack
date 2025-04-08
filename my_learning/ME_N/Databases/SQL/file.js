//! SQl
//? SQL is a structured query language used to interact with databases.
//* it is a language to interact with database and perform operations on it

// if it is structured then in which form data will stored
//? (1) Relational Model - Organize data into tables with rows and columns
//? (2) Fixed Schema - Require a predefined schema; the structure of the data must be known in advance.

//! properties 
//? 1) Vertical Scalability - Typically scaled by increasing the resources of a single server. (scaling up) [horizontal in NOSQL]
//? 2) Relationships - Tables can have multiple types of relationships.


//* Relational Model Use of SQL: Utilize SQL for querying and managing data, which is a standardized and widely-used language.

//? ACID Compliance: Support transactions that are Atomic, Consistent, Isolated, and Durable.

// Complex Queries: Excel at handling complex queries and relationships between data.

//! When to Use SQL Databases
//*  When data integrity and relationships are critical (e.g., banking systems).
//* When the schema is stable and predefined.

//! When Not to Use SQL
//* For unstructured or rapidly changing data (use NoSQL instead).
//* When horizontal scaling is a priority (e.g., big data applications).

//! NOSQL [Not Only SQl] (means other than sql)

//* Flexible Schema: Allow for dynamic schemas, accommodating unstructured or semi-structured data without predefined structures.

//? Duplicacy over Relations: Duplicates data across records (denormalization) to enhance performance and scalability, rather than relying on complex relationships and joins as in relational databases.

//* Horizontal Scalability: Designed to scale out by adding more servers, handling large volumes of data efficiently.

//? Performance: Optimized for high throughput and low latency, suitable for real-time applications.

//! skipping SQL database  only learning about MONGODB

