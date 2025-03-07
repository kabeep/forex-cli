import path from 'node:path';
import type { AvailableCurrency, ForexClient } from '@kabeep/forex';
import { cacheDirectory } from '../constants';
import ensureDirectory from './_internal/ensure-directory';
import pathExist from './_internal/path-exist';
import readFileSync from './_internal/read-file-sync';
import writeFileSync from './_internal/write-file-sync';
import ensure from './ensure';
import to from './to';

export interface CacheOptions {
    date: string;
    currencies: AvailableCurrency[];
}

async function getCurrencies(client: ForexClient) {
    const unexpected = ensureDirectory(cacheDirectory);
    if (unexpected) throw new Error('CREATE_CACHE_DIR');

    const date = new Date();
    const formatDateString = new Date().toISOString().split('T')[0];

    const cachePath = path.join(cacheDirectory, 'currencies.json');
    const isExisted = pathExist(cachePath);

    if (isExisted) {
        const { date, currencies } = readFileSync<CacheOptions>(cachePath);
        const isExpired = date !== formatDateString;

        if (!isExpired) return currencies;
    }

    const [err, result] = await to(client.getCurrencies(date));

    ensure(!err, 'TIMEOUT_CURRENCIES');
    ensure(result.data?.length, 'INVALID_CURRENCIES');

    const disabled = writeFileSync(cachePath, {
        date: formatDateString,
        currencies: result.data,
    });
    if (disabled) throw new Error('WRITE_CACHE_DIR');
    return result.data;
}

export default getCurrencies;
