import { useCallback, useEffect, useRef, useState } from "react";
import { useProductContext } from "../../context/ProductContext";
import { fetchProducts } from "../../services/productService";
import { ProductType } from "../../types/producTypes";
import "./ProductList.css";

const ProductList = () => {
  const { productData, setProductData, isSearching } = useProductContext();
  const [skipProduct, setSkipProduct] = useState(0);
  const firstRender = useRef(true);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight &&
      !isSearching
    ) {
      setSkipProduct((prev) => prev + 20);
    }
  }, [isSearching]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    if (!firstRender.current && !isSearching) {
      fetchProducts(skipProduct)
        .then((data) => {
          if (data) {
            setProductData((prev) => [...prev, ...data]);
          }
        })
        .catch((error) => console.error(error));
    } else {
      firstRender.current = false;
    }
  }, [skipProduct, setProductData, isSearching]);

  return (
    <div className="products">
      {productData?.length !== 0 ? (
        productData?.map((product: ProductType, index: number) => (
          <div className="product" key={`${product.id}-${index}`}>
            <img
              src={product.images[0]}
              alt={product.title}
              className="image"
            />
            <h2>{product.title}</h2>
            <p>${product.price}</p>
          </div>
        ))
      ) : (
        <span className="no-item">No item</span>
      )}
    </div>
  );
};

export default ProductList;
