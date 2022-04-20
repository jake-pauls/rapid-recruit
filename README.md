<p align="center">
    <img src="./ext/public/RapidRecruit.png" alt="RapidRecruit" />
</p>
<p align="center">
    <font size="5"><strong>RapidRecruit  📈</strong></font><br />
    <em>Created by: Paul Cavallo, June Ka, and Jake Pauls</em>
</p>
<p align="center">
    <img src="https://img.shields.io/badge/Built%20for-chrome-orange" />
    <img src="https://img.shields.io/badge/Go-v1.18-%23007d9c" />
    <img src="https://img.shields.io/badge/node-v17.9.0-brightgreen" />
</p>

### Overview

RapidRecruit is a tool that seeks to extend, improve, and innovate upon a modern recruiting workflow.

As a Chrome extension, RapidRecruit instantly provides a handful of potential recruits based on keywords entered by the user.

### Installation and Use

1. Clone this repository

```
$ git clone git@github.com:jake-pauls/rapid-recruit.git
```

2. Pull node dependencies (yarn)

```
$ yarn
```

3. Run frontend and backend

```
$ cd ext && yarn dev
$ cd scp && go run .
```

4. Open Google Chrome > Navigate to *"chrome://extensions"* > Click *"Load Unpacked"* > Open the `manifest.json` file in the `ext/build` folder

**Note:** If any manifest other than the build version is added, the extension may not work as intended.

### Note on Use
Please note that this extension was purely a proof-of-concept that was created **purely** for educational purposes only.
