import React from "react";

import { ColorPicker } from "./common/ColorPicker";
import { ColorModel, ColorPickerBaseProps } from "../types";
import { equalColorString } from "../utils/compare";
import { hsvStringToHsva, hsvaToHsvString } from "../utils/convert";
import { HsvStringColorInput } from "./HsvStringColorInput";

const colorModel: ColorModel<string> = {
  defaultColor: "hsv(0, 0%, 0%)",
  defaultBackgroundColor: "hsv(0, 0%, 100%)",
  toHsva: hsvStringToHsva,
  fromHsva: hsvaToHsvString,
  equal: equalColorString,
};

export const HsvStringColorPicker = (props: Partial<ColorPickerBaseProps<string>>): JSX.Element => (
  <ColorPicker {...props} colorModel={colorModel}>
    <HsvStringColorInput {...props} label="HSV" />
  </ColorPicker>
);
