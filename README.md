# webcapt - CLI for web capture

<details open><summary>Table of Contents</summary>

- [Motivation](#motivation)
- [Prerequisites](#prerequisites)
- [Quick start](#quick-start)
  - [Install](#install)
- [Usage](#usage)
  - [Examples](#examples)
- [Contribute](#contribute)
  - [Clone the repo](#clone-the-repo)
  - [Install dependencies](#install-dependencies)
  - [Develop](#develop)
  - [Build the project and link locally for development](#build-the-project-and-link-locally-for-development)
  - [Run tests](#run-tests)
  - [Submit a pull request](#submit-a-pull-request)
- [License](#license)

</details>

## Motivation

A simple cli to screen capture web pages and save them to disk as images or pdfs.

## Prerequisites

- [Node.js](https://nodejs.org)
- [puppeteer](https://pptr.dev)

> [!IMPORTANT]
> You need to install `puppeteer` globally to use `webcapt`.
>
> ```sh
> npm install -g puppeteer
> ```

## Quick start

### Install

```sh
npm install -g webcapt
```

```sh
pnpm install -g webcapt
```

## Usage

```sh
webcapt -h
```

```sh
Usage: webcapt [options] [command]

A simple cli to screen capture web pages and save them to disk as images or pdfs.

Options:
  -V, --version   output the version number
  -h, --help      display help for command

Commands:
  pdf [options]   Screenshot the provided url and download as a pdf
  img [options]   Screenshot the provided url and download as an image
  help [command]  display help for command
```

```sh
wbecapt pdf -h
```

```sh
Usage: webcapt pdf [options]

Screenshot the provided url and download as a pdf

Options:
  -u, --url <url>        URL to download
  -o, --output <output>  Output file name
  -f, --format <format>  Format of the file to download, options: A4 or letter (default: "A4")
  -h, --help             display help for command
```

```sh
webcapt img -h
```

```sh
Usage: webcapt img [options]

Screenshot the provided url and download as an image

Options:
  -u, --url <url>        URL to download
  -o, --output <output>  Output file name
  -f, --format <format>  Format of the file to download, options: png or jpeg (default: "png")
  -h, --help             display help for command
```

<!--
Available flags:

- `-i`, `--input` - Path to input file or directory
- `-o`, `--output` - Path to output file or directory
- `-c`, `--config` - Path to config file
- `-t`, `--template` - Path to template file
- `-e`, `--env` - Environment to use
- `--env-file` - Path to environment file
- `-b`, `--base` - Base path to use
- `-r`, `--root` - Root path to use
- `-p`, `--port` - Port to use
- `-h`, `--help` - Show help
- `-v`, `--version` - Show version number
- `-d`, `--debug` - Sho9-+w debug logs
- `-f`, `--force` - Force overwrite of output file
- `-q`, `--quiet` - Show only errors
- `-s`, `--silent` - No output at all
- `--ext` - File extension to use -->

### Examples

> Note: For pdfs and images, you don't need to specify the file's extension if you want to download to a format other than the default, you can use the `-f` flag and specify the file's format.

```sh
webcapt pdf -u https://google.com -o example
```

If you want to download an image in jpeg format:

```sh
webcapt img -u https://google.com -o example -f jpeg
```

If you want to download a pdf in letter format:

```sh
webcapt pdf -u https://google.com -o example -f letter
```

## Contribute

### Clone the repo

```sh
git clone https://github.com/theodrosyimer/webcapt@latest
cd webcapt
```

### Install dependencies

```sh
pnpm install
```

### Develop

```sh
pnpm dev
```

**reset the local link**

```sh
pnpm dev:reset
```

### Build the project and link locally for development

```sh
pnpm build-link
```

### Run tests

**Unit tests**
```sh
pnpm test
```

**Integration tests**

```sh
pnpm run test:int
```

**End to end tests**

```sh
pnpm run test:e2e
```

**Full test suite**

```sh
pnpm run test:all
```

### Submit a pull request

If you'd like to contribute code, documentation, or any other improvements, please [fork the project](https://gihub.com/theodrosyimer/webcapt/fork), make your changes, and submit a pull request.

If you're unsure about adding a feature or fixing a bug, create an issue to discuss it first.

<!-- ## Related -->

## License

MIT © [Theodros Yimer](https://github.com/theodrosyimer)
