import React, { useState, useEffect } from "react";
import { ColorInputBaseProps } from "../types";
import { rgbStringToRgb, rgbToRgbString } from "../utils/convert";

interface RgbColorInputProps extends ColorInputBaseProps {
  label?: string;
}

export const RgbStringColorInput = ({color="", onChange, label}: RgbColorInputProps): JSX.Element => {
  const [inputValue, setInputValue] = useState<string>(color)

  useEffect(() => {
    setInputValue(color)
  }, [color])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setInputValue(value)
  }

  const handleInputBlur = () => {
    const parsed = rgbStringToRgb(inputValue)
    setInputValue(rgbToRgbString(parsed))
    if (onChange) {
      onChange(rgbToRgbString(parsed))
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault()
      const parsed = rgbStringToRgb(inputValue)
      setInputValue(rgbToRgbString(parsed))
      if (onChange) {
        onChange(rgbToRgbString(parsed))
      }
    }
  }

  return (
    <div className="color-input-container">
      <label htmlFor={label}>{label || 'RGB'}</label>
      <input
        className="color-input"
        id={label}  
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onKeyDown={handleKeyDown}
        aria-label="RGB Color"
      />
    </div>
  )
}