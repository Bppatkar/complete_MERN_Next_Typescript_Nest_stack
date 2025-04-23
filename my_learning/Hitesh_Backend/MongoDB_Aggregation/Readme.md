In mongodb database i have create one database called aggregate where there are 3 collections, users, athors and books

1. in users collection there are 3 documents
2. in authors collection there are 3 documents
3. in books collection there are more than 20 documents

# Here are some question which we perfrom aggregation in mongodb

NOTE": - Without grouping you cannot perform any operation to all the database users or all the database documents.

---

# Questions

## 1) How many users are active.?

### Ans: -

```js
db.users.aggregate([
  {
    $match: {
      isActive: true,
    },
  },
  {
    $count: "activeUsers", // here we call it whatever we want to call we call activeUser here
  },
]);
```

![image](https://github.com/user-attachments/assets/588058ce-1819-4fc2-bb3a-7c5576ed3d15)

## 2) What is the average age of all users?

### Ans: -

```js
db.users.aggregate([
  {
    $group: {        // i want to group those people based on age or gender whatever u want
      _id: "null",    // look , we can provide any field here with $ sign or if we want to group them by nothing then we can provide _id: null
      averageAgeCalculatorByMe: {
        $avg: "$age",
      },
    }
  }
  },
]);
```

```json
{
  "_id": null,
  "averageAgeCalculatorByMe": 29.835
}
```

```js
[
  {
    $group: {
      _id: "$gender",
      averageAgeCalculatorByMe: {
        $avg: "$age",
      },
    },
  },
];
```

```json
{
"_id": "male",
"averageAgeCalculatorByMe": 29.851926977687626
}
 {
"_id": "female",
"averageAgeCalculatorByMe": 29.81854043392505
}
```

![image](https://github.com/user-attachments/assets/4ba80fd7-ac10-4674-9b43-d54266b96cd8)

## 3) List the top 5 most common favorite fruits among the users..?

### Ans: -

for finding the favorite fruits i need to group them based on how many unique values of this particular field can be [favoriteFruit]

```js
[
  {
    $group: {
      _id: "$favoriteFruit",
    },
  },
];
```

```json
{
"_id": "banana"
}
{
"_id": "apple"
}
{
"_id": "strawberry"
}
```

I have grouped them together, and now I want to count.

```js
[
  {
    $group: {
      _id: "$favoriteFruit",
      countingByMe: {
        $sum: 1,
      },
    },
  },
];
```

we can actually use a $sum, and with this sum, we can provide a 1 here. This 1 simply says that the moment you found any user in the banana category, let's say just add 1 value. [or simply increase by 1]

```json
{
  "_id": "banana",
  "countingByMe": 339
}
{
  "_id": "strawberry",
  "countingByMe": 323
}
{
  "_id": "apple",
  "countingByMe": 338
}
```

Now i have to use a Sorting because our question is to find the top 5, so we make another stage

By the way, you can do sort just like this. $sort......
But , You have to provide based on what field you want to do, sort , and here is another thing.

This countingByMe field is not available in my original database. But since I am into the aggregation staging of pipeline now for this particular field or this particular pipeline, the countingByMe field does exist.

```js
[
  {
    $group: {
      _id: "$favoriteFruit",
      countingByMe: {
        $sum: 1,
      },
    },
  },
  {
    $sort: {
      countingByMe: -1,
    },
  },
];
```

```json
{
  "_id": "banana",
  "countingByMe": 339
}
{
  "_id": "strawberry",
  "countingByMe": 323
}
{
  "_id": "apple",
  "countingByMe": 338
}
```

what if i do countingByMe 1 not -1 [Negative one means highest value on the top.]
just changed the order

```json
{
  "_id": "strawberry",
  "countingByMe": 323
}
{
  "_id": "apple",
  "countingByMe": 338
}
{
  "_id": "banana",
  "countingByMe": 339
}

```

I want to find out top five, top three, top one.
So I can provide one more pipeline here
**\*\*** $limit **\*\*\***

```js
[
  {
    $group: {
      _id: "$favoriteFruit",
      countingByMe: {
        $sum: 1,
      },
    },
  },
  {
    $sort: {
      countingByMe: 1,
    },
  },
  {
    $limit: 2, // I only want to send you the two values of the top value.
  },
];
```

```json
{
  "_id": "strawberry",
  "countingByMe": 323
}
{
  "_id": "apple",
  "countingByMe": 338
}
{
  "_id": "banana",
  "countingByMe": 339
}

```

![image](https://github.com/user-attachments/assets/9e86162d-7956-405c-861c-8a77d15dbbff)
