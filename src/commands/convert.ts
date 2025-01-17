import { ForexClient } from '@kabeep/forex';
import type { Ora } from 'ora';
import {
    boundary,
    createMessage,
    ensure,
    formatDate,
    getCode,
    getCodeName,
    isValidCode,
    normalizeAmount,
    palette,
    to,
    toDate,
    useHandler,
    useStatistic,
} from '../helper';
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

    const baseCode = await getCode(fromCurrency, translate, timeout);
    const destCode = await getCode(toCurrency, translate, timeout);
    ensure(baseCode !== destCode, 'UNMEANING');

    const currencies = await useHandler(
        'CMD_MSG_FETCH_CURRENCIES',
        async () => {
            const [err, result] = await to(client.getCurrencies(date));

            ensure(!err, 'TIMEOUT_CURRENCIES');
            ensure(result.data?.length, 'INVALID_CURRENCIES');

            return result.data;
        },
        { date: formatDateString },
        spinner,
    );

    ensure(isValidCode(baseCode, currencies), 'INVALID_FROM');
    ensure(isValidCode(destCode, currencies), 'INVALID_TO');

    const { baseName, destName } = await useHandler(
        'CMD_MSG_FETCH_TRANSLATION',
        async () => {
            const baseName = await getCodeName(
                baseCode,
                currencies,
                translate,
                timeout,
            );
            const destName = await getCodeName(
                destCode,
                currencies,
                translate,
                timeout,
            );
            return { baseName, destName };
        },
        { date: formatDateString },
        translate ? spinner : undefined,
    );

    const print = createMessage(
        baseName,
        palette.blue(baseCode),
        destName,
        palette.blue(destCode),
    );

    if (!amount) {
        const rate = await useHandler(
            'CMD_MSG_FETCH_RATE',
            async () => {
                const [err, result] = await to(
                    client.getRate(baseCode, destCode, date),
                );

                ensure(!err, 'TIMEOUT_RATE');
                ensure(result.data, 'INVALID_RATE');

                return result.data;
            },
            {
                date: formatDateString,
                base: baseCode,
                dest: destCode,
            },
            spinner,
        );
        return print(palette.yellow(useStatistic(rate)));
    }

    const numericAmount = normalizeAmount(amount);
    ensure(!Number.isNaN(numericAmount), 'INVALID_AMOUNT', { amount });

    const resultData = await useHandler(
        'CMD_MSG_FETCH_RATE',
        async () => {
            const [err, result] = await to(
                client.convert(baseCode, destCode, numericAmount, date),
            );

            ensure(!err, 'TIMEOUT_CONVERT');
            ensure(result.data, 'INVALID_CONVERT');

            return result.data;
        },
        {
            date: formatDateString,
            base: baseCode,
            dest: destCode,
        },
        spinner,
    );
    return print(
        palette.yellow(useStatistic(numericAmount, { precision: 2 })),
        palette.yellow(useStatistic(resultData, { precision: 2 })),
    );
}

export default boundary<[ConvertOptions]>(convert) as (
    options: ConvertOptions,
) => Promise<void>;
