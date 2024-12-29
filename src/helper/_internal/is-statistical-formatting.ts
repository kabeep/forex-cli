function isStatisticalFormatting(input: string) {
    if (!input.includes(',')) return false;

    return !Number.isNaN(Number(input.replaceAll(',', '')));
}

export default isStatisticalFormatting;
