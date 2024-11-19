import React, { useState, useEffect } from "react";
import { HsvColor } from "../types";
import { ObjectColorInputBaseProps } from "../types";

interface HsvInputFieldsProps extends ObjectColorInputBaseProps<HsvColor> {
  label?: string;
}

export const HsvColorInput = ({color, onChange, label}: HsvInputFieldsProps): JSX.Element => {
  const [inputValues, setInputValues] = useState({
    h: color.h.toString(),
    s: color.s.toString(),
    v: color.v.toString()
  })

  useEffect(() => {
    setInputValues(prev => {
      if (
        prev.h === color.h.toString() &&
        prev.s === color.s.toString() &&
        prev.v === color.v.toString()
      ) {
        return prev
      }
      return {
        h: color.h.toString(),
        s: color.s.toString(),
        v: color.v.toString()
      }
    })
  }, [color])

  const handleInputChange = (field: keyof HsvColor) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setInputValues(prevValues => ({
      ...prevValues,
      [field]: value,
    }))
  }

  const handleInputBlur = (field: keyof HsvColor) => () => {
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

  const handleKeyDown = (field: keyof HsvColor) => (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleInputBlur(field)()
    }
  }

  return (
    <div className="input-fields">
      <span>{label || 'HSV'}</span>
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
          value={inputValues.v}
          onChange={handleInputChange('v')}
          onBlur={handleInputBlur('v')}
          onKeyDown={handleKeyDown('v')}
          aria-label="Value"
        />
      </div>
    </div>
  )
}