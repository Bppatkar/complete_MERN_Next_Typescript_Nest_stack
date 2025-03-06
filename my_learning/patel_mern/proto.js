<<<<<<< HEAD
// function Emitter() {
//   this.event = {};
// }

// Emitter.prototype.on = function (fname, cb) {
//   this.event[fname] = this.event[fname] || [];
//   this.event[fname].push(cb);
// };

// Emitter.prototype.emit = function (fname) {
//   if (this.event[fname]) this.event[fname].forEach((e) => e());
// };

// module.exports = Emitter;
=======
function Emitter() {
  this.event = {};
}

Emitter.prototype.on = function (fname, cb) {
  this.event[fname] = this.event[fname] || [];
  this.event[fname].push(cb);
};

Emitter.prototype.emit = function (fname) {
  if (this.event[fname]) this.event[fname].forEach((e) => e());
};

module.exports = Emitter;
>>>>>>> c64d8e95621f6198d72bdfd7f762d247fa37ccb9
