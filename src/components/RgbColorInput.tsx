import React, { useState, useEffect } from "react";
import { RgbColor } from "../types";
import { ObjectColorInputBaseProps } from "../types";

interface RgbColorInputProps extends ObjectColorInputBaseProps<RgbColor> {
  label?: string;
}

export const RgbColorInput = ({color, onChange, label}: RgbColorInputProps): JSX.Element => {
  const [inputValues, setInputValues] = useState({
    r: color.r.toString(),
    g: color.g.toString(),
    b: color.b.toString()
  })

  useEffect(() => {
    setInputValues(prev => {
      if (
        prev.r === color.r.toString() &&
        prev.g === color.g.toString() &&
        prev.b === color.b.toString()
      ) {
        return prev
      }
      return {
        r: color.r.toString(),
        g: color.g.toString(),
        b: color.b.toString()
      }
    })
  }, [color])

  const handleInputChange = (field: keyof RgbColor) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setInputValues(prevValues => ({
      ...prevValues,
      [field]: value,
    }))
  }

  const handleInputBlur = (field: keyof RgbColor) => () => {
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
    let max = 255

    const clampedValue = Math.max(min, Math.min(max, parsedValue))
    onChange({ ...color, [field]: clampedValue })
  }

  const handleKeyDown = (field: keyof RgbColor) => (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleInputBlur(field)()
    }
  }

  return (
    <div className="input-fields">
      <span>{label || 'RGB'}</span>
      <div className="input-fields-container">
        <input
          type="text"
          value={inputValues.r}
          onChange={handleInputChange('r')}
          onBlur={handleInputBlur('r')}
          onKeyDown={handleKeyDown('r')}
          aria-label="Red"
        />
        <input
          type="text"
          value={inputValues.g}
          onChange={handleInputChange('g')}
          onBlur={handleInputBlur('g')}
          onKeyDown={handleKeyDown('g')}
          aria-label="Green"
        />
        <input
          type="text"
          value={inputValues.b}
          onChange={handleInputChange('b')}
          onBlur={handleInputBlur('b')}
          onKeyDown={handleKeyDown('b')}
          aria-label="Blue"
        />
      </div>
    </div>
  )
}