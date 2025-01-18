import { ForexClient } from '@kabeep/forex';
import type { Ora } from 'ora';
import {
    boundary,
    ensure,
    formatDate,
    getCode,
    getCodeName,
    isValidCode,
    palette,
    to,
    toDate,
    useHandler,
} from '../helper';
import type { CurrencyOptions } from './types';

async function currency(
    {
        code: input = 'auto',
        date: dateString = 'latest',
        timeout = 10_000,
        translate = false,
        verbose = false,
    }: CurrencyOptions,
    spinner: Ora,
) {
    !verbose && spinner.start();
    const isLatest = dateString === 'latest';
    const date = isLatest ? 'latest' : toDate(dateString);
    const formatDateString = isLatest
        ? (date as string)
        : formatDate(date as Date);

    const client = new ForexClient({ timeout });

    const code = await getCode(input, translate, timeout);

    const currencies = await useHandler(
        'CMD_MSG_FETCH_CURRENCIES',
        async () => {
            const [err, result] = await to(client.getCurrencies(date));
            ensure(!err, 'TIMEOUT_CURRENCIES');
            ensure(result.data?.length, 'INVALID_CURRENCIES');
            return result.data;
        },
        { date: formatDateString },
        verbose ? spinner : undefined,
    );

    ensure(isValidCode(code, currencies), 'INVALID_FROM');

    const name = await useHandler(
        'CMD_MSG_FETCH_TRANSLATION',
        () => {
            return getCodeName(code, currencies, translate, timeout);
        },
        { date: formatDateString },
        verbose && translate ? spinner : undefined,
    );

    return `${palette.yellow(name)} (${palette.blue(code)})`;
}

export default boundary<[CurrencyOptions]>(currency) as (
    options: CurrencyOptions,
) => Promise<void>;
