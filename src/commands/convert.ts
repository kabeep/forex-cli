import { ForexClient } from '@kabeep/forex';
import type { Ora } from 'ora';
import {
    boundary,
    createMessage,
    ensure,
    getCode,
    getCodeName,
    i18n,
    isValidCode,
    to,
    toDate,
    useDuration,
} from '../helper';
import formatDate from '../helper/_internal/format-date';
import createPalette from '../helper/craete-palette';
import type { ConvertOptions } from './types';

async function convert(
    {
        from: fromCurrency = 'auto',
        to: toCurrency = 'auto',
        date: dateString = 'latest',
        timeout = 10_000,
        translate = false,
        amount,
    }: ConvertOptions,
    spinner: Ora,
) {
    const isLatest = dateString === 'latest';
    const date = isLatest ? 'latest' : toDate(dateString);
    const formatDateString = isLatest
        ? (date as string)
        : formatDate(date as Date);

    const client = new ForexClient({ timeout });

    const yellow = createPalette(33);
    const blue = createPalette(34);
    const grey = createPalette(90);

    const baseCode = await getCode(fromCurrency, translate, timeout);
    const destCode = await getCode(toCurrency, translate, timeout);
    ensure(baseCode !== destCode, 'UNMEANING');

    const currenciesOptions = { date: formatDateString, time: '' };
    spinner.start(i18n('CMD_MSG_FETCH_CURRENCIES', currenciesOptions));
    const currenciesTimer = useDuration();
    const [err, currencies] = await to(client.getCurrencies(date));
    currenciesOptions.time = currenciesTimer();
    ensure(!err, 'TIMEOUT_CURRENCIES');
    ensure(currencies.data?.length, 'INVALID_CURRENCIES');
    spinner.succeed(i18n('CMD_MSG_FETCH_CURRENCIES', currenciesOptions));

    ensure(isValidCode(baseCode, currencies.data), 'INVALID_FROM');
    ensure(isValidCode(destCode, currencies.data), 'INVALID_TO');

    translate &&
        spinner.start(i18n('CMD_MSG_FETCH_TRANSLATION', currenciesOptions));
    const translateTimer = useDuration();
    const baseName = await getCodeName(
        baseCode,
        currencies.data,
        translate,
        timeout,
    );
    const destName = await getCodeName(
        destCode,
        currencies.data,
        translate,
        timeout,
    );
    currenciesOptions.time = translateTimer();
    translate &&
        spinner.succeed(i18n('CMD_MSG_FETCH_TRANSLATION', currenciesOptions));

    const print = createMessage(
        baseName,
        blue(baseCode),
        destName,
        blue(destCode),
    );

    const convertOptions = {
        date: formatDateString,
        base: baseCode,
        dest: destCode,
        time: '',
    };
    spinner.start(i18n('CMD_MSG_FETCH_RATE', convertOptions));

    if (!amount) {
        const rateTimer = useDuration();
        const [err, rate] = await to(client.getRate(baseCode, destCode, date));
        convertOptions.time = rateTimer();
        ensure(!err, 'TIMEOUT_RATE');
        ensure(rate.data, 'INVALID_RATE');
        spinner.succeed(i18n('CMD_MSG_FETCH_RATE', convertOptions));
        return print(yellow(rate.data.toFixed(2)));
    }

    const numericAmount = Number(amount);
    if (!numericAmount || Number.isNaN(numericAmount)) {
        convertOptions.time = '0ms';
        spinner.succeed(i18n('CMD_MSG_FETCH_RATE', convertOptions));
        return print(grey(numericAmount), grey(numericAmount));
    }

    const convertTimer = useDuration();
    const [error, result] = await to(
        client.convert(baseCode, destCode, numericAmount, date),
    );
    convertOptions.time = convertTimer();
    ensure(!error, 'TIMEOUT_CONVERT');
    ensure(result.data, 'INVALID_CONVERT');
    spinner.succeed(i18n('CMD_MSG_FETCH_RATE', convertOptions));
    return print(
        yellow(numericAmount.toFixed(2)),
        yellow(result.data.toFixed(2)),
    );
}

export default boundary<[ConvertOptions]>(convert) as (
    options: ConvertOptions,
) => Promise<void>;
