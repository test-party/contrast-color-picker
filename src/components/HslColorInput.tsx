import React, { useState, useEffect } from "react";
import { HslColor } from "../types";
import { ObjectColorInputBaseProps } from "../types";

interface HslColorInputProps extends ObjectColorInputBaseProps<HslColor> {
  label?: string;
}

export const HslColorInput = ({color, onChange, label}: HslColorInputProps): JSX.Element => {
  const [inputValues, setInputValues] = useState({
    h: color.h.toString(),
    s: color.s.toString(),
    l: color.l.toString()
  })

  useEffect(() => {
    setInputValues(prev => {
      if (
        prev.h === color.h.toString() &&
        prev.s === color.s.toString() &&
        prev.l === color.l.toString()
      ) {
        return prev
      }
      return {
        h: color.h.toString(),
        s: color.s.toString(),
        l: color.l.toString()
      }
    })
  }, [color])

  const handleInputChange = (field: keyof HslColor) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setInputValues(prevValues => ({
      ...prevValues,
      [field]: value,
    }))
  }

  const handleInputBlur = (field: keyof HslColor) => () => {
    const value = inputValues[field]
    const parsedValue = parseFloat(value)
    if (value === '' || isNaN(parsedValue)) {
      setInputValues(prevValues => ({
        ...prevValues,
        [field]: color[field].toString(),
      }))
      return
    }

    let min = 0
    let max = 100
    if (field === 'h') max = 360

    const clampedValue = Math.max(min, Math.min(max, parsedValue))
    onChange({ ...color, [field]: clampedValue })
  }

  const handleKeyDown = (field: keyof HslColor) => (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleInputBlur(field)()
    }
  }

  return (
    <div className="input-fields">
      <span>{label || 'HSL'}</span>
      <div className="input-fields-container">
        <input
          type="text"
          value={inputValues.h}
          onChange={handleInputChange('h')}
          onBlur={handleInputBlur('h')}
          onKeyDown={handleKeyDown('h')}
          aria-label="Hue"
        />
        <input
          type="text"
          value={inputValues.s}
          onChange={handleInputChange('s')}
          onBlur={handleInputBlur('s')}
          onKeyDown={handleKeyDown('s')}
          aria-label="Saturation"
        />
        <input
          type="text"
          value={inputValues.l}
          onChange={handleInputChange('l')}
          onBlur={handleInputBlur('l')}
          onKeyDown={handleKeyDown('l')}
          aria-label="Lightness"
        />
      </div>
    </div>
  )
}