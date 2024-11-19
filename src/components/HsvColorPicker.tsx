import React from "react";

import { ColorPicker } from "./common/ColorPicker";
import { ColorModel, ColorPickerBaseProps, HsvColor } from "../types";
import { equalColorObjects } from "../utils/compare";
import { hsvaToHsv } from "../utils/convert";
import { HsvColorInput } from "./HsvColorInput";

const colorModel: ColorModel<HsvColor> = {
  defaultColor: { h: 0, s: 0, v: 0 },
  defaultBackgroundColor: { h: 0, s: 0, v: 100 },
  toHsva: ({ h, s, v }) => ({ h, s, v, a: 1 }),
  fromHsva: hsvaToHsv,
  equal: equalColorObjects,
};

export const HsvColorPicker = (props: Partial<ColorPickerBaseProps<HsvColor>>): JSX.Element => (
  <ColorPicker {...props} colorModel={colorModel}>
    {
      (props.color && props.onChange) 
      &&
      <HsvColorInput color={props.color} onChange={props.onChange} />
    }
  </ColorPicker>
);
