import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import {
  HexColorInput,
  HexColorPicker,
  RgbColorPicker,
  RgbStringColorPicker,
  RgbaColorPicker,
  RgbaStringColorPicker,
  HslColorPicker,
  HslStringColorPicker,
  HslaColorPicker,
  HslaStringColorPicker,
  HsvColorPicker,
  HsvStringColorPicker,
  HsvaColorPicker,
  HsvaStringColorPicker,
} from "../src";

afterEach(cleanup);

// Fix to pass `pageX` and `pageY`
// See https://github.com/testing-library/react-testing-library/issues/268
class FakeMouseEvent extends MouseEvent {
  constructor(type, values = {}) {
    const { pageX, pageY, ...rest } = values;
    super(type, rest);

    Object.assign(this, {
      pageX: pageX || 0,
      pageY: pageY || 0,
    });
  }
}

// Mock `HTMLElement.getBoundingClientRect` to be able to read element sizes
// See https://github.com/jsdom/jsdom/issues/135#issuecomment-68191941
Object.defineProperties(HTMLElement.prototype, {
  getBoundingClientRect: {
    get: () => () => ({
      left: 5,
      top: 5,
      width: 100,
      height: 100,
    }),
  },
});

it("Renders proper color picker markup", () => {
  const result = render(<HexColorPicker color="#F00" />);

  expect(result.container.firstChild).toMatchSnapshot();
});

it("Renders proper alpha color picker markup", () => {
  const result = render(<RgbaStringColorPicker color="rgba(255, 0, 0, 0.5)" />);

  expect(result.container.firstChild).toMatchSnapshot();
});

it("Works with no props", () => {
  const result = render(<HexColorPicker />);

  expect(result.container.firstChild).toMatchSnapshot();
});

it("Accepts an additional `className`", () => {
  const result = render(<RgbColorPicker className="custom-picker" />);

  const hasClass = result.container.firstChild.classList.contains("custom-picker");
  expect(hasClass).toBe(true);
});

it("Doesn't trigger `onChange` after mounting", () => {
  const handleChange = jest.fn();
  render(<HexColorPicker color="#c62182" onChange={handleChange} />);

  expect(handleChange).not.toHaveReturned();
});

it("Doesn't trigger `onChange` after controlled rerender", () => {
  const handleChange = jest.fn();
  const { rerender } = render(<HexColorPicker color="#c62182" onChange={handleChange} />);

  rerender(<HexColorPicker color="#c72282" onChange={handleChange} />);

  expect(handleChange).not.toHaveReturned();
});

it("Doesn't call `onChange` when user changes a hue of a grayscale color", () => {
  const handleChange = jest.fn();
  const { container } = render(<HexColorPicker color="#000" onChange={handleChange} />);
  const hue = container.querySelector(".react-colorful__hue .interactive");

  fireEvent.touchStart(hue, { touches: [{ pageX: 0, pageY: 0, bubbles: true }] });
  fireEvent.touchMove(hue, { touches: [{ pageX: 100, pageY: 0, bubbles: true }] });

  expect(handleChange).not.toHaveBeenCalled();
});

it("Triggers `onChange` after a mouse interaction", async () => {
  const handleChange = jest.fn();
  const result = render(<RgbaColorPicker onChange={handleChange} />);
  const saturation = result.container.querySelector(".react-colorful__saturation .interactive");

  fireEvent(saturation, new FakeMouseEvent("mousedown", { pageX: 0, pageY: 0, bubbles: true }));
  fireEvent(saturation, new FakeMouseEvent("mousemove", { pageX: 10, pageY: 10, bubbles: true }));

  expect(handleChange).toHaveReturned();
});

it("Triggers `onChange` after a touch interaction", async () => {
  const handleChange = jest.fn((hex) => hex);
  const initialValue = { h: 0, s: 100, v: 100 };
  const result = render(<HsvColorPicker color={initialValue} onChange={handleChange} />);
  const hue = result.container.querySelector(".react-colorful__hue .interactive");

  fireEvent.touchStart(hue, { touches: [{ pageX: 0, pageY: 0, bubbles: true }] });
  fireEvent.touchMove(hue, { touches: [{ pageX: 55, pageY: 0, bubbles: true }] });

  expect(handleChange).toHaveReturnedWith({ h: 180, s: 100, v: 100 });
});

it("Changes alpha channel value after an interaction", async () => {
  const handleChange = jest.fn((hsla) => hsla);
  const initialValue = { h: 100, s: 0, l: 0, a: 0 };

  const result = render(<HslaColorPicker color={initialValue} onChange={handleChange} />);
  const alpha = result.container.querySelector(".react-colorful__alpha .interactive");

  fireEvent(alpha, new FakeMouseEvent("mousedown", { pageX: 0, pageY: 0, bubbles: true }));
  fireEvent(alpha, new FakeMouseEvent("mousemove", { pageX: 105, pageY: 0, bubbles: true }));

  expect(handleChange).toHaveReturnedWith({ h: 100, s: 0, l: 0, a: 1 });
});

// Fast clicks on mobile devices
// See https://github.com/omgovich/react-colorful/issues/55
it("Doesn't react on mouse events after a touch interaction", () => {
  const handleChange = jest.fn((hslString) => hslString);
  const result = render(<HslStringColorPicker color="hsl(100, 0%, 0%)" onChange={handleChange} />);
  const hue = result.container.querySelector(".react-colorful__hue .interactive");

  fireEvent.touchStart(hue, { touches: [{ pageX: 0, pageY: 0, bubbles: true }] }); // 1
  fireEvent.touchMove(hue, { touches: [{ pageX: 55, pageY: 0, bubbles: true }] }); // 2

  // Should be skipped
  fireEvent(hue, new FakeMouseEvent("mousedown", { pageX: 35, pageY: 0, bubbles: true })); // 3
  fireEvent(hue, new FakeMouseEvent("mousemove", { pageX: 105, pageY: 0, bubbles: true })); // 4

  expect(handleChange).toHaveReturnedTimes(2);
  expect(handleChange).toHaveReturnedWith("hsl(180, 0%, 0%)");
});

it("Captures arrow keys only", async () => {
  const handleChange = jest.fn((hex) => hex);
  const initialValue = "hsv(180, 90%, 90%)";

  const result = render(<HsvStringColorPicker color={initialValue} onChange={handleChange} />);
  const saturation = result.container.querySelector(".react-colorful__saturation .interactive");

  saturation.focus();
  const node = document.activeElement || document.body;

  fireEvent.keyDown(node, { keyCode: 36 }); // should be ignored
  fireEvent.keyDown(node, { keyCode: 37 }); // left
  fireEvent.keyDown(node, { keyCode: 40 }); // bottom

  expect(handleChange).toHaveReturnedTimes(2);
  expect(handleChange).toHaveReturnedWith("hsv(180, 85%, 85%)");

  fireEvent.keyDown(node, { keyCode: 38 }); // top
  fireEvent.keyDown(node, { keyCode: 39 }); // right
  fireEvent.keyDown(node, { keyCode: 41 }); // should be ignored

  expect(handleChange).toHaveReturnedTimes(4);
  expect(handleChange).toHaveReturnedWith(initialValue);
});

it("Changes saturation with arrow keys", async () => {
  const handleChange = jest.fn();
  const initialValue = { r: 80, g: 100, b: 120 };

  const result = render(<RgbColorPicker color={initialValue} onChange={handleChange} />);
  const hue = result.container.querySelector(".react-colorful__saturation .interactive");

  hue.focus();
  const node = document.activeElement || document.body;
  fireEvent.keyDown(node, { keyCode: 39 });
  fireEvent.keyDown(node, { keyCode: 40 });

  expect(handleChange).toHaveReturnedTimes(2);
});

it("Changes hue with arrow keys", async () => {
  const handleChange = jest.fn();
  const initialValue = { h: 180, s: 0, l: 50, a: 1 };

  const result = render(<HslColorPicker color={initialValue} onChange={handleChange} />);
  const hue = result.container.querySelector(".react-colorful__hue .interactive");

  hue.focus();
  const node = document.activeElement || document.body;
  fireEvent.keyDown(node, { keyCode: 39 }); // left

  expect(handleChange).toHaveReturnedTimes(1);
});

it("Changes alpha with arrow keys", async () => {
  const handleChange = jest.fn();
  const initialValue = { h: 180, s: 0, l: 50, a: 0.5 };

  const result = render(<HsvaColorPicker color={initialValue} onChange={handleChange} />);
  const alpha = result.container.querySelector(".react-colorful__alpha .interactive");

  alpha.focus();
  const node = document.activeElement || document.body;
  fireEvent.keyDown(node, { keyCode: 39 }); // right

  expect(handleChange).toHaveReturnedTimes(1);
});

it("Ignores keyboard commands if the pointer is already on a saturation edge", async () => {
  const handleChange = jest.fn();

  // Place pointer to the left-top corner of the saturation area
  const initialValue = "hsla(200, 0%, 100%, 1)";
  const result = render(<HslaStringColorPicker color={initialValue} onChange={handleChange} />);
  const saturation = result.container.querySelector(".react-colorful__saturation .interactive");

  saturation.focus();
  const node = document.activeElement || document.body;

  fireEvent.keyDown(node, { keyCode: 38 }); // top
  fireEvent.keyDown(node, { keyCode: 37 }); // left

  expect(handleChange).toHaveReturnedTimes(0);
});

it("Ignores keyboard commands if the pointer is already on a alpha edge", async () => {
  const handleChange = jest.fn();

  // Place pointer to the right side of the alpha area
  const initialValue = "hsva(0, 0%, 0%, 1)";
  const result = render(<HsvaStringColorPicker color={initialValue} onChange={handleChange} />);
  const saturation = result.container.querySelector(".react-colorful__alpha .interactive");

  saturation.focus();
  const node = document.activeElement || document.body;

  fireEvent.keyDown(node, { keyCode: 39 }); // right

  expect(handleChange).toHaveReturnedTimes(0);
});

it("Sets proper `aria-valuetext` attribute value", async () => {
  const handleChange = jest.fn();
  const result = render(<RgbStringColorPicker color="rgb(0, 0, 0)" onChange={handleChange} />);
  const saturation = result.container.querySelector(".react-colorful__saturation .interactive");

  expect(saturation.getAttribute("aria-valuetext")).toBe("Saturation 0%, Brightness 0%");

  fireEvent(saturation, new FakeMouseEvent("mousedown", { pageX: 0, pageY: 0, bubbles: true }));
  fireEvent(saturation, new FakeMouseEvent("mousemove", { pageX: 500, pageY: 0, bubbles: true })); // '#ff0000'

  expect(saturation.getAttribute("aria-valuetext")).toBe("Saturation 100%, Brightness 100%");
});

it("Renders `HexColorInput` component properly", () => {
  const result = render(
    <HexColorInput className="custom-input" color="#F00" placeholder="AABBCC" />
  );

  expect(result.container.firstChild).toMatchSnapshot();
});

it("Fires `onChange` when user changes `HexColorInput` value", () => {
  const handleChange = jest.fn((hex) => hex);
  const result = render(<HexColorInput onChange={handleChange} />);
  const input = result.container.firstChild;

  fireEvent.change(input, { target: { value: "112233" } });

  expect(handleChange).toHaveReturnedWith("#112233");
});

it("Fires custom `onBlur` when `HexColorInput` has lost focus", () => {
  const handleBlur = jest.fn((e) => e.target.value);
  const result = render(<HexColorInput color="#ffffff" onBlur={handleBlur} />);
  const input = result.container.firstChild;

  fireEvent.blur(input);

  expect(handleBlur).toHaveReturnedWith("ffffff");
});
