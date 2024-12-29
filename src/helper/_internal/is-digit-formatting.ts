function isDigitFormatting(input: string) {
    if (!input.includes('_')) return false;

    return !Number.isNaN(Number(input.replaceAll('_', '')));
}

export default isDigitFormatting;
