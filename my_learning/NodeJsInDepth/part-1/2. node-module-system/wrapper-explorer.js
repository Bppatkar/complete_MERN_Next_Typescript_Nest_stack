console.log("Node Module wrapper demo");

console.log("filename in wrapper explorer", __filename);
console.log("dirname in wrapper explorer", __dirname);

module.exports.greet = function(name) {
  console.log(`hello ${name}`);
};