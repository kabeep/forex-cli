import confirm from '@inquirer/confirm';
import search from '@inquirer/search';
import { ForexClient } from '@kabeep/forex';
import ISO3166 from 'iso-3166-1';
import { LOCALE_CODE } from '../constants';
import fuzzySearch from './_internal/fuzzy-search';
import useTranslate from './_internal/use-translate';
import ensure from './ensure';
import i18n from './i18n';
import to from './to';

interface ChoiceOptions {
    name: string;
    value: string;
    description: string;
}

const translateCountriesName = async (
    list: ChoiceOptions[],
    timeout: number,
) => {
    const [_, translation] = await to(
        useTranslate(
            list.map((item) => item.name),
            { timeout },
        ),
    );
    if (_ || !translation) return list;

    return list.map((item, index) => ({
        ...item,
        name: translation[index] || item.name,
    }));
};

const translateCountryName = async (name: string, timeout: number) => {
    const [_, translation] = await to(
        useTranslate(name, {
            timeout,
        }),
    );
    return translation || name;
};

async function getCode(code?: string, translate = false, timeout = 10_000) {
    const client = new ForexClient();
    if (!code || code === 'auto')
        return client.getCode(LOCALE_CODE.split('-')[1]);

    if (code.length >= 2 && code.length <= 3)
        return client.getCode(code) || code;

    const uppercaseCode = code.toUpperCase();
    const countryList = ISO3166.all();
    const matchingList = countryList
        .filter((options) =>
            options.country.toUpperCase().includes(uppercaseCode),
        )
        .map((options) => ({
            name: options.country,
            value: options.alpha2,
            description: `Numberic: ${options.numeric}\nISO-3166-alpha-2: ${options.alpha2}\nISO-3166-alpha-3: ${options.alpha3}`,
        }));
    if (!matchingList.length) return client.getCode(code) || code;

    if (matchingList.length > 1) {
        const searchList = translate
            ? await translateCountriesName(matchingList, timeout)
            : matchingList;

        const [err, countryCode] = await to(
            search({
                message: i18n.t('CMD_MSG_CHOICE_COUNTRY'),
                pageSize: 10,
                source: (term: string | undefined) => {
                    if (!term) return searchList;

                    return searchList.filter((options) =>
                        fuzzySearch(
                            term.toLowerCase(),
                            options.name.toLowerCase(),
                        ),
                    );
                },
            }),
        );
        ensure(!err, 'USER_CANCEL');
        return client.getCode(countryCode);
    }

    const countryCode = matchingList[0].value;
    const countryName = matchingList[0].name;
    if (countryCode !== uppercaseCode) {
        const confirmName = translate
            ? await translateCountryName(countryName, timeout)
            : countryName;
        const [err, isConfirm] = await to(
            confirm({
                message: i18n.t('CMD_MSG_CONFIRM_COUNTRY', {
                    region: confirmName,
                }),
                default: true,
            }),
        );
        ensure(!err, 'USER_CANCEL');
        ensure(isConfirm, 'INVALID_COUNTRY');
        return client.getCode(countryCode);
    }

    return client.getCode(matchingList[0].value);
}

export default getCode;
