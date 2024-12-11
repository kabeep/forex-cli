import type { AvailableCurrency } from '@kabeep/forex';

function getCodeName(code: string, list: AvailableCurrency[]) {
    return list.find((item) => item.code === code.toLowerCase())?.name ?? code;
}

export default getCodeName;
