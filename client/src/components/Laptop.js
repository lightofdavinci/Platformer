import React from 'react';
import LaptopScreen from './LaptopScreen';
import '../styles/Laptop.css';

const Laptop = () => {
  return (
    <div className="Laptop">
      <div className="Laptop-top-side">
        <div className="Laptop-camera" />
        <div>
          <LaptopScreen />
        </div>
      </div>
      <div className="Laptop-bottom-side">
        <div className="Laptop-touch-pad" />
      </div>
      <div className="Laptop-shadow" />
    </div>
  );
};

export default Laptop;
