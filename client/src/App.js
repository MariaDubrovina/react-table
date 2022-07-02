import './App.css';
import Table from './components/Table';
import ProductsContextProvider from './contexts/ProductsContext';

function App() {
  return (
    <ProductsContextProvider>
      <Table />
    </ProductsContextProvider>
  );
}

export default App;
