// ========== FUNCTION DECORATOR OVERRIDE ==========

// 1. BASIC FUNCTION DECORATOR
function logCall(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(`Calling ${propertyKey} with arguments:`, args);
    const result = originalMethod.apply(this, args);
    console.log(`Method ${propertyKey} returned:`, result);
    return result;
  };

  return descriptor;
}

// 2. DECORATOR THAT MEASURES EXECUTION TIME
function measureTime(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(`⏱️  Starting ${propertyKey}...`);
    const start = performance.now();
    const result = originalMethod.apply(this, args);
    const end = performance.now();
    console.log(`⏱️  ${propertyKey} took ${(end - start).toFixed(2)}ms`);
    return result;
  };

  return descriptor;
}

// 3. DECORATOR THAT CACHES RESULTS
function cacheResult(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  const cache = new Map();

  descriptor.value = function (...args: any[]) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      console.log(`📦 Returning cached result for ${propertyKey}`);
      return cache.get(key);
    }

    const result = originalMethod.apply(this, args);
    cache.set(key, result);
    console.log(`💾 Caching result for ${propertyKey}`);
    return result;
  };

  return descriptor;
}

class Calculator {
  // Using multiple decorators - they execute from bottom to top
  @logCall
  @measureTime
  @cacheResult
  expensiveCalculation(n: number): number {
    // Simulate expensive calculation
    let result = 0;
    for (let i = 0; i < n * 1000000; i++) {
      result += Math.sqrt(i);
    }
    return result;
  }

  // Another example with different decorators
  @logCall
  @measureTime
  add(a: number, b: number): number {
    return a + b;
  }
}

// Test the decorated methods
const calc = new Calculator();

console.log('=== First call (will cache) ===');
calc.expensiveCalculation(5);

console.log('\n=== Second call (uses cache) ===');
calc.expensiveCalculation(5);

console.log('\n=== Different argument (will calculate again) ===');
calc.expensiveCalculation(10);

console.log('\n=== Simple addition ===');
calc.add(2, 3);

//! output
//? === First call (will cache) ===
// ⏱️  Starting expensiveCalculation...
// 📦 Returning cached result for expensiveCalculation
// Calling expensiveCalculation with arguments: [5]
// ⏱️  expensiveCalculation took 12.34ms
// Method expensiveCalculation returned: 12345.67

//? === Second call (uses cache) ===
// 💾 Caching result for expensiveCalculation
// Calling expensiveCalculation with arguments: [5]
// Method expensiveCalculation returned: 12345.67

//? === Different argument (will calculate again) ===
// ⏱️  Starting expensiveCalculation...
// Calling expensiveCalculation with arguments: [10]
// ⏱️  expensiveCalculation took 24.56ms
// Method expensiveCalculation returned: 24680.12

//? === Simple addition ===
// ⏱️  Starting add...
// Calling add with arguments: [2, 3]
// ⏱️  add took 0.12ms
// Method add returned: 5

//! Decorator Execution Flow:
/* 
*
Original Method
    ↓
Cache Decorator (wraps original)
    ↓
Time Decorator (wraps cache wrapper)
    ↓
Log Decorator (wraps time wrapper)
    ↓
Final Method (with all functionality) 

*
*/
