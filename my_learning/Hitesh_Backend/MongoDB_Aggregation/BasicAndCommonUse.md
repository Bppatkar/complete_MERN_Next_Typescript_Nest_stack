# MongoDB Aggregation Pipeline Basics

This document provides a basic overview of the most frequently used stages and operators in the MongoDB aggregation pipeline, along with simple definitions and examples.

## Most Frequently Used Pipeline Stages

Pipeline stages are the fundamental building blocks of an aggregation pipeline. Each stage transforms the documents as they pass through the pipeline.

### `$match`

**Definition:** Filters the documents to include only those that match the specified query. It's like the `WHERE` clause in SQL. This stage is often used early in the pipeline to reduce the number of documents being processed.

**Simple Example:** Finding all users with the status "active".

```javascript
{ $match: { status: "active" } }
```

### `$group`

**Definition:** Groups documents based on a specified key and performs aggregate calculations (like sum, average, count) for each group. It's similar to the `GROUP BY` clause in SQL combined with aggregate functions.

**Simple Example:** Calculating the total number of products in each category.

```javascript
{ $group: { _id: "$category", totalProducts: { $sum: 1 } } }
```

### `$project`

**Definition:** Reshapes the documents by including, excluding, or renaming fields. You can also create new computed fields. It's similar to selecting specific columns and using aliases in SQL.

**Simple Example:** Selecting only the name and email fields and excluding the `_id` field.

```javascript
{ $project: { _id: 0, name: 1, email: 1 } }
```

### `$sort`

**Definition:** Reorders the documents in the pipeline based on one or more fields. It's the equivalent of the `ORDER BY` clause in SQL.

**Simple Example:** Sorting products by price in ascending order.

```javascript
{ $sort: { price: 1 } }
```

### `$limit`

**Definition:** Limits the number of documents that pass to the next stage. Useful for pagination or getting the top N results. Similar to the `LIMIT` clause in SQL.

**Simple Example:** Getting only the first 5 documents after sorting.

```javascript
{ $limit: 5 }
```

### `$unwind`

**Definition:** Deconstructs an array field from the input documents to output a separate document for each element in the array. This is useful when you need to process each item in an array individually.

**Simple Example:** If a document has a `tags` array, this stage will create a new document for each tag.

```javascript
{ $unwind: "$tags" }
```

## Most Frequently Used Operators

Operators are used within pipeline stages to perform specific actions on the fields. They are commonly used in stages like `$project`, `$group`, and `$addFields`.

### Arithmetic Operators

Used for performing mathematical calculations.

- **$add:** Adds numbers.

  ```javascript
  { $project: { total: { $add: ["$price", "$shipping"] } } }
  ```

- **$subtract:** Subtracts one number from another.

  ```javascript
  { $project: { profit: { $subtract: ["$revenue", "$cost"] } } }
  ```

- **$multiply:** Multiplies numbers.

  ```javascript
  { $project: { discountedPrice: { $multiply: ["$price", 0.9] } } }
  ```

- **$divide:** Divides one number by another.

  ```javascript
  { $project: { unitPrice: { $divide: ["$totalPrice", "$quantity"] } } }
  ```

- **$avg:** Calculates the average of values. (Commonly used in `$group`)

  ```javascript
  { $group: { _id: "$category", averagePrice: { $avg: "$price" } } }
  ```

- **$sum:** Calculates the sum of values. (Commonly used in `$group`)

  ```javascript
  { $group: { _id: "$userId", totalOrders: { $sum: 1 } } }
  ```

### Comparison Operators

Used for evaluating conditions.

- **$eq:** Matches values that are equal to a specified value.

  ```javascript
  { $match: { status: { $eq: "pending" } } }
  ```

- **$ne:** Matches values that are not equal to a specified value.

  ```javascript
  { $match: { quantity: { $ne: 0 } } }
  ```

- **$gt:** Matches values that are greater than a specified value.

  ```javascript
  { $match: { price: { $gt: 100 } } }
  ```

- **$gte:** Matches values that are greater than or equal to a specified value.

  ```javascript
  { $match: { age: { $gte: 18 } } }
  ```

- **$lt:** Matches values that are less than a specified value.

  ```javascript
  { $match: { discount: { $lt: 0.1 } } }
  ```

- **$lte:** Matches values that are less than or equal to a specified value.

  ```javascript
  { $match: { rating: { $lte: 5 } } }
  ```

### Array Operators

Used for manipulating array fields.

- **$size:** Returns the number of elements in an array.

  ```javascript
  { $project: { numberOfTags: { $size: "$tags" } } }
  ```

- **$slice:** Returns a subset of an array.

  ```javascript
  { $project: { firstTwoTags: { $slice: ["$tags", 2] } } }
  ```

- **$in:** Checks if a specified value is in an array.

  ```javascript
  { $match: { interests: { $in: ["reading"] } } }
  ```

- **$push:** Adds a value to an array. (Commonly used in `$group` to accumulate into an array)

  ```javascript
  { $group: { _id: "$userId", allProducts: { $push: "$productName" } } }
  ```

- **$addToSet:** Adds a value to an array only if it's not already present, ensuring uniqueness. (Commonly used in `$group`)

  ```javascript
  { $group: { _id: "$categoryId", uniqueTags: { $addToSet: "$tags" } } }
  ```

### String Operators

Used for string manipulation.

- **$concat:** Concatenates strings.

  ```javascript
  { $project: { fullName: { $concat: ["$firstName", " ", "$lastName"] } } }
  ```

- **$substr:** Returns a substring of a string.

  ```javascript
  { $project: { firstThreeChars: { $substr: ["$name", 0, 3] } } }
  ```

- **$toLower:** Converts a string to lowercase.

  ```javascript
  { $project: { lowerCaseName: { $toLower: "$name" } } }
  ```

- **$toUpper:** Converts a string to uppercase.

  ```javascript
  { $project: { upperCaseName: { $toUpper: "$name" } } }
  ```

### Date Operators

Used for working with date fields.

- **$year:** Extracts the year from a date.

  ```javascript
  { $project: { orderYear: { $year: "$orderDate" } } }
  ```

- **$month:** Extracts the month from a date (1 for January, 12 for December).

  ```javascript
  { $project: { orderMonth: { $month: "$orderDate" } } }
  ```

- **$dayOfMonth:** Extracts the day of the month from a date (1-31).

  ```javascript
  { $project: { orderDay: { $dayOfMonth: "$orderDate" } } }
  ```

- **$dateToString:** Converts a date to a string with a specified format.

  ```javascript
  { $project: { formattedDate: { $dateToString: { format: "%Y-%m-%d", date: "$orderDate" } } } }
  ```

### Logical Operators

Used for combining conditions.

- **$and:** Evaluates one or more expressions and returns true only if all the expressions are true.

  ```javascript
  { $match: { $and: [{ price: { $gt: 50 } }, { category: "electronics" }] } }
  ```

- **$or:** Evaluates one or more expressions and returns true if any of the expressions are true.

  ```javascript
  { $match: { $or: [{ status: "pending" }, { status: "processing" }] } }
  ```

- **$not:** Evaluates an expression and returns the opposite boolean value.

  ```javascript
  { $match: { isActive: { $not: { $eq: true } } } }
  ```

### Accumulator Operators (for `$group` stage)

These operators are specifically used within the `$group` stage to perform calculations on grouped data.

- **$sum:** Returns the sum of numerical values.
- **$avg:** Returns the average of numerical values.
- **$min:** Returns the minimum value.
- **$max:** Returns the maximum value.
- **$first:** Returns the first value in each group.
- **$last:** Returns the last value in each group.
- **$push:** Returns an array of accumulated values in each group.
- **$addToSet:** Returns an array of unique accumulated values in each group.
- **$count:** Returns the number of documents in each group.

This document provides a foundational understanding of the most frequently used stages and operators in the MongoDB aggregation pipeline. For more advanced operations and stages, refer to the official MongoDB documentation.
