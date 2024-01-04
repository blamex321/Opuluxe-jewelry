class Product {
  constructor(id, name, price, description, image, categoryIds) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.image = image;
    this.categoryIds = categoryIds;
  }
}

export default Product;