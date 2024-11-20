import React from "react";

import { ColorPicker } from "./common/ColorPicker";
import { ColorModel, ColorPickerBaseProps } from "../types";
import { equalColorString } from "../utils/compare";
import { hslStringToHsva, hsvaToHslString } from "../utils/convert";
import { HslStringColorInput } from "./HslStringColorInput";

const colorModel: ColorModel<string> = {
  defaultColor: "hsl(0, 0%, 0%)",
  defaultBackgroundColor: "hsl(0, 0%, 100%)",
  toHsva: hslStringToHsva,
  fromHsva: hsvaToHslString,
  equal: equalColorString,
};

export const HslStringColorPicker = (props: Partial<ColorPickerBaseProps<string>>): JSX.Element => (
  <ColorPicker {...props} colorModel={colorModel}>
    <HslStringColorInput {...props} label="HSL" />
  </ColorPicker>
);
