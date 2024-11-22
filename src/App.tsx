import { ProductProvider } from "./context/ProductContext";
import ProductList from "./components/ProductList/ProductList";
import SearchBar from "./components/SearchBar/SearchBar";
import "./App.css";

function App() {
  return (
    <ProductProvider>
      <div className="App">
        <div className="container">
          <h1 className="title">Products</h1>
          <SearchBar />
          <ProductList />
        </div>
      </div>
    </ProductProvider>
  );
}

export default App;
