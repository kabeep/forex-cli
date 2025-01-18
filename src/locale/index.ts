import { LOCALE_CODE } from '../constants';
import enUS from './en-US';
import zhCN from './zh-CN';

function getLocale() {
    const localeAbbr = LOCALE_CODE.split('-')[0];

    switch (localeAbbr) {
        case 'zh': {
            return zhCN;
        }

        default: {
            return enUS;
        }
    }
}

export default { ...enUS, ...getLocale() };
