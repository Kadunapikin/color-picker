// src/ColorPicker.js
import React, { useState } from 'react';

const colors = [
  { primary: '#ffeb3b', shades: ['#fff59d', '#fff176'] }, // Yellow
  { primary: '#f44336', shades: ['#ef9a9a', '#e57373'] }, // Red
  { primary: '#2196f3', shades: ['#90caf9', '#64b5f6'] }, // Blue
  { primary: '#9c27b0', shades: ['#ce93d8', '#ba68c8'] }, // Purple
];

const ColorPicker = () => {
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [hoveredColor, setHoveredColor] = useState(null);

  const handleColorChange = (color) => {
    setBackgroundColor(color);
    setHoveredColor(null);
  };

  return (
    <div style={{ backgroundColor: backgroundColor, minHeight: '100vh', padding: '20px' }}>
      <div className="color-picker">
        {colors.map((color, index) => (
          <div
            key={index}
            onMouseEnter={() => setHoveredColor(index)}
            onMouseLeave={() => setHoveredColor(null)}
            style={{ position: 'relative', display: 'inline-block', margin: '10px' }}
          >
            <div
              onClick={() => handleColorChange(color.primary)}
              style={{ width: '50px', height: '50px', backgroundColor: color.primary, borderRadius: '50%', cursor: 'pointer' }}
            />
            {hoveredColor === index && (
              <div style={{ position: 'absolute', top: '60px', left: '50%', transform: 'translateX(-50%)' }}>
                {color.shades.map((shade, shadeIndex) => (
                  <div
                    key={shadeIndex}
                    onClick={() => handleColorChange(shade)}
                    style={{ width: '50px', height: '50px', backgroundColor: shade, borderRadius: '50%', cursor: 'pointer', margin: '5px 0' }}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;
