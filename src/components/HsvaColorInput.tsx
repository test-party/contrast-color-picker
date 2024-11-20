import React, { useState, useEffect } from "react";
import { HsvaColor } from "../types";
import { ObjectColorInputBaseProps } from "../types";

interface HsvaInputFieldsProps extends ObjectColorInputBaseProps<HsvaColor> {
  label?: string;
}

export const HsvaColorInput = ({color, onChange, label="HSVA"}: HsvaInputFieldsProps): JSX.Element => {
  const [inputValues, setInputValues] = useState({
    h: color.h.toString(),
    s: color.s.toString(),
    v: color.v.toString(),
    a: color.a.toString(),
  })

  useEffect(() => {
    setInputValues(prev => {
      if (
        prev.h === color.h.toString() &&
        prev.s === color.s.toString() &&
        prev.v === color.v.toString() &&
        prev.a === color.a.toString()
      ) {
        return prev
      }
      return {
        h: color.h.toString(),
        s: color.s.toString(),
        v: color.v.toString(),
        a: color.a.toString(),
      }
    })
  }, [color])

  const handleInputChange = (field: keyof HsvaColor) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setInputValues(prevValues => ({
      ...prevValues,
      [field]: value,
    }))
  }

  const handleInputBlur = (field: keyof HsvaColor) => () => {
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

  const handleKeyDown = (field: keyof HsvaColor) => (event: React.KeyboardEvent<HTMLInputElement>) => {
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
          value={inputValues.v}
          onChange={handleInputChange('v')}
          onBlur={handleInputBlur('v')}
          onKeyDown={handleKeyDown('v')}
          aria-label="Value"
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