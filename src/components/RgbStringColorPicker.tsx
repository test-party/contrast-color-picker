import React from "react";

import { ColorPicker } from "./common/ColorPicker";
import { ColorModel, ColorPickerBaseProps } from "../types";
import { equalColorString } from "../utils/compare";
import { rgbStringToHsva, hsvaToRgbString } from "../utils/convert";
import { RgbStringColorInput } from "./RgbStringColorInput";

const colorModel: ColorModel<string> = {
  defaultColor: "rgb(0, 0, 0)",
  defaultBackgroundColor: "rgb(255, 255, 255)",
  toHsva: rgbStringToHsva,
  fromHsva: hsvaToRgbString,
  equal: equalColorString,
};

export const RgbStringColorPicker = (props: Partial<ColorPickerBaseProps<string>>): JSX.Element => (
  <ColorPicker {...props} colorModel={colorModel}>
    <RgbStringColorInput {...props} label="RGB" />
  </ColorPicker>
);
