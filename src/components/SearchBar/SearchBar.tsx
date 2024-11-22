/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useProductContext } from "../../context/ProductContext";
import { searchProducts } from "../../services/productService";
import useDebounce from "../../hooks/useDebounce";
import "./SearchBar.css";

const SearchBar = () => {
  const { setProductData, setIsSearching } = useProductContext();
  const [input, setInput] = useState("");
  const searchValue = useDebounce(input);

  const fetchProducts = (query: string) => {
    searchProducts(query).then((data) => {
      const result = data.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
      setProductData(result);
    });
  };

  useEffect(() => {
    if (searchValue) {
      setIsSearching(true);
      fetchProducts(searchValue);
    } else {
      setIsSearching(false);
    }
  }, [searchValue]);

  const handleChange = (query: string) => {
    setInput(query);
  };

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
