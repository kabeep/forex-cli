import merge from 'lodash.merge';
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

const locale = merge<typeof enUS, ReturnType<typeof getLocale>>(
    enUS,
    getLocale(),
);

export default locale;
