# AsuniCam

Asuni minimalist webcam viewer, powered by [Electron](https://electronjs.org)

## Usage

The first time, if there are more than one camera, a simple list with the detected devices will be shown. Just use numbers (1-9) to select the video output. Its ID will be stored at %APPDATA%/asunicam/config.json.

If you delete this file the software will ask you again when detected multiple video inputs. Anyway you can change the input using numbers (1-9) at any time if the devices are still plugged. When you select a device, the configuration file is updated, so the next time you execute the app the last video device will be used.

Just quit the app with ESCAPE key.

## Prerequisites for compile

- Install [Node.js](https://nodejs.org) (You can use also: *scoop install nodejs*)

## Quick compile & run

At the project root do:

```cli
npm install
npm start
```

## Prerequisites for development

Use npm to install following development dependencies (project root). I used Visual Code for debugging.

```cli
npm i -D electron@latest
npm install --save electron-config
```

## Build standalone executable

You need all development prerequisites plus *electron-packager*, install it. The -g option will enable the packager be executed from command line.

```cli
npm install electron-packager -g
```

### Build on all Platforms

```cli
electron-packager ./ AsuniCam --platform=all --arch=all --electron-version=2.0.0
```

### Build on Windows (32bit and 64bit)

```cli
electron-packager ./ AsuniCam --platform=win32 --arch=ia32 --electron-version=2.0.0
```

```cli
electron-packager ./ AsuniCam --platform=win32 --arch=x64 --electron-version=2.0.0
```

### Build on Darwin (OS X 64bit)

```cli
electron-packager ./ AsuniCam --platform=darwin --arch=all --electron-version=2.0.0
```

### Build on Linux (32bit and 64bit)

```cli
electron-packager ./ AsuniCam --platform=linux --arch=ia32 --electron-version=2.0.0
```

```cli
electron-packager ./ AsuniCam --platform=linux --arch=x64 --electron-version=2.0.0
```
