# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

# Install Expo 54
```
npm install nativewind
npm install --save-dev tailwindcss
npm install tailwindcss
npx tailwindcss init
```

## tailwind.config.js
```
/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#00D09E',
        'primary-light': '#F4FFF8',
        'primary-button-light': '#E5F9F0',
      },
      fontFamily: {
        'poppins-regular': ['Poppins-Regular'],
        'poppins-medium': ['Poppins-Medium'],
        'poppins-semibold': ['Poppins-SemiBold'],
        'spartan-regular': ['LeagueSpartan-Regular'],
        'spartan-light': ['LeagueSpartan-Light'],
        'spartan-semibold': ['LeagueSpartan-SemiBold'],
      },
    },
  },
  plugins: [],
}
```

## Add babel.config.js
```
module.exports = function (api) {
    api.cache(true);
    return {
        presets: [
            ["babel-preset-expo", { jsxImportSource: "nativewind" }],
            "nativewind/babel",
        ],
        plugins: [
            // ВАЖЛИВО: цей плагін має бути останнім
            "react-native-reanimated/plugin",
        ],
    };
};
```


## Add metro.config.js
```
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname)

module.exports = withNativeWind(config, { input: './global.css' })
```

## Add global.css
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Add line app/_layout.tsx
```
import '../global.css';
```

## npm install babel-preset-expo --save-dev
```
npm install babel-preset-expo --save-dev
```