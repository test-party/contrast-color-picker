import React, { useState, useEffect } from "react";
import { RgbaColor } from "../types";
import { ObjectColorInputBaseProps } from "../types";

interface RgbaColorInputProps extends ObjectColorInputBaseProps<RgbaColor> {
  label?: string;
}

export const RgbaColorInput = ({color, onChange, label="RGBA"}: RgbaColorInputProps): JSX.Element => {
  const [inputValues, setInputValues] = useState({
    r: color.r.toString(),
    g: color.g.toString(),
    b: color.b.toString(),
    a: color.a.toString(),
  })

  useEffect(() => {
    setInputValues(prev => {
      if (
        prev.r === color.r.toString() &&
        prev.g === color.g.toString() &&
        prev.b === color.b.toString() &&
        prev.a === color.a.toString()
      ) {
        return prev
      }
      return {
        r: color.r.toString(),
        g: color.g.toString(),
        b: color.b.toString(),
        a: color.a.toString(),
      }
    })
  }, [color])

  const handleInputChange = (field: keyof RgbaColor) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setInputValues(prevValues => ({
      ...prevValues,
      [field]: value,
    }))
  }

  const handleInputBlur = (field: keyof RgbaColor) => () => {
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
    if (field === 'a') max = 1

    const clampedValue = Math.max(min, Math.min(max, parsedValue))
    onChange({ ...color, [field]: clampedValue })
  }

  const handleKeyDown = (field: keyof RgbaColor) => (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleInputBlur(field)()
    }
  }

  return (
    <div className="input-fields">
      <label id={`${label}-group-label`} htmlFor={`${label}-red-input`}>{label}</label>
      <div className="input-fields-container" role="group" aria-labelledby={`${label}-group-label`}>
        <input
          id={`${label}-red-input`}
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
        <input
          type="text"
          value={inputValues.a}
          onChange={handleInputChange('a')}
          onBlur={handleInputBlur('a')}
          onKeyDown={handleKeyDown('a')}
          aria-label="Alpha"
        />
      </div>
    </div>
  )
}