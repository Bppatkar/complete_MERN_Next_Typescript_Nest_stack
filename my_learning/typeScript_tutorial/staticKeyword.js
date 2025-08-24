// why static keyword?
//? Classes may have static members. These members aren’t associated with a particular instance of the class. They can be accessed through the class constructor object itself:
//? use to define static property and methods
//? memory efficiency
//? utility methods
//? global constants
// advantage of static keyword?
// how to use static property
// how to use static functions
// examples
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var MyClass = /** @class */ (function () {
    function MyClass() {
    }
    MyClass.printX = function () {
        console.log(MyClass.x);
    };
    MyClass.x = 0;
    return MyClass;
}());
console.log(MyClass.x);
MyClass.printX();
var Base = /** @class */ (function () {
    function Base() {
    }
    Base.getGreeting = function () {
        return 'Hello world';
    };
    return Base;
}());
var Derived = /** @class */ (function (_super) {
    __extends(Derived, _super);
    function Derived() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.myGreeting = Derived.getGreeting();
        return _this;
    }
    return Derived;
}(Base));
var v1 = new Derived();
console.log(v1);
