import React, { useState, useEffect } from "react";
import { ColorInputBaseProps } from "../types";
import { hslaStringToHsla, hslaToHslaString } from "../utils/convert";

interface HslaColorInputProps extends ColorInputBaseProps {
  label?: string;
}

export const HslaStringColorInput = ({color="", onChange, label}: HslaColorInputProps): JSX.Element => {
  const [inputValue, setInputValue] = useState<string>(color)

  useEffect(() => {
    setInputValue(color)
  }, [color])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setInputValue(value)
  }

  const handleInputBlur = () => {
    const parsed = hslaStringToHsla(inputValue)
    setInputValue(hslaToHslaString(parsed))
    if (onChange) {
      onChange(hslaToHslaString(parsed))
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault()
      const parsed = hslaStringToHsla(inputValue)
      setInputValue(hslaToHslaString(parsed))
      if (onChange) {
        onChange(hslaToHslaString(parsed))
      }
    }
  }

  return (
    <div className="color-input-container">
      <label htmlFor={label}>{label || 'HSLA'}</label>
      <input
        className="color-input"
        id={label}  
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onKeyDown={handleKeyDown}
        aria-label="HSLA Color"
      />
    </div>
  )
}