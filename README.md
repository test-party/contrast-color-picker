# Contrast Color Picker

<div>
  <video 
      className="mx-auto"
      width={200}
      height={400}
      controls
  >
      <source src="./demo/src/assets/b7i1.mp4" type="video/mp4"/>
      Sorry, your browser doesn&apos;t support embedded videos, but don&apos;t worry, you can <a href="https://d31ciebpn5k6y.cloudfront.net/blog/b7i1.mp4">download it</a>.
  </video>
  <p className="sr-only">
      Video showing a contrast color picker cycling through colors to highlight passing and failing WCAG contrast ratios.
  </p>
</div>

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-0.0.1-green.svg)

A fork of [react-colorful](https://github.com/omgovich/react-colorful) enhanced with built-in color contrast detection to ensure accessibility compliance according to WCAG guidelines.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Basic Example](#basic-example)
- [Components](#components)
- [API](#api)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Color accessibility is crucial for creating inclusive web applications. The Contrast Color Picker extends the popular react-colorful library by adding color contrast detection functionality. This ensures that selected color combinations meet the WCAG guidelines for color contrast. Specifically, we follow a minimum contrast ratio of 4.5:1 to ensure compliance with WCAG AA level standards, enhancing the readability and usability of your applications.

## Features

- **Multiple Color Formats**: Supports Hex, RGB, RGBA, HSL, HSLA, HSV, HSVA, and their string equivalents.
- **Built-in Contrast Analysis**: Automatically calculates the contrast ratio between foreground and background colors to determine compliance with WCAG guidelines.
- **Easy Integration**: Simple API to integrate color pickers into your React applications with minimal setup.
- **Customizable**: Pass in background colors and handle color changes seamlessly.

## Installation

### Using npm

```bash
npm install @test-party/contrast-color-picker
```

### Using Yarn

```bash
yarn add @test-party/contrast-color-picker
```

> **Note:** Ensure that you have the necessary peer dependencies installed (`react` and `react-dom`).

## Usage

To utilize the Contrast Color Picker in your React application, follow the example below. This demonstrates how to integrate various color picker components with contrast analysis.

### Basic Example

```jsx
import { useState } from 'react';
import { HexColorPicker } from '@test-party/contrast-color-picker';

function App() {
  const [hexForegroundColor, setHexForegroundColor] = useState("#000000");
  const [hexBackgroundColor, setHexBackgroundColor] = useState("#ffffff");

  return (
    <div>
      <h1>Testing @test-party/contrast-color-picker</h1>

      <h2>Hex</h2>
      <HexColorPicker 
        color={hexForegroundColor} 
        onChange={setHexForegroundColor} 
        backgroundColor={hexBackgroundColor}
      />

    </div>
  );
}

export default App;
```

## Components

The Contrast Color Picker offers a variety of components tailored to different color formats. Each component requires the following props:

- `color`: The current color value.
- `onChange`: Function to handle color changes.
- `backgroundColor`: The background color against which contrast is calculated.

### Available Components

- **HexColorPicker**
- **HexAlphaColorPicker**
- **RgbColorPicker**
- **RgbaColorPicker**
- **HslColorPicker**
- **HslaColorPicker**
- **HsvColorPicker**
- **HsvaColorPicker**
- **RgbStringColorPicker**
- **RgbaStringColorPicker**
- **HslStringColorPicker**
- **HslaStringColorPicker**
- **HsvStringColorPicker**
- **HsvaStringColorPicker**

## API

### Props

Each color picker component accepts the following props:

- **`color`** (`string` | `object`): The current color value. The type depends on the color format (e.g., hex string, RGB object).
- **`onChange`** (`function`): Callback function that receives the updated color value.
- **`backgroundColor`** (`string` | `object`): The background color used for contrast analysis.

### Example

```jsx
<HexColorPicker 
  color="#ff0000" 
  onChange={(newColor) => setColor(newColor)} 
  backgroundColor="#ffffff"
/>
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/YourFeature`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/YourFeature`.
5. Open a pull request.

Please ensure your code follows the existing style and passes all tests.

## License

This project is licensed under the [MIT License](LICENSE).

# Getting Started

To get started with the Contrast Color Picker, follow the installation instructions above and integrate the desired color picker components into your React application as demonstrated in the usage example.

For more detailed information, refer to the [React Colorful](https://github.com/omgovich/react-colorful) documentation, as this package builds upon its foundation with added accessibility features.

# Support

If you encounter any issues or have questions, feel free to open an issue in the repository or reach out to the maintainer.
