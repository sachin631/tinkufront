"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value:any) {
  return `${value}°C`;
}

export default function RangeSlider() {
  const [value, setValue] = React.useState([20, 37]);

  const handleChange = (event:any, newValue:any) => {
    setValue(newValue);
  };

  return (
    <main>
      <h1 className='font-bold '>Price</h1>
    <Box >
      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
    </Box>
    <div>
      <h1 className='text-cente font-bold'>Categories</h1>
      <div>
        <ul className='flex flex-col gap-3 justify-center items-center mt-3 '>
          <li className='cursor-pointer'>Laptop</li>
          <li className='cursor-pointer'>FootWear</li>
          <li className='cursor-pointer'>Bottom</li>
          <li className='cursor-pointer'>Top</li>
          
          <li className='cursor-pointer'>camera</li>
          <li className='cursor-pointer'>SmartPhone</li>
        </ul>
      </div>
    </div>
    <div className='mt-4 flex flex-col '>
      <h1 className='font-bold'>Rating Above</h1>
      <input type='range'  max={5} defaultValue={5}/>
    </div>
    </main>
  );
}