import { ForexClient } from '@kabeep/forex';
import type { Ora } from 'ora';
import {
    boundary,
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
import type { CurrencyOptions } from './types';

async function currency(
    {
        code: input = 'auto',
        date: dateString = 'latest',
        timeout = 10_000,
        translate = false,
    }: CurrencyOptions,
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

    const code = await getCode(input, translate, timeout);

    const currenciesOptions = { date: formatDateString, time: '' };
    spinner.start(i18n('CMD_MSG_FETCH_CURRENCIES', currenciesOptions));
    const currenciesTimer = useDuration();
    const [err, currencies] = await to(client.getCurrencies(date));
    currenciesOptions.time = currenciesTimer();
    ensure(!err, 'TIMEOUT_CURRENCIES');
    ensure(currencies.data?.length, 'INVALID_CURRENCIES');
    spinner.succeed(i18n('CMD_MSG_FETCH_CURRENCIES', currenciesOptions));

    ensure(isValidCode(code, currencies.data), 'INVALID_FROM');
    translate &&
        spinner.start(i18n('CMD_MSG_FETCH_TRANSLATION', currenciesOptions));
    const translateTimer = useDuration();
    const name = await getCodeName(code, currencies.data, translate, timeout);
    currenciesOptions.time = translateTimer();
    translate &&
        spinner.succeed(i18n('CMD_MSG_FETCH_TRANSLATION', currenciesOptions));

    return `${yellow(name)} (${blue(code)})`;
}

export default boundary<[CurrencyOptions]>(currency) as (
    options: CurrencyOptions,
) => Promise<void>;
