import { ForexClient } from '@kabeep/forex';
import type { Ora } from 'ora';
import {
    boundary,
    createMessage,
    ensure,
    formatDate,
    getCode,
    getCodeName,
    getCurrencies,
    isValidCode,
    normalizeAmount,
    palette,
    to,
    toDate,
    useClipboard,
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
        clipboard = false,
        translate = false,
        verbose = false,
        amount,
    }: ConvertOptions,
    spinner: Ora,
) {
    !verbose && spinner.start();
    const isLatest = dateString === 'latest';
    const date = isLatest ? 'latest' : toDate(dateString);
    const formatDateString = isLatest
        ? (date as string)
        : formatDate(date as Date);
    // return useCache([]);

    const client = new ForexClient({ timeout });

    const baseCode = await getCode(fromCurrency, translate, timeout);
    const destCode = await getCode(toCurrency, translate, timeout);
    ensure(baseCode !== destCode, 'UNMEANING');

    const currencies = await useHandler(
        'CMD_MSG_FETCH_CURRENCIES',
        () => getCurrencies(client, date),
        { date: formatDateString },
        verbose ? spinner : undefined,
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
        verbose && translate ? spinner : undefined,
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
            verbose ? spinner : undefined,
        );

        clipboard && (await useClipboard(rate, verbose ? spinner : undefined));

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
        verbose ? spinner : undefined,
    );

    clipboard &&
        (await useClipboard(resultData, verbose ? spinner : undefined));

    return print(
        palette.yellow(useStatistic(numericAmount, { precision: 2 })),
        palette.yellow(useStatistic(resultData, { precision: 2 })),
    );
}

export default boundary<[ConvertOptions]>(convert) as (
    options: ConvertOptions,
) => Promise<void>;
