import isDigitFormatting from './_internal/is-digit-formatting';
import isScientificNotation from './_internal/is-scientific-notation';
import isStatisticalFormatting from './_internal/is-statistical-formatting';
import parseFinancialString from './_internal/parse-financial-string';

function normalizeAmount(input: string | number): number {
    // If input is already a number
    if (typeof input === 'number') return input;

    // If input is digit formatting
    if (isDigitFormatting(input)) return Number(input.replaceAll('_', ''));

    // If input is in scientific notation
    if (isScientificNotation(input)) return Number(input);

    // If input is statistical formatting (e.g., "1,000.01")
    if (isStatisticalFormatting(input))
        return Number(input.replaceAll(',', ''));

    // If input is financial abbreviations (e.g., "1b1m1k1.01")
    return parseFinancialString(input);
}

export default normalizeAmount;
