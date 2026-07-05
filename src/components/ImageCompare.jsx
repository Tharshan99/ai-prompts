import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ImageCompare({ beforeImage, afterImage, title }) {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSliderChange = (e) => {
    setSliderPosition(Number(e.target.value));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <div className="image-compare-container">
        {/* Background Image: AI Output (After) */}
        <div className="image-compare-bg">
          <img 
            src={afterImage} 
            alt={`${title} - AI Output`} 
            draggable="false"
          />
          <span className="compare-label after">AI Output</span>
        </div>

        {/* Foreground Image: Original (Before) - Clipped dynamically */}
        <div 
          className="image-compare-overlay"
          style={{
            clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`
          }}
        >
          <img 
            src={beforeImage} 
            alt={`${title} - Original Input`} 
            draggable="false"
          />
          <span className="compare-label before">Original Input</span>
        </div>

        {/* Vertical line separator */}
        <div 
          className="image-compare-handle"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Glowing Slider Handle Button */}
          <div className="image-compare-button">
            <ChevronLeft size={16} style={{ marginRight: '-2px' }} />
            <ChevronRight size={16} style={{ marginLeft: '-2px' }} />
          </div>
        </div>

        {/* Transparent native range slider overlay for drag/touch interaction */}
        <input 
          type="range"
          min="0"
          max="100"
          value={sliderPosition}
          onChange={handleSliderChange}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0,
            cursor: 'ew-resize',
            zIndex: 20,
            margin: 0
          }}
          aria-label="Before and after image slider"
        />
      </div>
      <p style={{ 
        textAlign: 'center', 
        fontSize: '0.85rem', 
        color: 'var(--text-muted)',
        fontStyle: 'italic'
      }}>
        Drag the slider or click/tap to compare original input and AI output
      </p>
    </div>
  );
}
