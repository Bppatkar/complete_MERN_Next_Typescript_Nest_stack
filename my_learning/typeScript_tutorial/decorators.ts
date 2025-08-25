// what are decorators
//? Decorators are a special kind of declaration that can be attached to classes, methods, properties, or parameters. They use the form '@' expression where expression must evaluate to a function that will be called at runtime with information about the decorated declaration.
// how to use it

//! Enable decorator in tsconfig.json file
/*
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
*/

// 1. CLASS DECORATOR - Logs class name when class is defined
function classLogger(constructor: Function) {
  console.log('Class defined:', constructor.name);
}

@classLogger
class CustomMaths {
  value1: number;
  value2: number;

  constructor(x: number, y: number) {
    this.value1 = x;
    this.value2 = y;
  }
}

let cm = new CustomMaths(10, 20);
console.log('Instance:', cm); // CustomMaths { value1: 10, value2: 20 }

// 2. PROPERTY DECORATOR - Logs property name when class is defined
function logProperty(target: any, propertyName: string) {
  console.log('Property:', propertyName);
}

class CustomMaths1 {
  @logProperty
  value1: number = 0;

  @logProperty
  value2: number = 0;

  constructor(x: number, y: number) {
    this.value1 = x;
    this.value2 = y;
  }
}

let cm1 = new CustomMaths1(10, 20);
console.log('Instance:', cm1); // CustomMaths1 { value1: 10, value2: 20 }

// 3. METHOD DECORATOR - Logs method calls
function logMethod(
  target: any,
  methodName: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(`Method called: ${methodName} with arguments:`, args);
    return originalMethod.apply(this, args);
  };

  return descriptor;
}

class Calculator {
  @logMethod
  add(a: number, b: number): number {
    return a + b;
  }
}

const calc = new Calculator();
console.log('Result:', calc.add(5, 3)); // Logs method call and returns 8

// 4. DECORATOR WITH PARAMETERS (Decorator Factory)
function logWithMessage(message: string) {
  return function (target: any, propertyName: string) {
    console.log(`${message}: ${propertyName}`);
  };
}

class ExampleClass {
  @logWithMessage('This is a property')
  exampleProperty: string = 'test';
}

const example = new ExampleClass();

// 5. PARAMETER DECORATOR - Logs parameter information
function logParameter(target: any, methodName: string, parameterIndex: number) {
  console.log(`Parameter ${parameterIndex} of ${methodName}`);
}

class ExampleWithParams {
  exampleMethod(@logParameter value: string) {
    return value;
  }
}

const exampleWithParams = new ExampleWithParams();
exampleWithParams.exampleMethod('test');

// Output order when this file runs:
// 1. "Class defined: CustomMaths" (from @classLogger)
// 2. "Property: value1" (from @logProperty)
// 3. "Property: value2" (from @logProperty)
// 4. "This is a property: exampleProperty" (from @logWithMessage)
// 5. "Parameter 0 of exampleMethod" (from @logParameter)
// 6. "Instance: CustomMaths { value1: 10, value2: 20 }"
// 7. "Instance: CustomMaths1 { value1: 10, value2: 20 }"
// 8. When calc.add(5, 3) is called: "Method called: add with arguments: [5, 3]"
// 9. "Result: 8"
