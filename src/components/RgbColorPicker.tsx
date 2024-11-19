import React from "react";

import { ColorPicker } from "./common/ColorPicker";
import { ColorModel, ColorPickerBaseProps, RgbColor } from "../types";
import { equalColorObjects } from "../utils/compare";
import { rgbaToHsva, hsvaToRgba, rgbaToRgb } from "../utils/convert";
import { RgbColorInput } from "./RgbColorInput";

const colorModel: ColorModel<RgbColor> = {
  defaultColor: { r: 0, g: 0, b: 0 },
  defaultBackgroundColor: { r: 255, g: 255, b: 255 },
  toHsva: ({ r, g, b }) => rgbaToHsva({ r, g, b, a: 1 }),
  fromHsva: (hsva) => rgbaToRgb(hsvaToRgba(hsva)),
  equal: equalColorObjects,
};

export const RgbColorPicker = (props: Partial<ColorPickerBaseProps<RgbColor>>): JSX.Element => (
  <ColorPicker {...props} colorModel={colorModel}>
    {
      (props.color && props.onChange) 
      &&
      <RgbColorInput color={props.color} onChange={props.onChange} />
    }
  </ColorPicker>
);
