In mongodb database i have create one database called aggregate where there are 3 collections, users, athors and books

1. in users collection there are 3 documents
2. in authors collection there are 3 documents
3. in books collection there are more than 20 documents

// Here are some question which we perfrom aggregation in mongodb

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
    $count: "activeUsers", // here we call it whatever we want to call
  },
]);
```

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

```json {
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

```json {
"_id": "male",
"averageAgeCalculatorByMe": 29.851926977687626
}
 {
"_id": "female",
"averageAgeCalculatorByMe": 29.81854043392505
}
```

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

```json {
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

```
