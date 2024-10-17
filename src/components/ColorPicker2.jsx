import React, { useState, useRef } from 'react';

const colors = [
  { primary: '#ffeb3b', shades: ['#fff59d', '#fff176'] }, // Yellow
  { primary: '#f44336', shades: ['#ef9a9a', '#e57373'] }, // Red
  { primary: '#2196f3', shades: ['#90caf9', '#64b5f6'] }, // Blue
  { primary: '#9c27b0', shades: ['#ce93d8', '#ba68c8'] }, // Purple
];

const ColorPicker2 = () => {
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [hoveredColor, setHoveredColor] = useState(null);
  const [persistedColor, setPersistedColor] = useState(null);
  const timerRef = useRef(null);

  const handleColorChange = (color) => {
    setBackgroundColor(color);
    setHoveredColor(null);
    setPersistedColor(null);
  };

  const handleMouseEnter = (index) => {
    clearTimeout(timerRef.current);
    setHoveredColor(index);
  };

  const handleMouseLeave = (index) => {
    if (hoveredColor === index) {
      timerRef.current = setTimeout(() => {
        setHoveredColor(null);
        setPersistedColor(null);
      }, 5000);
    }
  };

  const handlePersistedMouseLeave = () => {
    timerRef.current = setTimeout(() => {
      setHoveredColor(null);
      setPersistedColor(null);
    }, 5000);
  };

  const handlePersistedMouseEnter = (index) => {
    clearTimeout(timerRef.current);
    setPersistedColor(index);
  };

  return (
    <div style={{ backgroundColor: backgroundColor, minHeight: '100vh', padding: '20px' }}>
      <div className="color-picker">
        {colors.map((color, index) => (
          <div
            key={index}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
            style={{ position: 'relative', display: 'inline-block', margin: '10px' }}
          >
            <div
              onClick={() => handleColorChange(color.primary)}
              style={{ width: '30px', height: '30px', backgroundColor: color.primary, borderRadius: '50%', cursor: 'pointer' }}
            />
            {(hoveredColor === index || persistedColor === index) && (
              <div
                onMouseEnter={() => handlePersistedMouseEnter(index)}
                onMouseLeave={handlePersistedMouseLeave}
                style={{ position: 'absolute', top: '30px', left: '50%', transform: 'translateX(-50%)' }}
              >
                {color.shades.map((shade, shadeIndex) => (
                  <div
                    key={shadeIndex}
                    onClick={() => handleColorChange(shade)}
                    style={{ width: '30px', height: '30px', backgroundColor: shade, borderRadius: '50%', cursor: 'pointer', margin: '5px 0' }}
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

export default ColorPicker2;
