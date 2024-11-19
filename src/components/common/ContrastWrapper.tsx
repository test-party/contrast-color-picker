import React, { useState, useEffect } from "react";

import { HsvaColor } from "../../types";
import chroma from "chroma-js";

interface ContrastWrapperProps {
  foregroundColor: HsvaColor;
  backgroundColor: HsvaColor;
  children: React.ReactNode;
}

export const ContrastWrapper = ({ children, foregroundColor, backgroundColor }: ContrastWrapperProps): JSX.Element => {
  const [contrastRatio, setContrastRatio] = useState<number>(0)
  const [pass, setPass] = useState<boolean>(false)

  const hsvaToChromaColor = (hsva: HsvaColor): chroma.Color => {
    const { h, s, v, a } = hsva
    return chroma.hsv(h, s / 100, v / 100).alpha(a)
  }

  const blendColors = (fg: chroma.Color, bg: chroma.Color): chroma.Color => {
    const alpha = fg.alpha()
    const fgRgb = fg.rgb()
    const bgRgb = bg.rgb()
    const blendedRgb = fgRgb.map((channel, i) => {
      return channel * alpha + bgRgb[i] * (1 - alpha)
    })
    return chroma(blendedRgb)
  }

  const getContrastCompliance = (ratio: number): { level: string; pass: boolean } => {
    if (ratio >= 7) return { level: 'AAA (Highest)', pass: true }
    if (ratio >= 4.5) return { level: 'AA (Good)', pass: true }
    if (ratio >= 3) return { level: 'AA (Large Text)', pass: true }
    return { level: 'Fail', pass: false }
  }

  useEffect(() => {
    const foregroundColorChroma = hsvaToChromaColor(foregroundColor)
    const backgroundColorChroma = hsvaToChromaColor(backgroundColor)

    const blendedForeground = blendColors(foregroundColorChroma, backgroundColorChroma)
    const ratio = chroma.contrast(blendedForeground, backgroundColorChroma)
    const { level, pass } = getContrastCompliance(ratio)

    setContrastRatio(ratio)
    setPass(pass)

  }, [foregroundColor, backgroundColor])

  return (
    <div className="contrast-color-picker">
      <div className="color-picker-container">
        {children}
      </div>

      <div className="contrast-analysis">
        <div className={`contrast-analysis-section ${pass ? 'result-pass' : 'result-fail'}`}>
          <span>Contrast Ratio</span>
          <p>{pass ? 'Pass' : 'Fail'}</p>
        </div>
      </div>
    </div>
  )
}