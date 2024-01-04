import axios from "axios";
import Category from "../models/category";
import Product from "../models/product";

export let CATEGORIES = [
  new Category("1", "Earrings"),
  new Category("2", "Rings"),
  new Category("3", "Necklaces"),
  new Category("4", "Bracelets"),
  new Category("5", "Bangles"),
  new Category("6", "Collections"),
];

export let PRODUCTS = [];


export const fetchProducts = async () => {
  try {
    const response = await axios.get("https://jewllery-app-b3668-default-rtdb.asia-southeast1.firebasedatabase.app/products.json");

    if (response.data) {
      // Transform API response into Product instances
      const apiProducts = Object.values(response.data['-NnKFw3WoZZ4XfyuRjjl']);
      const dynamicProducts = apiProducts.map(product => {
        return new Product(
          product.id,
          product.title,
          product.price,
          product.description,
          product.imageUrl,
          product.categoryIds
        );
      });

      // Update PRODUCTS array
      PRODUCTS = dynamicProducts;
    }
  } catch (error) {
    console.log(error);
  }
};
