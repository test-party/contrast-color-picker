import React, { useState, useEffect } from "react";
import { ColorInputBaseProps } from "../types";
import { rgbaStringToRgba, rgbaToRgbaString } from "../utils/convert";

interface RgbaColorInputProps extends ColorInputBaseProps {
  label?: string;
}

export const RgbaStringColorInput = ({color="", onChange, label}: RgbaColorInputProps): JSX.Element => {
  const [inputValue, setInputValue] = useState<string>(color)

  useEffect(() => {
    setInputValue(color)
  }, [color])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setInputValue(value)
  }

  const handleInputBlur = () => {
    const parsed = rgbaStringToRgba(inputValue)
    setInputValue(rgbaToRgbaString(parsed))
    if (onChange) {
      onChange(rgbaToRgbaString(parsed))
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault()
      const parsed = rgbaStringToRgba(inputValue)
      setInputValue(rgbaToRgbaString(parsed))
      if (onChange) {
        onChange(rgbaToRgbaString(parsed))
      }
    }
  }

  return (
    <div className="color-input-container">
      <label htmlFor={label}>{label || 'RGBA'}</label>
      <input
        className="color-input"
        id={label}  
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onKeyDown={handleKeyDown}
        aria-label="RGBA Color"
      />
    </div>
  )
}