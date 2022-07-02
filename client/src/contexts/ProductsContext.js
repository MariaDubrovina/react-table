import { createContext, useState, useEffect, useContext } from 'react';
import Api from '../api/Api';



const ProductsContext = createContext({});

const ProductsContextProvider = ({children}) => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Api.get("/")
                setProducts(response.data);
            } catch (err) {
                console.error(err.message);
            }
        };
        fetchData();
        
    }, []);

    

   

    return (
        <ProductsContext.Provider value={{products, setProducts, setCurrentPage, currentPage, pageSize, setPageSize}}>
            {children}
        </ProductsContext.Provider>
    );
};

export default ProductsContextProvider;

export const useProductsContext = () => useContext(ProductsContext);