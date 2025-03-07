import { ForexClient } from '@kabeep/forex';
import type { Ora } from 'ora';
import {
    boundary,
    ensure,
    formatDate,
    getCode,
    getCodeName,
    getCurrencies,
    isValidCode,
    palette,
    toDate,
    useClipboard,
    useHandler,
} from '../helper';
import type { CurrencyOptions } from './types';

async function currency(
    {
        code: input = 'auto',
        date: dateString = 'latest',
        timeout = 10_000,
        clipboard = false,
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
        () => getCurrencies(client),
        { date: formatDateString },
        verbose ? spinner : undefined,
    );

    ensure(isValidCode(code, currencies), 'INVALID_FROM');

    const name = await useHandler(
        'CMD_MSG_FETCH_TRANSLATION',
        () => getCodeName(code, currencies, translate, timeout),
        { date: formatDateString },
        verbose && translate ? spinner : undefined,
    );

    clipboard &&
        (await useClipboard(
            `${name} (${code})`,
            verbose ? spinner : undefined,
        ));

    return `${palette.yellow(name)} (${palette.blue(code)})`;
}

export default boundary<[CurrencyOptions]>(currency) as (
    options: CurrencyOptions,
) => Promise<void>;
