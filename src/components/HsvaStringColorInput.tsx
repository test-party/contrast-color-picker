import React, { useState, useEffect } from "react";
import { ColorInputBaseProps } from "../types";
import { hsvaStringToHsva, hsvaToHsvaString } from "../utils/convert";

interface HsvaColorInputProps extends ColorInputBaseProps {
  label?: string;
}

export const HsvaStringColorInput = ({color="", onChange, label}: HsvaColorInputProps): JSX.Element => {
  const [inputValue, setInputValue] = useState<string>(color)

  useEffect(() => {
    setInputValue(color)
  }, [color])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setInputValue(value)
  }

  const handleInputBlur = () => {
    const parsed = hsvaStringToHsva(inputValue)
    setInputValue(hsvaToHsvaString(parsed))
    if (onChange) {
      onChange(hsvaToHsvaString(parsed))
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault()
      const parsed = hsvaStringToHsva(inputValue)
      setInputValue(hsvaToHsvaString(parsed))
      if (onChange) {
        onChange(hsvaToHsvaString(parsed))
      }
    }
  }

  return (
    <div className="color-input-container">
      <label htmlFor={label}>{label || 'HSVA'}</label>
      <input
        className="color-input"
        id={label}  
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onKeyDown={handleKeyDown}
        aria-label="HSVA Color"
      />
    </div>
  )
}