import React, { useState, useEffect } from "react";
import { HslaColor } from "../types";
import { ObjectColorInputBaseProps } from "../types";

interface HslaColorInputProps extends ObjectColorInputBaseProps<HslaColor> {
  label?: string;
}

export const HslaColorInput = ({color, onChange, label="HSLA"}: HslaColorInputProps): JSX.Element => {
  const [inputValues, setInputValues] = useState({
    h: color.h.toString(),
    s: color.s.toString(),
    l: color.l.toString(),
    a: color.a.toString(),
  })

  useEffect(() => {
    setInputValues(prev => {
      if (
        prev.h === color.h.toString() &&
        prev.s === color.s.toString() &&
        prev.l === color.l.toString() &&
        prev.a === color.a.toString()
      ) {
        return prev
      }
      return {
        h: color.h.toString(),
        s: color.s.toString(),
        l: color.l.toString(),
        a: color.a.toString(),
      }
    })
  }, [color])

  const handleInputChange = (field: keyof HslaColor) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setInputValues(prevValues => ({
      ...prevValues,
      [field]: value,
    }))
  }

  const handleInputBlur = (field: keyof HslaColor) => () => {
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
    if (field === 'a') max = 1

    const clampedValue = Math.max(min, Math.min(max, parsedValue))
    onChange({ ...color, [field]: clampedValue })
  }

  const handleKeyDown = (field: keyof HslaColor) => (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleInputBlur(field)()
    }
  }

  return (
    <div className="input-fields">
      <label id={`${label}-group-label`} htmlFor={`${label}-hue-input`}>{label}</label>
      <div className="input-fields-container" role="group" aria-labelledby={`${label}-group-label`}>
        <input
          id={`${label}-hue-input`}
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