#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import process from 'node:process';
import updateNotifier from 'update-notifier';
import yargs, { type Argv } from 'yargs';
import { hideBin } from 'yargs/helpers';

import type { ConvertOptions, CurrencyOptions, ListOptions } from '../src';
import { convert, currency, i18n, list } from '../src';

process.on('SIGINT', () => {
    process.exit(0);
});

const pkg = JSON.parse(
    readFileSync(new URL('../package.json', import.meta.url)).toString('utf8'),
);

updateNotifier({ pkg }).notify({ isGlobal: true });

const palette = (code: number) => (text: string) =>
    `\u001B[${code}m${text}\u001B[39m`;
const grey = palette(90);
const yellow = palette(33);

yargs(hideBin(process.argv))
    .scriptName('forex')
    .usage(i18n('CMD_USAGE'))
    .options('date', {
        alias: 'd',
        type: 'string',
        desc: i18n('CMD_OPTION_DATE'),
        default: 'latest',
    })
    .options('timeout', {
        type: 'number',
        desc: i18n('CMD_OPTION_TIMEOUT'),
        default: 10_000,
    })
    .options('translate', {
        type: 'boolean',
        desc: i18n('CMD_OPTION_TRANSLATE'),
        default: false,
    })
    .command(
        ['convert [amount]', 'to', '$0'],
        i18n('CMD_CONVERT_USAGE'),
        (yargs: Argv<ConvertOptions>) => {
            return yargs
                .options('from', {
                    alias: 'f',
                    type: 'string',
                    desc: i18n('CMD_OPTION_FROM'),
                    default: 'auto',
                })
                .options('to', {
                    alias: 't',
                    type: 'string',
                    desc: i18n('CMD_OPTION_TO'),
                    default: 'auto',
                })
                .example(
                    yellow('forex 1000 -f USD -t EUR'),
                    i18n('CMD_CONVERT_USAGE_EG'),
                )
                .example(grey('-------'), '')
                .example(
                    yellow('forex -t USD'),
                    i18n('CMD_CONVERT_USAGE_EG_CURRENCY'),
                )
                .example(
                    yellow('forex -t US'),
                    i18n('CMD_CONVERT_USAGE_EG_LOCALE'),
                )
                .example(
                    yellow('forex -t America'),
                    i18n('CMD_CONVERT_USAGE_EG_COUNTRY'),
                )
                .example(grey('-------'), '')
                .example(
                    yellow('forex --from USD --to EUR'),
                    i18n('CMD_CONVERT_USAGE_EG_SPECIFIC'),
                )
                .example(
                    yellow('forex --from USD'),
                    i18n('CMD_CONVERT_USAGE_EG_AUTO'),
                )
                .example(
                    yellow('forex --to USD'),
                    i18n('CMD_CONVERT_USAGE_EG_AUTO'),
                );
        },
        convert,
    )
    .command(
        ['currency [code]', 'cur', 'ccy', 'cy'],
        i18n('CMD_CURRENCY_USAGE'),
        (yargs: Argv<CurrencyOptions>) => {
            return yargs
                .example(
                    yellow('forex cy US'),
                    i18n('CMD_CURRENCY_USAGE_EG_CODE'),
                )
                .example(
                    yellow('forex cy USD'),
                    i18n('CMD_CURRENCY_USAGE_EG_CURRENCY'),
                )
                .example(
                    yellow('forex cy America'),
                    i18n('CMD_CURRENCY_USAGE_EG_COUNTRY'),
                );
        },
        currency,
    )
    .command(
        ['list', 'ls'],
        i18n('CMD_LIST_USAGE'),
        (yargs: Argv<ListOptions>) => {
            return yargs
                .options('pretty', {
                    alias: 'p',
                    type: 'boolean',
                    desc: i18n('CMD_OPTION_PRETTY'),
                    default: false,
                })
                .example(yellow('forex ls'), i18n('CMD_LIST_USAGE_EG_LATEST'))
                .example(
                    yellow('forex ls -p'),
                    i18n('CMD_LIST_USAGE_EG_PRETTY'),
                );
        },
        list,
    )
    .example(
        yellow('forex list -t US -d 2024-12-01'),
        i18n('CMD_OPTION_USAGE_EG_DATE'),
    )
    .example(
        yellow('forex convert -t US -d "Dec 01, 2024"'),
        i18n('CMD_OPTION_USAGE_EG_DATE'),
    )
    .example(grey('-------'), '')
    .example(
        yellow('forex convert -t US --timeout 30000'),
        i18n('CMD_OPTION_USAGE_EG_TIMEOUT'),
    )
    .example(
        yellow('forex currency -t US --translate'),
        i18n('CMD_OPTION_USAGE_EG_TRANSLATE'),
    )
    .alias('h', 'help')
    .alias('v', 'version')
    .demandCommand()
    .strictCommands()
    .recommendCommands()
    .completion()
    .parse();
