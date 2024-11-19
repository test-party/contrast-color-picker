import React, { useRef } from "react";

import { Hue } from "./Hue";
import { Saturation } from "./Saturation";
import { Alpha } from "./Alpha";

import { ColorModel, ColorPickerBaseProps, AnyColor } from "../../types";
import { useColorManipulation } from "../../hooks/useColorManipulation";
import { useStyleSheet } from "../../hooks/useStyleSheet";
import { formatClassName } from "../../utils/format";
import { ContrastWrapper } from "./ContrastWrapper";

interface Props<T extends AnyColor> extends Partial<ColorPickerBaseProps<T>> {
  colorModel: ColorModel<T>;
  children?: React.ReactNode;
}

export const AlphaColorPicker = <T extends AnyColor>({
  className,
  colorModel,
  color = colorModel.defaultColor,
  backgroundColor = colorModel.defaultBackgroundColor,
  children,
  onChange,
  ...rest
}: Props<T>): JSX.Element => {
  const nodeRef = useRef<HTMLDivElement>(null);
  useStyleSheet(nodeRef);

  const [hsva, updateHsva] = useColorManipulation<T>(colorModel, color, onChange);
  const [backgroundHsva, updateBackgroundHsva] = useColorManipulation<T>(colorModel, backgroundColor, onChange);

  const nodeClassName = formatClassName(["react-colorful", className]);

  return (
    <ContrastWrapper foregroundColor={hsva} backgroundColor={backgroundHsva}>
      <div {...rest} ref={nodeRef} className={nodeClassName}>
        <Saturation hsva={hsva} onChange={updateHsva} />
        <Hue hue={hsva.h} onChange={updateHsva} />
        <Alpha hsva={hsva} onChange={updateHsva} className="react-colorful__last-control" />
      </div>
      { children }
    </ContrastWrapper>
  );
};
