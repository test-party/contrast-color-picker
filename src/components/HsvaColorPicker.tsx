import React from "react";

import { AlphaColorPicker } from "./common/AlphaColorPicker";
import { HsvaInputFields } from "./common/HsvaInputFields";
import { ColorModel, ColorPickerBaseProps, HsvaColor } from "../types";
import { equalColorObjects } from "../utils/compare";
import { roundHsva } from "../utils/convert";

const colorModel: ColorModel<HsvaColor> = {
  defaultColor: { h: 0, s: 0, v: 0, a: 1 },
  defaultBackgroundColor: { h: 0, s: 0, v: 100, a: 1 },
  toHsva: (hsva) => hsva,
  fromHsva: roundHsva,
  equal: equalColorObjects,
};

export const HsvaColorPicker = (props: Partial<ColorPickerBaseProps<HsvaColor>>): JSX.Element => (
  <AlphaColorPicker {...props} colorModel={colorModel}>
    {
      (props.color && props.onChange) 
      &&
      <HsvaInputFields color={props.color} onChange={props.onChange} />
    }
  </AlphaColorPicker>
);
