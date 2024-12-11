import { ForexClient } from '@kabeep/forex';
import { LOCALE_CODE } from '../constants';

function getCode(code?: string, defaultCode?: string) {
    const client = new ForexClient();
    if (!code || code === 'auto')
        return defaultCode ?? client.getCode(LOCALE_CODE.split('-')[1]);

    return client.getCode(code)?.toUpperCase() || code.toUpperCase();
}

export default getCode;
