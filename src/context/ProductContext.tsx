import { createContext, useState, useContext } from "react";
import { ProductType } from "../types/producTypes";

type ProductContextType = {
  productData: ProductType[];
  setProductData: React.Dispatch<React.SetStateAction<ProductType[]>>;
  isSearching: boolean;
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [productData, setProductData] = useState<ProductType[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  return (
    <ProductContext.Provider
      value={{ productData, setProductData, isSearching, setIsSearching }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};
