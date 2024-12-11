#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import process from 'node:process';
import updateNotifier from 'update-notifier';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import main, { i18n } from '../src';

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

main(
    yargs(hideBin(process.argv))
        .scriptName('forex')
        .usage(i18n('CMD_USAGE'))
        .options('from', {
            alias: 'f',
            type: 'string',
            desc: i18n('CMD_OPTION_FROM'),
            default: 'auto',
        })
        .options('to', {
            alias: 't',
            type: 'string',
            desc: i18n('CMD_OPTION_FROM'),
            default: 'auto',
        })
        .options('date', {
            alias: 'd',
            type: 'string',
            desc: i18n('CMD_OPTION_DATE'),
            default: 'latest',
        })
        .options('timeout', {
            type: 'number',
            desc: i18n('CMD_OPTION_TIMEOUT'),
            default: 5_000,
        })
        .example(yellow('forex -t USD'), i18n('CMD_USAGE_EG_CURRENCY'))
        .example(yellow('forex -t US'), i18n('CMD_USAGE_EG_LOCALE'))
        .example(grey('-------'), '')
        .example(yellow('forex -f USD -t EUR'), i18n('CMD_USAGE_EG'))
        .example(yellow('forex -f USD'), i18n('CMD_USAGE_EG_AUTO'))
        .example(yellow('forex -t USD'), i18n('CMD_USAGE_EG_AUTO'))
        .example(grey('-------'), '')
        .example(yellow('forex -t US -d 2024-12-01'), i18n('CMD_USAGE_EG_DATE'))
        .example(
            yellow('forex -t US -d "Dec 01, 2024"'),
            i18n('CMD_USAGE_EG_DATE'),
        )
        .example(grey('-------'), '')
        .example(
            yellow('forex -t US --timeout 30000'),
            i18n('CMD_USAGE_EG_TIMEOUT'),
        )
        .alias({
            v: 'version',
            h: 'help',
        })
        .parseSync(),
).catch(console.error);
