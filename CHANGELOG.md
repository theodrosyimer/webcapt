# Changelog

## [1.1.3](https://github.com/theodrosyimer/webcapt/compare/1.1.2...1.1.3) (2026-04-25)

## [1.1.2](https://github.com/theodrosyimer/webcapt/compare/1.1.1...1.1.2) (2026-04-25)

### 🐛 Bug Fixes

* remove deprecated brace-expansion and update minimatch version ([26a2a8a](https://github.com/theodrosyimer/webcapt/commit/26a2a8a1ffc3414976b997bd75bbd056401a02fc))
* remove deprecated js-yaml ([d0e26c8](https://github.com/theodrosyimer/webcapt/commit/d0e26c8aa50aa7beb2dcb1cd00d9e3b5aa81db87))
* remove deprecated tar-fs dependency from overrides ([37b2912](https://github.com/theodrosyimer/webcapt/commit/37b2912d5df61e7beb6f2b5540a342d3e37bf12a))
* update conventional-changelog parser version and remove deprecated picomatch dependency ([b3eb5c6](https://github.com/theodrosyimer/webcapt/commit/b3eb5c6cfe9f5f08741aca4431b7a7f771755cf4))

## [1.1.1](https://github.com/theodrosyimer/webcapt/compare/1.1.0...1.1.1) (2026-04-25)

### 🐛 Bug Fixes

* replace shx with rimraf for cleaning dist directory ([c302134](https://github.com/theodrosyimer/webcapt/commit/c30213401ec9b4f557772b3b66b24d0b787f13d1))

## [1.1.0](https://github.com/theodrosyimer/webcapt/compare/1.0.9...1.1.0) (2026-04-25)

### ✨ Features

* add Prettier configuration file for code formatting ([cfefcdb](https://github.com/theodrosyimer/webcapt/commit/cfefcdb0f337313c233c34c83597db95d640697d))

### 🐛 Bug Fixes

* **eslint:** update project path in parserOptions to use tsconfig.json ([442003f](https://github.com/theodrosyimer/webcapt/commit/442003f54a504d949c426e130141dcc2feef787b))
* **generateImage:** set default screenshot path to 'screenshot.png' ([2db7c99](https://github.com/theodrosyimer/webcapt/commit/2db7c991c154886762a5c182f03acfed7f08327d))
* **generatePDF:** set default PDF output path to 'output.pdf' ([284a270](https://github.com/theodrosyimer/webcapt/commit/284a2707103649717c5cca126d1ccc60999f54ce))
* **package.json:** update lint script to automatically fix issues and add ts:check script ([03c5781](https://github.com/theodrosyimer/webcapt/commit/03c57811f059b1ab696dd850960bf5f46b11aa61))
* remove default output filename for screenshots and PDFs ([6025394](https://github.com/theodrosyimer/webcapt/commit/602539435a3bbaf71f4c0a1e1f8f37a904bf1071))
* remove languageOptions from ESLint configuration ([e219cdd](https://github.com/theodrosyimer/webcapt/commit/e219cdd6c88b85c887be8523092d95b8b049df37))
* remove type assertion for userInput in screenshotOptions ([f4400f8](https://github.com/theodrosyimer/webcapt/commit/f4400f8c3c16ab40f6f09e3676f03517c6b64354))

### 💎 Style Changes

* format files ([b3f7318](https://github.com/theodrosyimer/webcapt/commit/b3f73186a4110896baf08c38e1dcbc209050bfba))

### ♻️ Code Refactoring

* simplify parameter handling in pdf and img methods ([671b80a](https://github.com/theodrosyimer/webcapt/commit/671b80abb8bba95444626afe9e063d8e318871d2))

## [1.0.9](https://github.com/theodrosyimer/webcapt/compare/1.0.8...1.0.9) (2026-02-13)

## [1.0.8](https://github.com/theodrosyimer/webcapt/compare/1.0.7...1.0.8) (2026-02-13)

## [1.0.7](https://github.com/theodrosyimer/webcapt/compare/1.0.6...1.0.7) (2026-02-13)

## [1.0.6](https://github.com/theodrosyimer/webcapt/compare/1.0.5...1.0.6) (2026-02-13)

### 📚 Documentation

- **README:** remove deprecated flags section and clean up comments ([8c42dbc](https://github.com/theodrosyimer/webcapt/commit/8c42dbca612aea06bebca96b122188ef82991dec))

### ♻️ Code Refactoring

- **generateImage:** rename screenshotOptions to options for consisency ([073a9b9](https://github.com/theodrosyimer/webcapt/commit/073a9b968895f60066d7b553a0be51edb11e8568))
- **generatePdf:** rename pdfOptions to options for consistency ([c61c05e](https://github.com/theodrosyimer/webcapt/commit/c61c05edf04e846bc89630e65ff619a82826b793))
- **webcapt:** destructure function parameters ([c8039fb](https://github.com/theodrosyimer/webcapt/commit/c8039fbb3204dbd54ebcb1d7a49e7f6bec358a99))

## [1.0.5](https://github.com/theodrosyimer/webcapt/compare/1.0.4...1.0.5) (2025-08-25)

### 💎 Style Changes

- **tests:** clean up ([6195b10](https://github.com/theodrosyimer/webcapt/commit/6195b10790e7f17932e0f0121d04255c30b469e9))

## [1.0.4](https://github.com/theodrosyimer/webcapt/compare/1.0.3...1.0.4) (2025-08-25)

### 🐛 Bug Fixes

- **package:** remove postinstall script ([52899a7](https://github.com/theodrosyimer/webcapt/commit/52899a756f6463a416356a114acca67d10bb8b07))
- **release-it:** disable npm publish ([1201c22](https://github.com/theodrosyimer/webcapt/commit/1201c2264bb0bbb9a9a1962c40a93a4e007ea68c))
- **release-it:** fix configuration for release process ([17acbcd](https://github.com/theodrosyimer/webcapt/commit/17acbcd4b601001c09fa2378727249624dcc2c74))
- **release-it:** fix link ([7be633f](https://github.com/theodrosyimer/webcapt/commit/7be633f1c5564a063fa32b8ddda64e9b8b00a972))
- **release-it:** remove release notes ([894c03f](https://github.com/theodrosyimer/webcapt/commit/894c03f4948cdd156a2b7d730874f24ef85a12d0))
- **release-it:** simplify markdown links ([c6a7b91](https://github.com/theodrosyimer/webcapt/commit/c6a7b91cf570b8a70ca3e1a08b4472d48e748e8d))
- **release-it:** update changelog header ([b94d611](https://github.com/theodrosyimer/webcapt/commit/b94d611119f5470f890cfe20064cb5e53f7b2293))
- **release-it:** update markdown links ([865b7e9](https://github.com/theodrosyimer/webcapt/commit/865b7e9dae3b32165436306f1400e9d0afc8c340))
- **release-it:** update verification link ([44217ee](https://github.com/theodrosyimer/webcapt/commit/44217eeb017c1ca000d3a64beec09d99b4dab66a))
- **release:** adjust release command for CI ([456e153](https://github.com/theodrosyimer/webcapt/commit/456e153584ebb016b17ec07eb6ad69bbe1622fe6))
- **release:** update release-it and workflow steps ([8df865c](https://github.com/theodrosyimer/webcapt/commit/8df865cea506b7b0deca21d272e4c11314fafef4))
- **tests:** remove unnecessary timeout parameters ([be86bf5](https://github.com/theodrosyimer/webcapt/commit/be86bf5bc516158c709f8f6e268a453ed046b83a))
