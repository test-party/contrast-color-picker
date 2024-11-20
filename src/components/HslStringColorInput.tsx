import React, { useState, useEffect } from "react";
import { ColorInputBaseProps } from "../types";
import { hslStringToHsl, hslToHslString } from "../utils/convert";

interface HslColorInputProps extends ColorInputBaseProps {
  label?: string;
}

export const HslStringColorInput = ({color="", onChange, label}: HslColorInputProps): JSX.Element => {
  const [inputValue, setInputValue] = useState<string>(color)

  useEffect(() => {
    setInputValue(color)
  }, [color])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setInputValue(value)
  }

  const handleInputBlur = () => {
    const parsed = hslStringToHsl(inputValue)
    setInputValue(hslToHslString(parsed))
    if (onChange) {
      onChange(hslToHslString(parsed))
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault()
      const parsed = hslStringToHsl(inputValue)
      setInputValue(hslToHslString(parsed))
      if (onChange) {
        onChange(hslToHslString(parsed))
      }
    }
  }

  return (
    <div className="color-input-container">
      <label htmlFor={label}>{label || 'HSL'}</label>
      <input
        className="color-input"
        id={label}  
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onKeyDown={handleKeyDown}
        aria-label="HSL Color"
      />
    </div>
  )
}