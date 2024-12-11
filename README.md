<div align="center">

<h1>forex-cli</h1>

[![NodeJS][node-image]][node-url]
[![Install Size][install-size-image]][install-size-url]
[![NPM][npm-image]][npm-url]
[![code style][code-style-image]][code-style-url]
[![License][license-image]][license-url]

English | [简体中文][zh-cn-url]

![Insights][insights-image]

<img width="814" src="docs/images/usage.en-US.png" alt="usage-png">

</div>

## 📖 Introduction

A Node.js Library to convert foreign exchange in terminal.

## ⚙️ Installation

```bash
npm install --global @kabeep/forex-cli
```

```bash
yarn add --global @kabeep/forex-cli
```

```bash
pnpm add --global @kabeep/forex-cli
```

## 🚀 Usage

```
forex [options] <amount>

Options:
  -f, --from     The base currency code or locale code[string] [default: "auto"]
  -t, --to       The base currency code or locale code[string] [default: "auto"]
  -d, --date     The date for the conversion rate, or "latest" for the most rece
                 nt                                 [string] [default: "latest"]
      --timeout  Request timeout (milliseconds)         [number] [default: 5000]
  -v, --version  Show version number                                   [boolean]
  -h, --help     Show help                                             [boolean]

Examples:
  forex -t USD                   Currency codes using ISO 4217
  forex -t US                    Use locale codes from ISO 3166-1
  -------
  forex -f USD -t EUR            Specify base and target currencies
  forex -f USD                   Specify one of the currencies and aut
                                           omatically fill in the other currency
                                            through the terminal area settings
  forex -t USD                   Specify one of the currencies and aut
                                           omatically fill in the other currency
                                            through the terminal area settings
  -------
  forex -t US -d 2024-12-01      Use the exchange rate for the specifi
                                           ed date
  forex -t US -d "Dec 01, 2024"  Use the exchange rate for the specifi
                                           ed date
  -------
  forex -t US --timeout 30000    Set request timeout
```

## 🌐 i18n

| Language Name      | Native Name | ISO-639-1 | ISO-3166-1 (Alpha-2) | Locale File                  |
|:-------------------|:-----------:|:---------:|:--------------------:|:-----------------------------|
| English            |      -      |    en     |          US          | [en-US.ts][locale-en-us-url] |
| Chinese Simplified |    简体中文     |    zh     |          CN          | [zh-CN.ts][locale-zh-cn-url] |

## 🔗 Related

- [forex][forex-url] - 💱 A JavaScript foreign exchange library via `fawazahmed0`'s API.

## 🤝 Contribution

Contributions via Pull Requests or [Issues][issues-url] are welcome.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE][license-url] file for details.


[insights-image]: https://repobeats.axiom.co/api/embed/a0e4d0ae3edced5fd9a045527c7eef9aecfb6c0d.svg "Repobeats analytics image"

[node-image]: https://img.shields.io/node/v/%40kabeep%2Fforex-cli?color=lightseagreen
[node-url]: https://nodejs.org/

[npm-image]: https://img.shields.io/npm/d18m/%40kabeep%2Fforex-cli?color=fa6673
[npm-url]: https://www.npmjs.com/package/@kabeep/forex-cli

[install-size-image]: https://packagephobia.com/badge?p=@kabeep/forex-cli
[install-size-url]: https://packagephobia.com/result?p=@kabeep/forex-cli

[code-style-image]: https://img.shields.io/badge/Formatted_with-Biome-cornflowerblue?style=flat&logo=biome
[code-style-url]: https://biomejs.dev/

[license-image]: https://img.shields.io/github/license/kabeep/forex-cli?color=slateblue
[license-url]: LICENSE

[en-us-url]: README.md
[zh-cn-url]: README.zh-CN.md

[locale-en-us-url]: src/locale/en-US.ts
[locale-zh-cn-url]: src/locale/zh-CN.ts

[forex-url]: https://github.com/kabeep/forex

[issues-url]: https://github.com/kabeep/forex-cli/issues
