import type { AvailableCurrency } from '@kabeep/forex';

function isValidCode(
    code: string | undefined,
    currencies: AvailableCurrency[],
): code is string {
    const lowercaseCode = code?.toLowerCase();
    return !!code && currencies.some((item) => item.code === lowercaseCode);
}

export default isValidCode;
