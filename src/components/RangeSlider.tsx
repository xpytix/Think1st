import React, { useState } from "react";

interface RangeSliderProps {
  label?: string; 
  value: number; 
  min?: number; 
  max?: number; 
  step?: number; 
  onChange?: (value: number) => void; 
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  onChange,
}) => {
  const [tooltipPosition, setTooltipPosition] = useState(0);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);

    const slider = event.target;
    const newPosition =
      ((newValue - Number(slider.min)) /
        (Number(slider.max) - Number(slider.min))) *
      100;

    setTooltipPosition(newPosition);

    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="relative mb-8 ">
      {/* Etykieta */}
      {label && (
        <label
          htmlFor="small-range"
          className="py-2 font-sans block text-base font-normal text-text "
        >
          {label}
        </label>
      )}

      <div className="flex justify-between text-xs font-normal px-1 text-text">
        <span>{min}</span>
        <span>{max}</span>
      </div>

      {/* Suwak z tooltipem */}
      <div className="relative">
        {/* Suwak */}
        <input
          id="range-slider"
          type="range"
          value={value}
          min={min}
          max={max}
          step={step}
          className="w-full h-1  bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
          onChange={handleInputChange}
          data-tooltip-target="tooltip-bottom"
          data-tooltip-placement="bottom"
        />
  
        <div
          className="absolute w-fit left-0 rounded-md transform -translate-x-1/2 border border-secondary bg-white text-primary mx-1 px-3 py-1 text-center text-xs font-medium focus:outline-none focus:ring-4 focus:ring-blue-300 "
          style={{
            left: `${tooltipPosition}%`,
            top: "30px", 
          }}
        >
          {value}
        </div>

        {/* <div
          id="tooltip-bottom"
          role="tooltip"
          
          className="absolute left-0 inline-block px-3 py-2 text-sm font-medium  bg-white text-primary bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
          style={{
            left: `${tooltipPosition}%`,
            top: "30px", // Pozycja pod suwakiem
          }}
        >
          {value}
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div> */}
      </div>
    </div>
  );
};

export default RangeSlider;
