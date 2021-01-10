class Product {
	constructor(name, category, quantity, unit) {
		this.name = name;
		this.category = category;
		this.quantity = quantity;
		this.unit = unit;
		this.id = Math.round(Math.random() * 1000);
	}
}

export default Product;
