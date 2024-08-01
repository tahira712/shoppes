import React from 'react';
import Slider from '@mui/material/Slider';

const valuetext = (value) => {
  return `${value}`;
};

const PriceRange = ({ value, onChange }) => {
  return (
    <div className="price-range">
      <span className="filter-title">Price</span>
      <div className="input-price">
        <input
          type="number"
          value={value[0]}
          onChange={(e) => onChange([Number(e.target.value), value[1]])}
          className="input-price1"
        />
        <span className="dash">-</span>
        <input
          type="number"
          value={value[1]}
          onChange={(e) => onChange([value[0], Number(e.target.value)])}
          className="input-price1"
        />
      </div>
      <Slider
        className="slider"
        getAriaLabel={() => 'Price range'}
        value={value}
        onChange={(e, newValue) => onChange(newValue)}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        disableSwap
      />
    </div>
  );
};

export default PriceRange;
