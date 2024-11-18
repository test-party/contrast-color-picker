import React, { useState, useEffect } from "react";
import { HsvaColor } from "../../types";

interface HsvaInputFieldsProps {
  hsva: HsvaColor;
  onChange: (newHsva: HsvaColor) => void;
  label?: string;
}

export const HsvaInputFields = ({ hsva, onChange, label }: HsvaInputFieldsProps): JSX.Element => {
  const [inputValues, setInputValues] = useState({
    h: hsva.h.toString(),
    s: hsva.s.toString(),
    v: hsva.v.toString(),
    a: hsva.a.toString(),
  })

  useEffect(() => {
    setInputValues(prev => {
      if (
        prev.h === hsva.h.toString() &&
        prev.s === hsva.s.toString() &&
        prev.v === hsva.v.toString() &&
        prev.a === hsva.a.toString()
      ) {
        return prev
      }
      return {
        h: hsva.h.toString(),
        s: hsva.s.toString(),
        v: hsva.v.toString(),
        a: hsva.a.toString(),
      }
    })
  }, [hsva])

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
        [field]: hsva[field].toString(),
      }))
      return
    }

    let min = 0
    let max = 100
    if (field === 'h') max = 360
    if (field === 'a') max = 1

    const clampedValue = Math.max(min, Math.min(max, parsedValue))
    onChange({ ...hsva, [field]: clampedValue })
  }

  const handleKeyDown = (field: keyof HsvaColor) => (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleInputBlur(field)()
    }
  }

  return (
    <div className="input-fields">
      <span>{label || 'HSVA'}</span>
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