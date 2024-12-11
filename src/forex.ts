import { ForexClient } from '@kabeep/forex';
import {
    createMessage,
    ensure,
    getCode,
    getCodeName,
    isValidCode,
    to,
    toDate,
} from './helper';
import type { ForexOptions } from './types';

async function forex({
    _,
    from: fromCurrency,
    to: toCurrency,
    date: dateString,
    timeout,
}: ForexOptions) {
    const client = new ForexClient({ timeout });

    const palette = (code: number) => (text: string | number) =>
        `\u001B[${code}m${text}\u001B[39m`;
    const grey = palette(90);
    const blue = palette(34);
    const yellow = palette(33);

    const baseCode = getCode(fromCurrency);
    const destCode = getCode(toCurrency);
    ensure(baseCode !== destCode, 'UNMEANING');

    const date = dateString === 'latest' ? dateString : toDate(dateString);
    const [err, currencies] = await to(client.getCurrencies(date));
    ensure(!err, 'TIMEOUT_CURRENCIES');
    ensure(currencies.data?.length, 'INVALID_CURRENCIES');

    ensure(isValidCode(baseCode, currencies.data), 'INVALID_FROM');
    ensure(isValidCode(destCode, currencies.data), 'INVALID_TO');

    const baseName = getCodeName(baseCode, currencies.data);
    const destName = getCodeName(destCode, currencies.data);

    const print = createMessage(
        grey(baseName),
        blue(baseCode),
        grey(destName),
        blue(destCode),
    );

    const [amount] = _;
    if (!amount) {
        const [err, rate] = await to(client.getRate(baseCode, destCode, date));
        ensure(!err, 'TIMEOUT_RATE');
        ensure(rate.data, 'INVALID_RATE');
        return print(yellow(rate.data.toFixed(2)));
    }

    const numericAmount = Number(amount);
    if (!numericAmount || Number.isNaN(numericAmount))
        return print(grey(numericAmount), grey(numericAmount));

    const [error, result] = await to(
        client.convert(baseCode, destCode, numericAmount, date),
    );
    ensure(!error, 'TIMEOUT_CONVERT');
    ensure(result.data, 'INVALID_CONVERT');
    return print(
        yellow(numericAmount.toFixed(2)),
        yellow(result.data.toFixed(2)),
    );
}

export default forex;
