// what is classes
//? class is a blueprint of object
// example of classes
class Product {
  name: string;
  price: number;
  pId: number;
  inCart: boolean;
  isOrdered: boolean;
  constructor(name: string, price: number, pid: number) {
    this.name = name;
    this.price = price;
    this.pId = pid;
    this.inCart = false;
    this.isOrdered = false;
  }
  // define data types to class property and function
  addToCart(): void {
    this.inCart = true;
  }
  buyProduct(): string {
    if (this.inCart) {
      this.isOrdered = true;
      return `Product ${this.name} is ordered for $${this.price}`;
    } else {
      return 'No product in cart';
    }
  }
  applyDiscount(percentage: number): number {
    let discount: number = this.price * (percentage / 100);
    this.price = -discount;
    return this.price;
  }

  getProductInfo(): string {
    return `Product: ${this.name}, Price: $${this.price}, ID: ${this.pId}`;
  }
}

let product1 = new Product('samsung', 12000, 101);
// Usage examples
console.log(product1.getProductInfo()); // "Product: Samsung, Price: $12000, ID: 101"
product1.addToCart();
console.log(product1.buyProduct()); // "Product Samsung is ordered for $12000"
console.log(product1.applyDiscount(10)); // 10800s
