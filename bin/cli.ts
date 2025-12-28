#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import process from 'node:process';
import yargs, { type Argv } from 'yargs';
import { hideBin } from 'yargs/helpers';

import type { ConvertOptions, CurrencyOptions, ListOptions } from '../src';
import { convert, currency, i18n, list, palette } from '../src';

process.on('SIGINT', () => {
    process.exit(0);
});

const pkg = JSON.parse(
    readFileSync(new URL('../package.json', import.meta.url)).toString('utf8'),
);

yargs(hideBin(process.argv))
    .scriptName('forex')
    .usage(i18n.t('CMD_USAGE'))
    .options('date', {
        alias: 'd',
        type: 'string',
        desc: i18n.t('CMD_OPTION_DATE'),
        default: 'latest',
    })
    .options('timeout', {
        type: 'number',
        desc: i18n.t('CMD_OPTION_TIMEOUT'),
        default: 10_000,
    })
    .options('clipboard', {
        alias: 'c',
        type: 'boolean',
        desc: i18n.t('CMD_OPTION_CLIPBOARD'),
        default: false,
    })
    .options('translate', {
        alias: 'T',
        type: 'boolean',
        desc: i18n.t('CMD_OPTION_TRANSLATE'),
        default: false,
    })
    .options('verbose', {
        alias: 'v',
        type: 'boolean',
        desc: i18n.t('CMD_OPTION_VERBOSE'),
        default: false,
    })
    .command(
        ['convert [amount]', 'to', '$0'],
        i18n.t('CMD_CONVERT_USAGE'),
        (yargs: Argv<ConvertOptions>) => {
            return yargs
                .options('from', {
                    alias: 'f',
                    type: 'string',
                    desc: i18n.t('CMD_OPTION_FROM'),
                    default: 'auto',
                })
                .options('to', {
                    alias: 't',
                    type: 'string',
                    desc: i18n.t('CMD_OPTION_TO'),
                    default: 'auto',
                })
                .example(
                    palette.yellow('forex 1000 -f USD -t EUR'),
                    i18n.t('CMD_CONVERT_USAGE_EG'),
                )
                .example(palette.grey('-------'), '')
                .example(
                    palette.yellow('forex -t USD'),
                    i18n.t('CMD_CONVERT_USAGE_EG_CURRENCY'),
                )
                .example(
                    palette.yellow('forex -t US'),
                    i18n.t('CMD_CONVERT_USAGE_EG_LOCALE'),
                )
                .example(
                    palette.yellow('forex -t America'),
                    i18n.t('CMD_CONVERT_USAGE_EG_COUNTRY'),
                )
                .example(palette.grey('-------'), '')
                .example(
                    palette.yellow('forex --from USD --to EUR'),
                    i18n.t('CMD_CONVERT_USAGE_EG_SPECIFIC'),
                )
                .example(
                    palette.yellow('forex --from USD'),
                    i18n.t('CMD_CONVERT_USAGE_EG_AUTO'),
                )
                .example(
                    palette.yellow('forex --to USD'),
                    i18n.t('CMD_CONVERT_USAGE_EG_AUTO'),
                );
        },
        convert,
    )
    .command(
        ['currency [code]', 'cur', 'ccy', 'cy'],
        i18n.t('CMD_CURRENCY_USAGE'),
        (yargs: Argv<CurrencyOptions>) => {
            return yargs
                .example(
                    palette.yellow('forex cy US'),
                    i18n.t('CMD_CURRENCY_USAGE_EG_CODE'),
                )
                .example(
                    palette.yellow('forex cy USD'),
                    i18n.t('CMD_CURRENCY_USAGE_EG_CURRENCY'),
                )
                .example(
                    palette.yellow('forex cy America'),
                    i18n.t('CMD_CURRENCY_USAGE_EG_COUNTRY'),
                );
        },
        currency,
    )
    .command(
        ['list', 'ls'],
        i18n.t('CMD_LIST_USAGE'),
        (yargs: Argv<ListOptions>) => {
            return yargs
                .options('pretty', {
                    alias: 'p',
                    type: 'boolean',
                    desc: i18n.t('CMD_OPTION_PRETTY'),
                    default: false,
                })
                .example(
                    palette.yellow('forex ls'),
                    i18n.t('CMD_LIST_USAGE_EG_LATEST'),
                )
                .example(
                    palette.yellow('forex ls -p'),
                    i18n.t('CMD_LIST_USAGE_EG_PRETTY'),
                );
        },
        list,
    )
    .example(
        palette.yellow('forex list -t US -d 2024-12-01'),
        i18n.t('CMD_OPTION_USAGE_EG_DATE'),
    )
    .example(
        palette.yellow('forex convert -t US -d "Dec 01, 2024"'),
        i18n.t('CMD_OPTION_USAGE_EG_DATE'),
    )
    .example(palette.grey('-------'), '')
    .example(
        palette.yellow('forex convert -t US --timeout 30000'),
        i18n.t('CMD_OPTION_USAGE_EG_TIMEOUT'),
    )
    .example(
        palette.yellow('forex currency -T -t US'),
        i18n.t('CMD_OPTION_USAGE_EG_TRANSLATE'),
    )
    .alias('h', 'help')
    .alias('V', 'version')
    .demandCommand()
    .strictCommands()
    .recommendCommands()
    .completion()
    .parse();
