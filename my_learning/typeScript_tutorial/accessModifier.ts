// what is the access modifier
// public
// private
// protected

class Product {
  // Public properties (default) - accessible from anywhere
  public name: string;
  public price: number;
  public pId: number;

  // Private property - only accessible within this class
  private inCart: boolean;

  // Protected property - accessible within this class and subclasses
  protected isOrdered: boolean;

  // Readonly property - can only be set in constructor
  public readonly createdAt: Date;

  constructor(name: string, price: number, pId: number) {
    this.name = name;
    this.price = price;
    this.pId = pId;
    this.inCart = false;
    this.isOrdered = false;
    this.createdAt = new Date();
  }

  // public method - accessble from anywhere
  public addToCart(): void {
    this.inCart = true;
    console.log(`${this.name} added to cart`);
  }

  // public method
  public buyProduct() {
    if (this.inCart) {
      return `Product ${this.name} is ordered for $${this.price}`;
    } else {
      return 'No Product in cart';
    }
  }

  // private method - only accessible within this class
  private validatePrice(): boolean {
    return this.price > 0;
  }

  // protected method - accessible within this class and subclass
  protected updateOrderStatus(status: boolean): void {
    this.isOrdered = status;
  }

  // public method that uses private method
  public checkPriceValidity(): string {
    const isValid = this.validatePrice();
    return isValid ? 'Price is valid' : 'Price is invalid';
  }

  // getter for private property
  public getInCartStatus(): boolean {
    return this.inCart;
  }
}

class ElectronicProduct extends Product {
  private warrentyPeriod: number;
  constructor(name: string, price: number, pId: number, warrenty: number) {
    super(name, price, pId);
    this.warrentyPeriod = warrenty;
  }

  // can access protected member from parent class
  public extendWarranty(): string {
    this.updateOrderStatus(true); // accessing protected method
    this.warrentyPeriod += 12;
    return `Warranty extended. New warranty period: ${this.warrentyPeriod} months`;
  }

  //! cannot access private members from parent class
  // public tryAccessPrivate() {
  //   this.inCart = true; // Error: Property 'inCart' is private
  // }
}

// Usage examples
const product1 = new Product('Samsung TV', 12000, 101);
const electronicProduct = new ElectronicProduct('iPhone', 80000, 102, 24);

// Public access - works
console.log(product1.name); // "Samsung TV"
product1.addToCart(); // "Samsung TV added to cart"
console.log(product1.buyProduct()); // "Product Samsung TV is ordered for $12000"

// Private access - doesn't work outside class
// console.log(product1.inCart); // Error: Property 'inCart' is private
// product1.validatePrice(); // Error: Method 'validatePrice' is private

// Using getter for private property
console.log(product1.getInCartStatus()); // true

// Protected access - doesn't work outside class hierarchy
// console.log(product1.isOrdered); // Error: Property 'isOrdered' is protected
// product1.updateOrderStatus(false); // Error: Method 'updateOrderStatus' is protected

// Subclass can access protected members
console.log(electronicProduct.extendWarranty()); // "Warranty extended..."

// Readonly property
console.log(product1.createdAt); // Works
// product1.createdAt = new Date(); // Error: Cannot assign to 'createdAt'

// Public method that uses private method internally
console.log(product1.checkPriceValidity()); // "Price is valid"
