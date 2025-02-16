/* let i = 5;
let countdown = [];
while (i >= 1) {
  countdown.push(i);
  i--;
}
 */

/* let teaCollection = [];
let result;
do {
  result = prompt("Enter tea name [type 'stop' to finish]: ");
  console.log(result);
  if (result != "stop") teaCollection.push(result);
} while (result != "stop");

 */

/* let total = 0;
let i = 1;
do {
  total += i;
  i++;
} while (i <= 3);

console.log(total);
 */

/* let multipliedNumbers = [];
let arr = [2, 4, 6];
for (i = 0; i < arr.length; i++) {
  let result = arr[i] * 2;
  multipliedNumbers.push(result);
}
console.log(multipliedNumbers);
 */

/* let selectedTeas = [];
let array = ["green_tea", "black_tea", "chai", "oolong_tea"];
for (let i = 0; i < array.length; i++) {
  if (array[i] == "chai") break;
  selectedTeas.push(array[i]);
}
console.log(selectedTeas);
 */

/* let array = ["London", "New York", "Paris", "Berlin"];
let visitedCities = [];
for (let i = 0; i < array.length; i++) {
  if (array[i] == "Paris") continue;
  visitedCities.push(array[i]);
}

visitedCities;
 */

/* let smallNumbers = [];
let numbers = [1, 2, 3, 4, 5];
for (const number of numbers) {
  if (number == 4) break;
  smallNumbers.push(number);
}

smallNumbers; */

/* let citiesPopulation = {
  London: 8900000,
  "New York": 8400000,
  Paris: 2200000,
  Berlin: 3500000,
};
let cityPopulations = {};

for (const city in citiesPopulation) {
  if (city == "berlin" || city == "Berlin") break;
  cityPopulations[city] = citiesPopulation[city];
}

cityPopulations;
 */
/* 
let allTeas = ["earl grey", "green tea", "chai", "oolong tea"];
let availableTeas = [];
allTeas.forEach((tea) => {
  if (tea === "chai") return;
  availableTeas.push(tea);
});
availableTeas;
 */

/* let arr = ["chai", "green tea", "black tea", "jasmine tea", "herbal tea"];
let shortTeas = [];
for (const tea of arr) {
  if (tea.length > 10) break;
  shortTeas.push(tea);
}

shortTeas;
 */
