function isScientificNotation(input: string) {
    if (!input.includes('e')) return false;

    return !Number.isNaN(Number(input));
}

export default isScientificNotation;
