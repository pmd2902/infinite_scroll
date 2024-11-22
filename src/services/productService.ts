import { ProductType } from "../types/producTypes";

export const fetchProducts = async (skip: number): Promise<ProductType[]> => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/products?limit=20&skip=${skip}&select=title,price,images`
    );
    const data: { products: ProductType[] } = await response.json();
    return data.products;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const searchProducts = async (query: string): Promise<ProductType[]> => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/products/search?q=${query}&select=title,price,images`
    );
    const data: { products: ProductType[] } = await response.json();
    return data.products;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
