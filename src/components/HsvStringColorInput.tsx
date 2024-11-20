import React, { useState, useEffect } from "react";
import { ColorInputBaseProps } from "../types";
import { hsvStringToHsv, hsvToHsvString } from "../utils/convert";

interface HsvColorInputProps extends ColorInputBaseProps {
  label?: string;
}

export const HsvStringColorInput = ({color="", onChange, label}: HsvColorInputProps): JSX.Element => {
  const [inputValue, setInputValue] = useState<string>(color)

  useEffect(() => {
    setInputValue(color)
  }, [color])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setInputValue(value)
  }

  const handleInputBlur = () => {
    const parsed = hsvStringToHsv(inputValue)
    setInputValue(hsvToHsvString(parsed))
    if (onChange) {
      onChange(hsvToHsvString(parsed))
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault()
      const parsed = hsvStringToHsv(inputValue)
      setInputValue(hsvToHsvString(parsed))
      if (onChange) {
        onChange(hsvToHsvString(parsed))
      }
    }
  }

  return (
    <div className="color-input-container">
      <label htmlFor={label}>{label || 'HSV'}</label>
      <input
        className="color-input"
        id={label}  
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onKeyDown={handleKeyDown}
        aria-label="HSV Color"
      />
    </div>
  )
}