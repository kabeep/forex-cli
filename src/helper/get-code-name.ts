import type { AvailableCurrency } from '@kabeep/forex';
import useTranslate from './_internal/use-translate';
import to from './to';

async function getCodeName(
    code: string,
    list: AvailableCurrency[],
    translate = false,
    timeout = 10_000,
) {
    const name = list.find((item) => item.code === code.toLowerCase())?.name;
    if (!name) return code;
    if (!translate) return name;

    const [err, translation] = await to(useTranslate(name, { timeout }));
    if (err) return name;

    return translation || name;
}

export default getCodeName;
