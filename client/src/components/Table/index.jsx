import React from 'react';
import { Table, Spin, Select } from 'antd';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import { useProductsContext } from '../../contexts/ProductsContext';
import styles from './TablePage.module.css';
import { useState } from 'react';
import Pagination from '../Pagination';
import SearchBar from '../SearchBar';

const { Option } = Select;
const dayjs = require("dayjs");


const TablePage = () => {
   
   const {products, setProducts, setCurrentPage, currentPage, pageSize} = useProductsContext();
   const [inputSearch, setInputSearch] = useState('');
   const [columnName, setColumnName] = useState('');
   const [condition, setCondition] = useState('');

   const filteredData = getFilteredData();
   const endIndex = currentPage * pageSize;
   const startIndex = endIndex - pageSize;
   const paginatedProduct = filteredData.slice(startIndex, endIndex);

     
   const onSortAsc = (sortedColumn) => {
      if (sortedColumn !==null) {
        const sortedData = [...products].sort((a, b) => 
          a[sortedColumn] > b[sortedColumn] ? 1 : -1
        );
       
        setProducts(sortedData);
      }
   };


   const onSortDesc = (sortedColumn) => {
    if (sortedColumn !==null) {
      const sortedData = [...products].sort((a, b) => 
        a[sortedColumn] < b[sortedColumn] ? 1 : -1
      );
    
      setProducts(sortedData);
    }
 };

   
  
    const columns = [
        {
          title: () => {             
            return (            
                <h6>Date</h6>            
            )            
          },
          dataIndex: 'created_at',
          key: 'created_at',
          render: (created_at) => dayjs(created_at).format('YYYY-MM-DD') 
        },
        {
          title: () => {             
            return (
              <div className={styles.titleContainer}>
                <h6>Title</h6>
                <div>
                  <CaretUpOutlined onClick={() => onSortAsc('name')}/>
                  <CaretDownOutlined onClick={() => onSortDesc('name')}/>
                </div>
              </div>
            )            
          },
          dataIndex: 'name',
          key: 'name',         
        },
        {
          title: () => {             
            return (
              <div className={styles.titleContainer}>
                <h6>Quantity</h6>
                <div>
                  <CaretUpOutlined onClick={() => onSortAsc('quantity')}/>
                  <CaretDownOutlined onClick={() => onSortDesc('quantity')}/>
                </div>
              </div>
            )            
          },
          dataIndex: 'quantity',
          key: 'quantity',          
        },
        {
          title: () => {             
            return (
              <div className={styles.titleContainer}>
                <h6>Distance</h6>
                <div>
                  <CaretUpOutlined onClick={() => onSortAsc('distance')}/>
                  <CaretDownOutlined onClick={() => onSortDesc('distance')}/>
                </div>
              </div>
            )            
          },
          key: 'distance',
          dataIndex: 'distance',
        },
      ];

      
  if (products.length < 1) {
    return (
      <div className={styles.spinner}>
        <Spin size="large"  />
      </div>
    )
  }

 
  function getFilteredData() {
    if (!inputSearch) {
      return products;
    }

    return products.filter((item) => {  
     
      if (condition == 'contains') {
        return columnName != 'name' ? item[columnName].toString().includes(inputSearch) :
        item[columnName].toLowerCase().includes(inputSearch.toLowerCase())
      }
      if (condition == 'equal') {
        return columnName != 'name' ? item[columnName] == inputSearch : 
        item[columnName].toLowerCase() == inputSearch.toLowerCase() 
      }
      if (condition == 'greater') {
        return item[columnName] > inputSearch;
      }
      if (condition == 'less') {
        return item[columnName] < inputSearch;
      }
    })
     
  }
      
  const handleReset = () => {
    setInputSearch('');
    setColumnName('');
    setCondition('');
  };


  const handleSearch = (searchValue) => {
    setInputSearch(searchValue);
    setCurrentPage(1);  
  };

 

  return (

    <div className={styles.wrapper}>
      <div className={styles.filters}>
        <Select
            defaultValue="Column"
            style={{
                width: 120,
                marginRight:20
            }}
            onChange={(value) => {setColumnName(value)}}
            allowClear={true}
            >
            <Option value="date">Date</Option>
            <Option value="name">Title</Option>
            <Option value="quantity">Quantity</Option>
            <Option value="distance">Distance</Option>
        </Select>

        <Select
            defaultValue="Condition"
            style={{
                width: 120,
                marginRight:20
            }}
            onChange={(value) => {setCondition(value)}}
            allowClear={true}
            >
            <Option value="equal">Равно</Option>
            <Option value="contains">Содержит</Option>
            <Option value="greater">Больше</Option>
            <Option value="less">Меньше</Option>
        </Select>

        <SearchBar handleReset={handleReset} handleSearch={handleSearch}/>
      </div>
        <Table 
            dataSource={paginatedProduct}
            columns={columns} 
            rowKey={(record) => `${record.id}`}
            pagination={false}          
        />
        <div className={styles.pagination}>
          <Pagination />
        </div>
    </div>
  )
};



export default TablePage;
