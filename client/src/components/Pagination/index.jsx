import React from 'react';
import { useProductsContext } from '../../contexts/ProductsContext';




const Pagination = () => {
  const {products, setCurrentPage, currentPage, pageSize} = useProductsContext();
  
  const totalPages = products ? Math.ceil(products.length / pageSize) : 0;
  if (totalPages === 1) return null;

  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
  }


 
  return (
    <nav className='d-flex justify-content-center'>
        <ul className='pagination'>
            {pages.map((page) => (
                <li 
                    className={page === currentPage ? 'page-item active' : 'page-item'} 
                    key={page}
                    onClick={() => setCurrentPage(page) }
                >
                    <p className='page-link'>{page}</p>
                </li>
            ))}           
        </ul>
    </nav>
  )
}

export default Pagination;