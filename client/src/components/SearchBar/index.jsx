import React from 'react';
import { Input, Button} from 'antd';
import { useState } from 'react';



const Filters = ({handleSearch, handleReset}) => {
  const [value, setValue] = useState('');

  return (
    <div style={{display:'flex', flexDirection:'row'}}>
        <Input 
            placeholder="Search"
            value={value}
            onChange={(e) => {setValue(e.target.value)}}
            style={{marginRight:20}}
            
        />
        <Button onClick={() => handleSearch(value)} type="primary" style={{marginRight:10}}>Search</Button>
        <Button onClick={() => {
            handleReset();
            setValue('')
        }} type="primary">Reset</Button>
    </div>
  )
};

export default Filters;
