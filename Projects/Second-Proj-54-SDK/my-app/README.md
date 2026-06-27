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

## Якщо не працює SignalR на сервері default nginx
```
server {
server_name   p32-native.itstep.click *.p32-native.itstep.click;
client_max_body_size 250M;
location / {
        proxy_pass         http://localhost:4384;
        proxy_http_version 1.1;
  
        # SignalR / WebSocket
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";

        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;

        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # важливо для SignalR
        proxy_read_timeout 86400;
        proxy_send_timeout 86400;
    }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/p32-native.itstep.click/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/p32-native.itstep.click/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

}
```

## Build Android release APK

### Steps (Windows PowerShell)

1. **Install JS dependencies**

   ```powershell
   npm install
   ```

2. **Create android folder**

```powershell
   npx expo prebuild --clean
   ```

3. **Change android/build.gradle**

   ```
   buildscript {
    repositories {
    google()
    mavenCentral()
    }
    dependencies {
    classpath("com.android.tools.build:gradle:8.5.0")
    classpath("com.facebook.react:react-native-gradle-plugin")
    classpath("org.jetbrains.kotlin:kotlin-gradle-plugin:1.9.24")
    }
    }
    
    allprojects {
    repositories {
    google()
    mavenCentral()
    maven { url 'https://www.jitpack.io' }
    }
    }
    
    apply plugin: "expo-root-project"
    apply plugin: "com.facebook.react.rootproject"
   ```

4. **Change android/gradle.properties**

    ```
   # Project-wide Gradle settings.
    # IDE (e.g. Android Studio) users:
    # Gradle settings configured through the IDE *will override*
    # any settings specified in this file.
    
    # For more details on how to configure your build environment visit
    # http://www.gradle.org/docs/current/userguide/build_environment.html
    
    # Specifies the JVM arguments used for the daemon process.
    # The setting is particularly useful for tweaking memory settings.
    # Default value: -Xmx512m -XX:MaxMetaspaceSize=256m
    org.gradle.jvmargs=-Xmx2048m -XX:MaxMetaspaceSize=512m
    
    # When configured, Gradle will run in incubating parallel mode.
    # This option should only be used with decoupled projects. More details, visit
    # http://www.gradle.org/docs/current/userguide/multi_project_builds.html#sec:decoupled_projects
    org.gradle.parallel=true
    
    # AndroidX package structure to make it clearer which packages are bundled with the
    # Android operating system, and which are packaged with your app's APK
    # https://developer.android.com/topic/libraries/support-library/androidx-rn
    android.useAndroidX=true
    
    # Enable AAPT2 PNG crunching
    android.enablePngCrunchInReleaseBuilds=true
    
    # Use this property to specify which architecture you want to build.
    # You can also override it from the CLI using
    # ./gradlew <task> -PreactNativeArchitectures=x86_64
    reactNativeArchitectures=arm64-v8a
    
    # Use this property to enable support to the new architecture.
    # This will allow you to use TurboModules and the Fabric render in
    # your application. You should enable this flag either if you want
    # to write custom TurboModules/Fabric components OR use libraries that
    # are providing them.
    newArchEnabled=true
    
    # Use this property to enable or disable the Hermes JS engine.
    # If set to false, you will be using JSC instead.
    hermesEnabled=true
    
    # Use this property to enable edge-to-edge display support.
    # This allows your app to draw behind system bars for an immersive UI.
    # Note: Only works with ReactActivity and should not be used with custom Activity.
    edgeToEdgeEnabled=true
    
    # Enable GIF support in React Native images (~200 B increase)
    expo.gif.enabled=true
    # Enable webp support in React Native images (~85 KB increase)
    expo.webp.enabled=true
    # Enable animated webp support (~3.4 MB increase)
    # Disabled by default because iOS doesn't support animated webp
    expo.webp.animated=false
    
    # Enable network inspector
    EX_DEV_CLIENT_NETWORK_INSPECTOR=true
    
    # Use legacy packaging to compress native libraries in the resulting APK.
    expo.useLegacyPackaging=false
    
    # Specifies whether the app is configured to use edge-to-edge via the app config or plugin
    # WARNING: This property has been deprecated and will be removed in Expo SDK 55. Use `edgeToEdgeEnabled` or `react.edgeToEdgeEnabled` to determine whether the project is using edge-to-edge.
    expo.edgeToEdgeEnabled=true
    
    android.ndkVersion=26.1.10909125
   ```

5. **Build APK**
    ```
   cd android
   .\gradlew clean 
   .\gradlew assembleRelease
   android\app\build\outputs\apk\release\app-release.apk
   ```
## ПІСЛЯ BUILD PRODACTION Є ПРОБЛЕМА
```
Краще відкоити файли app.json та package.json
```